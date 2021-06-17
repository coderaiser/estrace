function hello() {
    __esTrace.enter('hello', arguments, 'file://kinds.js');

    {
        const StringLiteral = 'world';
        __esTrace.exit('hello', 'file://kinds.js');
        return StringLiteral;
    }
}

hello(function(word) {
    __esTrace.enter('<anonymous:5>', arguments, 'file://kinds.js');

    {
        const TemplateLiteral = `hello ${word}`;
        __esTrace.exit('<anonymous:5>', 'file://kinds.js');
        return TemplateLiteral;
    }
});

hello((word) => {
    __esTrace.enter('<anonymous:9>', arguments, 'file://kinds.js');

    {
        const TemplateLiteral = `hello ${word}`;
        __esTrace.exit('<anonymous:9>', 'file://kinds.js');
        return TemplateLiteral;
    }
});

class Hello {
    hello(word) {
        __esTrace.enter('hello', arguments, 'file://kinds.js');

        {
            const TemplateLiteral = `hello ${word}`;
            __esTrace.exit('hello', 'file://kinds.js');
            return TemplateLiteral;
        }
    }
}
