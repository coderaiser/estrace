let i = 0;

const {stringify} = JSON;

export /* __estrace.skip() */ function enter(name, url, args) {
    i += 2;
    const argsLine = parseArgs(args);
    
    console.log(`${Array(i).join('.')}.💣 ${name}(${argsLine}) ${url}`);
}

export /* __estrace.skip() */ function exit(name, url, result) {
    console.log(`${Array(i).join('.')}.💥 ${name} ->`, stringify(result), String(url));
    i -= 2;
}

function parseArgs(args) {
    const argsLine = stringify(Array.from(args))
        .replace(/,/g, ', ')
        .slice(1, -1);
    
    return argsLine;
}
