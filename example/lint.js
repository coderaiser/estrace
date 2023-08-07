const processFile = (a) => a;

lint([]);

export function lint(runners) {
    const files = getFiles(runners);
    
    return lintFiles(files);
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
