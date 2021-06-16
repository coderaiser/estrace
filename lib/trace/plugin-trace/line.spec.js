import {test} from 'supertape';
import {getLine} from './line.js';

test('estrace: getLine: no node', (t) => {
    const path = {};
    
    const result = getLine(path);
    const expected = 'cannot determine line number';
    
    t.equal(result, expected);
    t.end();
});
