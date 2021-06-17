function hello() {
    __estrace.enter('hello', arguments, 'file://kinds.js');

    {
        const __estrace_result = 'world';
        __estrace.exit('hello', __estrace_result, 'file://kinds.js');
        return __estrace_result;
    }
}

hello(function(word) {
    __estrace.enter('<anonymous:5>', arguments, 'file://kinds.js');

    {
        const __estrace_result = `hello ${word}`;
        __estrace.exit('<anonymous:5>', __estrace_result, 'file://kinds.js');
        return __estrace_result;
    }
});

hello((word) => {
    __estrace.enter('<anonymous:9>', arguments, 'file://kinds.js');

    {
        const __estrace_result = `hello ${word}`;
        __estrace.exit('<anonymous:9>', __estrace_result, 'file://kinds.js');
        return __estrace_result;
    }
});

class Hello {
    hello(word) {
        __estrace.enter('hello', arguments, 'file://kinds.js');

        {
            const __estrace_result = `hello ${word}`;
            __estrace.exit('hello', __estrace_result, 'file://kinds.js');
            return __estrace_result;
        }
    }
}
