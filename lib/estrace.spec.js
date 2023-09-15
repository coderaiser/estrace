import test, {stub} from 'supertape';
import {readFile} from 'node:fs/promises';
import {
    join,
    dirname,
} from 'node:path';
import putout from 'putout';
import estracePlugin from 'estrace/plugin';
import {fileURLToPath} from 'node:url';
import {load} from './estrace.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const read = async (name) => {
    const full = join(__dirname, 'fixture', name);
    return await readFile(full, 'utf8');
};

test('estrace: load', async (t) => {
    const url = `file://${new URL('fixture/trace.js', import.meta.url).pathname}`;
    const context = {
        format: 'module',
    };
    
    const defaultLoad = stub().returns({
        source: await read('trace.js'),
    });
    
    const {source} = await load(url, context, defaultLoad);
    const data = await read('trace-fix.js');
    
    const expected = data.replace(/file:\/\/hello.js/g, url);
    
    t.equal(source, expected);
    t.end();
});

test('estrace: load: no source', async (t) => {
    const url = `file://${new URL('fixture/trace.js', import.meta.url).pathname}`;
    const context = {
        format: 'commonjs',
    };
    
    const defaultLoad = stub();
    const {format} = await load(url, context, defaultLoad);
    
    t.equal(format, 'commonjs');
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
