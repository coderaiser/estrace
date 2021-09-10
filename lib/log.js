import {getMemory} from './memory.js';

let i = 0;

const {stringify} = JSON;

export /* __estrace.skip() */ function enter(name, url, args) {
    i += 2;
    const argsLine = parseArgs(args);
    
    const {heapUsed} = getMemory();
    console.log(`${Array(i).join('.')}.💣 ${name}(${argsLine}) ${heapUsed} ${url}`);
}

export /* __estrace.skip() */ function exit(name, url, result) {
    const {heapUsed} = getMemory();
    console.log(`${Array(i).join('.')}.💥 ${name} ->`, parseResult(result), String(heapUsed), String(url));
    i -= 2;
}

function parseResult(result) {
    if (typeof result === 'undefined')
        return 'void';
    
    return stringify(result);
}

function parseArgs(args) {
    const argsLine = stringify(Array.from(args))
        .replace(/,/g, ', ')
        .slice(1, -1);
    
    return argsLine;
}
