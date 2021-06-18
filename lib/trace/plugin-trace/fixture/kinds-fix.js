function hello() {
    __estrace.enter('hello', 'file://kinds.js:1', arguments);

    {
        const __estrace_result = 'world';
        __estrace.exit('hello', 'file://kinds.js:1', __estrace_result);
        return __estrace_result;
    }
}

hello(function(word) {
    __estrace.enter('<anonymous:5>', 'file://kinds.js:5', arguments);

    {
        const __estrace_result = `hello ${word}`;
        __estrace.exit('<anonymous:5>', 'file://kinds.js:5', __estrace_result);
        return __estrace_result;
    }
});

hello((word) => {
    __estrace.enter('<anonymous:9>', 'file://kinds.js:9', arguments);

    {
        const __estrace_result = `hello ${word}`;
        __estrace.exit('<anonymous:9>', 'file://kinds.js:9', __estrace_result);
        return __estrace_result;
    }
});

class Hello {
    hello(word) {
        __estrace.enter('hello', 'file://kinds.js:14', arguments);

        {
            const __estrace_result = `hello ${word}`;
            __estrace.exit('hello', 'file://kinds.js:14', __estrace_result);
            return __estrace_result;
        }
    }
}
