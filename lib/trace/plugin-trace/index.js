import {
    template,
    types,
    operator,
} from 'putout';
import {getLine} from './line.js';

const {
    replaceWith,
    compare,
    extract,
} = operator;

const {
    isFunction,
    isTryStatement,
    BlockStatement,
    ReturnStatement,
} = types;

const ENTER_TEMPLATE = 'var __estrace_context = __estrace.enter(__a, __b, __c)';
const buildEnter = template('var __estrace_context = __estrace.enter("NAME", "URL", arguments);');
const buildExit = template('__estrace.exit("NAME", "URL", __estrace_context);');

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
    });
    
    replaceWith(bodyPath, BlockStatement([
        buildTryCatch({
            BLOCK: path.node.body.body,
            FINALLY: exit,
        }),
    ]));
};

export default {
    report,
    traverse,
    fix,
};

function getFunctionName({path, line}) {
    const {node} = path;
    
    if (path.isClassMethod())
        return extract(node);
    
    if (path.isFunctionDeclaration() && node.id)
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
    const body = bodyPath.isBlockStatement() ? path.node.body.body : [
        ReturnStatement(path.node.body),
    ];
    
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

function isSkip(path) {
    const {leadingComments} = path.node;
    
    if (!leadingComments || !leadingComments.length)
        return false;
    
    const [comment] = leadingComments;
    
    return comment.value.includes('__estrace.skip()');
}
