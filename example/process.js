const processFile = (a) => a;

export function process(runners) {
    const files = getFiles(runners);
    const linted = lintFiles(files);
    
    return linted;
}

function getFiles(runners) {
    const files = [];
    
    for (const run of runners) {
        files.push(...run());
    }
    
    return files;
}

function lintFiles(files) {
    const linted = [];
    
    for (const file of files) {
        linted.push(processFile(file));
    }
   
    return linted;
}

