import {readFile} from 'fs/promises';
import {join} from 'path';

import test from 'supertape';
import {createCommons} from 'simport';

import {transformSource} from './estrace.js';

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

