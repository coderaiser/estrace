import {template, types, operator} from 'putout';

const {replaceWith} = operator;
const {BlockStatement, isTryStatement} = types;

// create nodes
const buildLog = template('console.log(`${"TYPE"} ${"NAME"}`)');
const buildLogEnter = template('console.log(`enter ${"NAME"}`, Array.from(arguments));');
const buildLogException = template('console.log(`${"TYPE"} ${"NAME"}: ${traceError.message}`); throw traceError');
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
export const traverse = ({push}) => ({
    Function(path) {
        const bodyPath = path.get('body');
        
        if (includesTry(bodyPath))
            return;
        
        push(path);
    }
});

export const fix = (path) => {
    const name = getFunctionName(path);

    // create 3 types of events
    const enterLog = buildLogEnter({
        NAME: name,
    });
    const exitLog = buildLogEvent(name, 'exit');
    const errorLog = buildLogExceptionEvent(name);

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
}

function getFunctionName(path) {
    if (path.isClassMethod())
        return path.node.key.name;

    if (path.isFunctionDeclaration())
        return path.node.id.name;

    const {line} = path.node.loc.start;
    return `<anonymous:${line}>`;
}

function buildLogEvent(name, type) {
    return buildLog({
        NAME: name,
        TYPE: type,
    });
}

function buildLogExceptionEvent(name) {
    return buildLogException({
        NAME: name,
        TYPE: 'error',
    });
}

function includesTry(bodyPath) {
    if (!bodyPath.isBlockStatement())
        return false;
    
    const [, second] = bodyPath.node.body;
    return isTryStatement(second);
}
