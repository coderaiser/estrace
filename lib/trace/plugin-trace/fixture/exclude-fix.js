const id = (a) => a;

id(function() {
    return 'hello world';
});

function hello() {
    __estrace.enter('hello', 'file://*:7', arguments);

    {
        const __estrace_result = 'world';
        __estrace.exit('hello', 'file://*:7', __estrace_result);
        return __estrace_result;
    }
}

