import {
    template,
    types,
    operator,
} from 'putout';

import {getLine} from './line.js';

const {replaceWith, compare} = operator;
const {
    isFunction,
    isTryStatement,
    BlockStatement,
    ReturnStatement,
} = types;

const ENTER_TEMPLATE = '__estrace.enter(__a, __b, __c)';
const buildEnter = template('__estrace.enter("NAME", "URL", arguments);');
const buildExit = template('__estrace.exit("NAME", "URL", RESULT);');
const buildReturn = template('{const __estrace_result = ARGUMENT; EXIT; return __estrace_result;}');
const buildTryCatch = template(`try {
        BLOCK;
    } finally {
        FINALLY;
    }
`);

export const report = () => 'Functions should be traced';

export const traverse = ({push, options}) => {
    const {url = 'file://*'} = options;
    
    return {
        Function(path) {
            const bodyPath = path.get('body');
            
            if (isFunction(bodyPath))
                return;
            
            if (isEnter(bodyPath))
                return;
            
            if (isSkip(path))
                return;
            
            push({
                path,
                url,
            });
        },
    };
};

export const fix = ({path, url}) => {
    const bodyPath = path.get('body');
    const line = getLine(path);
    const name = getFunctionName({
        path,
        line,
    });
    
    addEnter({
        path,
        bodyPath,
        name,
        url,
        line,
    });
    
    const exit = buildExit({
        NAME: name,
        URL: buildUrl(url, line),
        RESULT: '',
    });
    
    replaceWith(bodyPath, BlockStatement([buildTryCatch({
        BLOCK: path.node.body.body,
        FINALLY: exit,
    })]));
};

export default {
    report,
    traverse,
    fix,
};

function getFunctionName({path, line}) {
    const {node} = path;
    
    if (path.isClassMethod())
        return node.key.name || node.key.value;
    
    if (path.isFunctionDeclaration())
        return node.id.name;
    
    return `<anonymous:${line}>`;
}

function isEnter(bodyPath) {
    if (!bodyPath.isBlockStatement())
        return false;
    
    const [first] = bodyPath.node.body;
    
    if (!isTryStatement(first))
        return;
    
    const [firstInTry] = first.block.body;
    
    return compare(firstInTry, ENTER_TEMPLATE);
}

function addEnter({path, bodyPath, name, line, url}) {
    const body = bodyPath.isBlockStatement() ? path.node.body.body : [ReturnStatement(path.node.body)];
    
    const enter = buildEnter({
        NAME: name,
        URL: buildUrl(url, line),
    });
    
    replaceWith(bodyPath, BlockStatement([
        enter,
        ...body,
    ]));
}

const buildUrl = (url, line) => `${url}:${line}`;

function addExit({path, bodyPath, name, url, line}) {
    let returnAdded = false;
    
    bodyPath.traverse({
        ReturnStatement(returnPath) {
            const {
                node,
                scope,
            } = returnPath;
            
            const {block} = scope;
            
            if (block !== path.node)
                return;
            
            const {argument} = node;
            
            const exit = buildExit({
                NAME: name,
                URL: buildUrl(url, line),
                RESULT: '__estrace_result',
            });
            
            returnPath.replaceWith(buildReturn({
                ARGUMENT: argument || 'undefined',
                EXIT: exit,
            }));
            
            returnAdded = true;
        },
    });
    
    if (returnAdded)
        return;
    
    const exit = buildExit({
        NAME: name,
        URL: buildUrl(url, line),
        RESULT: '',
    });
    
    path.node.body.body.push(exit);
}

function isSkip(path) {
    const {leadingComments} = path.node;
    
    if (!leadingComments || !leadingComments.length)
        return false;
    
    const [comment] = leadingComments;
    
    return comment.value.includes('__estrace.skip()');
}
