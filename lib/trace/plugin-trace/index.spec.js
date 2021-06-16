import initTest from '@putout/test';
import trace from './index.js';

const {url} = import.meta;
const {pathname} = new URL('.', url);

const test = initTest(pathname, {
    trace,
});

test('estrace: plugin-trace: transform', (t) => {
    t.transform('arrow');
    t.end();
});

