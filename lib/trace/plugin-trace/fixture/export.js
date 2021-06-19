export function process(runners) {
    const files = getFiles(runners);
    const linted = lintFiles(files);
    
    return linted;
}

