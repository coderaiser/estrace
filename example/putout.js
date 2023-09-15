import putout from 'putout';
import {estracePlugin} from 'estrace/plugin';

const source = `
    const fn = (a) => a;
`;

const {code} = putout(source, {
    // you can skip rules, it's optional
    rules: {
        'estrace/trace': ['on', {
            url: 'file://hello.js',
        }],
    },
    plugins: [estracePlugin],
});

console.log(code);
