import {readFile} from 'fs/promises';
import test from 'supertape';

import trace from './index.js';

const {url} = import.meta;

test('estrace: trace', async (t) => {
    const from = new URL('./fixture/trace.js', url);
    const to = new URL('./fixture/trace-fix.js', url);
    
    const source = await readFile(from, 'utf8');
    const expected = await readFile(to, 'utf8');
    
    const result = await trace({
        source,
        url: 'file://arrow.js',
    });
    
    t.equal(result, expected);
    t.end();
});

test('estrace: trace: multiline', async (t) => {
    const from = new URL('./fixture/multiline.js', url);
    const to = new URL('./fixture/multiline-fix.js', url);
    
    const source = await readFile(from, 'utf8');
    const expected = await readFile(to, 'utf8');
    
    const result = await trace({
        source,
        url: 'file://arrow.js',
    });
    
    t.equal(result, expected);
    t.end();
});

