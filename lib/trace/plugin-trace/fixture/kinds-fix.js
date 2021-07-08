function hello() {
    try {
        __estrace.enter('hello', 'file://kinds.js:1', arguments);
        return 'world';
    } finally {
        __estrace.exit('hello', 'file://kinds.js:1');
    }
}

hello(function(word) {
    try {
        __estrace.enter('<anonymous:5>', 'file://kinds.js:5', arguments);
        return `hello ${word}`;
    } finally {
        __estrace.exit('<anonymous:5>', 'file://kinds.js:5');
    }
});

hello((word) => {
    try {
        __estrace.enter('<anonymous:9>', 'file://kinds.js:9', arguments);
        return `hello ${word}`;
    } finally {
        __estrace.exit('<anonymous:9>', 'file://kinds.js:9');
    }
});

class Hello {
    hello(word) {
        try {
            __estrace.enter('hello', 'file://kinds.js:14', arguments);
            return `hello ${word}`;
        } finally {
            __estrace.exit('hello', 'file://kinds.js:14');
        }
    }
}
