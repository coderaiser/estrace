function hello() {
    return 'world';
}

hello(function(word) {
    return `hello ${word}`;
});

hello((word) => {
    return `hello ${word}`;
});

class Hello {
    hello(word) {
        return `hello ${word}`;
    }
}
