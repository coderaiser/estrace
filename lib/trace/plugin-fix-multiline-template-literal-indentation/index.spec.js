import initTest from '@putout/test';
import fixMultiline from './index.js';

const {url} = import.meta;
const {pathname} = new URL('.', url);

const test = initTest(pathname, {
    fixMultiline,
});

test('estrace: plugin-fix-multiline: transform', (t) => {
    t.transform('template');
    t.end();
});
