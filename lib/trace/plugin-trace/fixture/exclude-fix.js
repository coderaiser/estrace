const id = (a) => a;

extra = extra
    .split('\\n')
    .filter((line) => line);

id(function() {
    return 'hello world';
});

function hello() {
    try {
        var __estrace_context = __estrace.enter('hello', 'file://*:8', arguments);
        return 'world';
    } finally {
        __estrace.exit('hello', 'file://*:8', __estrace_context);
    }
}
