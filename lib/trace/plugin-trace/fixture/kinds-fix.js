function hello() {
    __estrace.enter('hello', arguments, 'file://kinds.js:1');

    {
        const __estrace_result = 'world';
        __estrace.exit('hello', 'file://kinds.js:1', __estrace_result);
        return __estrace_result;
    }
}

hello(function(word) {
    __estrace.enter('<anonymous:5>', arguments, 'file://kinds.js:5');

    {
        const __estrace_result = `hello ${word}`;
        __estrace.exit('<anonymous:5>', 'file://kinds.js:5', __estrace_result);
        return __estrace_result;
    }
});

hello((word) => {
    __estrace.enter('<anonymous:9>', arguments, 'file://kinds.js:9');

    {
        const __estrace_result = `hello ${word}`;
        __estrace.exit('<anonymous:9>', 'file://kinds.js:9', __estrace_result);
        return __estrace_result;
    }
});

class Hello {
    hello(word) {
        __estrace.enter('hello', arguments, 'file://kinds.js:14');

        {
            const __estrace_result = `hello ${word}`;
            __estrace.exit('hello', 'file://kinds.js:14', __estrace_result);
            return __estrace_result;
        }
    }
}
