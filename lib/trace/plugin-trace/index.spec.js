import initTest from '@putout/test';
import trace from './index.js';

const {url} = import.meta;
const {pathname} = new URL('.', url);

const test = initTest(pathname, {
    trace,
});

test('estrace: plugin-trace: transform: arrow', (t) => {
    t.transformWithOptions('arrow', {
        url: 'file://arrow.js',
    });
    t.end();
});

test('estrace: plugin-trace: transform: inner', (t) => {
    t.transformWithOptions('inner', {
        url: 'file://inner.js',
    });
    t.end();
});

test('estrace: plugin-trace: transform: kinds', (t) => {
    t.transformWithOptions('kinds', {
        url: 'file://kinds.js',
    });
    t.end();
});

test('estrace: plugin-trace: transform: empty-return', (t) => {
    t.transformWithOptions('empty-return', {
        url: 'file://empty-return.js',
    });
    t.end();
});

test('estrace: plugin-trace: transform: no-url', (t) => {
    t.transform('no-url');
    t.end();
});

test('estrace: plugin-trace: no transform: skip', (t) => {
    t.noTransformWithOptions('skip', {
        url: 'file://skip.js',
    });
    t.end();
});

test('estrace: plugin-trace: transform: no-return', (t) => {
    t.transformWithOptions('no-return', {
        url: 'file://no-return.js',
    });
    t.end();
});

test('estrace: plugin-trace: transform: export', (t) => {
    t.transformWithOptions('export', {
        url: 'file://export.js',
    });
    t.end();
});

test('estrace: plugin-trace: transform: name-literal', (t) => {
    t.transform('name-literal');
    t.end();
});

test('estrace: plugin-trace: transform: no comments', (t) => {
    t.transform('no-comments');
    t.end();
});

test('estrace: plugin-trace: transform: no id', (t) => {
    t.transform('no-id');
    t.end();
});

test('estrace: plugin-trace: transform: multiple-returns', (t) => {
    t.transform('multiple-returns');
    t.end();
});

test('estrace: plugin-trace: transform: exclude', (t) => {
    t.transformWithOptions('exclude', {
        exclude: [
            'ArrowFunctionExpression',
            'FunctionExpression',
        ],
    });
    t.end();
});
