function hello() {
    __estrace.enter('hello', arguments, 'file://kinds.js:1');

    {
        const __estrace_result = 'world';
        __estrace.exit('hello', __estrace_result, 'file://kinds.js:1');
        return __estrace_result;
    }
}

hello(function(word) {
    __estrace.enter('<anonymous:5>', arguments, 'file://kinds.js:5');

    {
        const __estrace_result = `hello ${word}`;
        __estrace.exit('<anonymous:5>', __estrace_result, 'file://kinds.js:5');
        return __estrace_result;
    }
});

hello((word) => {
    __estrace.enter('<anonymous:9>', arguments, 'file://kinds.js:9');

    {
        const __estrace_result = `hello ${word}`;
        __estrace.exit('<anonymous:9>', __estrace_result, 'file://kinds.js:9');
        return __estrace_result;
    }
});

class Hello {
    hello(word) {
        __estrace.enter('hello', arguments, 'file://kinds.js:14');

        {
            const __estrace_result = `hello ${word}`;
            __estrace.exit('hello', __estrace_result, 'file://kinds.js:14');
            return __estrace_result;
        }
    }
}
