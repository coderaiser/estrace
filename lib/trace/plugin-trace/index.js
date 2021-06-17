import {
    template,
    types,
    operator,
} from 'putout';

import {getLine} from './line.js';

const {replaceWith, compare} = operator;
const {
    isFunction,
    BlockStatement,
    ReturnStatement,
} = types;

const ENTER_TEMPLATE = '__estrace.enter(__a, __b, __c)';
const buildEnter = template('__estrace.enter("NAME", arguments, "URL")');
const buildExit = template('__estrace.exit("NAME", __estrace_result, "URL");');
const buildReturn = template('{const __estrace_result = ARGUMENT; EXIT; return __estrace_result;}');

export const report = () => 'Functions should be traced';

export const traverse = ({push, options}) => {
    const {url} = options;
    
    return {
        Function(path) {
            const bodyPath = path.get('body');
            
            if (isFunction(bodyPath))
                return;
            
            if (isEnter(bodyPath))
                return;
            
            push({
                path,
                url,
            });
        },
    };
};

export const fix = ({path, url}) => {
    const name = getFunctionName(path);
    const bodyPath = path.get('body');
    
    addEnter({
        path,
        bodyPath,
        name,
        url,
    });
    
    addExit({
        path,
        bodyPath,
        name,
        url,
    });
};

export default {
    report,
    traverse,
    fix,
};

function getFunctionName(path) {
    if (path.isClassMethod())
        return path.node.key.name;
    
    if (path.isFunctionDeclaration())
        return path.node.id.name;
    
    const line = getLine(path);
    
    return `<anonymous:${line}>`;
}

function isEnter(bodyPath) {
    if (!bodyPath.isBlockStatement())
        return false;
    
    const [first] = bodyPath.node.body;
    
    return compare(first, ENTER_TEMPLATE);
}

function addEnter({path, bodyPath, name, url}) {
    const body = bodyPath.isBlockStatement() ? path.node.body.body : [ReturnStatement(path.node.body)];
    
    const enter = buildEnter({
        NAME: name,
        URL: url,
    });
    
    replaceWith(bodyPath, BlockStatement([
        enter,
        ...body,
    ]));
}

function addExit({path, bodyPath, name, url}) {
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
                URL: url,
            });
            
            returnPath.replaceWith(buildReturn({
                ARGUMENT: argument,
                EXIT: exit,
            }));
            
            returnAdded = true;
        },
    });
    
    if (!returnAdded)
        path.node.body.body.push(buildExit({
            NAME: name,
            URL: url,
        }));
}

