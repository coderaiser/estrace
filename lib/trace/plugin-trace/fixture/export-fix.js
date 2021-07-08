export function process(runners) {
    try {
        __estrace.enter('process', 'file://export.js:1', arguments);
        const files = getFiles(runners);
        const linted = lintFiles(files);

        return linted;
    } finally {
        __estrace.exit('process', 'file://export.js:1');
    }
}

