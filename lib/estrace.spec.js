import {readFile} from 'fs/promises';
import {join} from 'path';

import test from 'supertape';
import putout from 'putout';
import estracePlugin from 'estrace/plugin';
import {createCommons} from 'simport';

import {
    load,
    transformSource,
} from './estrace.js';

const {__dirname} = createCommons(import.meta.url);
const read = async (name) => {
    const full = join(__dirname, 'fixture', name);
    return await readFile(full, 'utf8');
};

test('estrace: transformSource', async (t) => {
    const context = {
        url: 'file://hello.js',
    };
    const code = await read('trace.js');
    const {source} = await transformSource(code, context);
    const expected = await read('trace-fix.js');
    
    t.equal(source, expected);
    t.end();
});

test('estrace: load', async (t) => {
    const url = `file://${join(__dirname, 'fixture/trace.js')}`;
    const context = {};
    
    const {source} = await load(url, context);
    const data = await read('trace-fix.js');
    const expected = data.replace(/file:\/\/hello.js/g, url);
    
    t.equal(source, expected);
    t.end();
});

test('estrace: transform', async (t) => {
    const source = await read('trace.js');
    const {code} = putout(source, {
        rules: {
            'estrace/trace': ['on', {
                url: 'file://hello.js',
            }],
        },
        plugins: [
            ['estrace', estracePlugin],
        ],
    });
    
    const expected = await read('trace-fix.js');
    
    t.equal(code, expected);
    t.end();
});

test('estrace: transform: no options', async (t) => {
    const source = await read('no-options.js');
    
    const {code} = putout(source, {
        plugins: [
            ['estrace/trace', estracePlugin],
        ],
    });
    
    const expected = await read('no-options-fix.js');
    
    t.equal(code, expected);
    t.end();
});

