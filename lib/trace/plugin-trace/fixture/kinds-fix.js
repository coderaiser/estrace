function hello() {
    try {
        var __estrace_context = __estrace.enter('hello', 'file://kinds.js:1', arguments);
        return 'world';
    } finally {
        __estrace.exit('hello', 'file://kinds.js:1', __estrace_context);
    }
}

hello(function(word) {
    try {
        var __estrace_context = __estrace.enter('<anonymous:5>', 'file://kinds.js:5', arguments);
        return `hello ${word}`;
    } finally {
        __estrace.exit('<anonymous:5>', 'file://kinds.js:5', __estrace_context);
    }
});

hello((word) => {
    try {
        var __estrace_context = __estrace.enter('<anonymous:9>', 'file://kinds.js:9', arguments);
        return `hello ${word}`;
    } finally {
        __estrace.exit('<anonymous:9>', 'file://kinds.js:9', __estrace_context);
    }
});

class Hello {
    hello(word) {
        try {
            var __estrace_context = __estrace.enter('hello', 'file://kinds.js:14', arguments);
            return `hello ${word}`;
        } finally {
            __estrace.exit('hello', 'file://kinds.js:14', __estrace_context);
        }
    }
}
