function hello() {
    console.log(`enter ${'hello'}`, Array.from(arguments), `(${'file://kinds.js'})`);

    try {
        return 'world';
    } catch (traceError) {
        console.log(`${'error'} ${'hello'}: ${traceError.message} (${'file://kinds.js'})`);
        throw traceError;
    } finally {
        console.log(`${'exit'} ${'hello'} ${'file://kinds.js'})`);
    }
}

hello(function(word) {
    console.log(`enter ${'<anonymous:5>'}`, Array.from(arguments), `(${'file://kinds.js'})`);

    try {
        return `hello ${word}`;
    } catch (traceError) {
        console.log(`${'error'} ${'<anonymous:5>'}: ${traceError.message} (${'file://kinds.js'})`);
        throw traceError;
    } finally {
        console.log(`${'exit'} ${'<anonymous:5>'} ${'file://kinds.js'})`);
    }
});

hello((word) => {
    console.log(`enter ${'<anonymous:9>'}`, Array.from(arguments), `(${'file://kinds.js'})`);

    try {
        return `hello ${word}`;
    } catch (traceError) {
        console.log(`${'error'} ${'<anonymous:9>'}: ${traceError.message} (${'file://kinds.js'})`);
        throw traceError;
    } finally {
        console.log(`${'exit'} ${'<anonymous:9>'} ${'file://kinds.js'})`);
    }
});

class Hello {
    hello(word) {
        console.log(`enter ${'hello'}`, Array.from(arguments), `(${'file://kinds.js'})`);

        try {
            return `hello ${word}`;
        } catch (traceError) {
            console.log(`${'error'} ${'hello'}: ${traceError.message} (${'file://kinds.js'})`);
            throw traceError;
        } finally {
            console.log(`${'exit'} ${'hello'} ${'file://kinds.js'})`);
        }
    }
}
