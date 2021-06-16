import {
    template,
    types,
    operator,
} from 'putout';

import {getLine} from './line.js';

const {replaceWith} = operator;
const {BlockStatement, isTryStatement} = types;

// create nodes
const buildLog = template('console.log(`${"TYPE"} ${"NAME"} ${"URL"})`)');
const buildLogEnter = template('console.log(`enter ${"NAME"}`, Array.from(arguments), `(${"URL"})`)');
const buildLogException = template('console.log(`${"TYPE"} ${"NAME"}: ${traceError.message} (${"URL"})`); throw traceError');
const buildTryCatch = template(`try {
        BLOCK;
    } catch(traceError) {
        CATCH;
    } finally {
        FINALLY;
    }
`);

export const report = () => 'Functions should be traced';

// nodes we are searching for
export const traverse = ({push, options}) => {
    const {url} = options;
    
    return {
        Function(path) {
            const bodyPath = path.get('body');
            
            if (bodyPath.isFunction())
                return;
            
            if (includesTry(bodyPath))
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
    
    // create 3 types of events
    const enterLog = buildLogEnter({
        NAME: name,
        URL: url,
    });
    
    const exitLog = buildLogEvent('exit', {
        name,
        url,
    });
    
    const errorLog = buildLogExceptionEvent({
        name,
        url,
    });
    
    // move function body into try-catch
    const bodyPath = path.get('body');
    replaceWith(bodyPath, BlockStatement([buildTryCatch({
        BLOCK: path.node.body.body,
        CATCH: errorLog,
        FINALLY: exitLog,
    })]));
    
    // add into the beginning of function "console.log" with event "enter"
    bodyPath.node.body.unshift(enterLog);
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

function buildLogEvent(type, {name, url}) {
    return buildLog({
        NAME: name,
        TYPE: type,
        URL: url,
    });
}

function buildLogExceptionEvent({name, url}) {
    return buildLogException({
        TYPE: 'error',
        NAME: name,
        URL: url,
    });
}

function includesTry(bodyPath) {
    if (!bodyPath.isBlockStatement())
        return false;
    
    const [, second] = bodyPath.node.body;
    return isTryStatement(second);
}
