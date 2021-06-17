import {test} from 'supertape';
import {getLine} from './line.js';

test('estrace: getLine: no node', (t) => {
    const path = {};
    
    const result = getLine(path);
    const expected = '🤷';
    
    t.equal(result, expected);
    t.end();
});
