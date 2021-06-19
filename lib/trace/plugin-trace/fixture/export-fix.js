export function process(runners) {
    __estrace.enter('process', 'file://export.js:1', arguments);
    const files = getFiles(runners);
    const linted = lintFiles(files);

    {
        const __estrace_result = linted;
        __estrace.exit('process', 'file://export.js:1', __estrace_result);
        return __estrace_result;
    }
}

