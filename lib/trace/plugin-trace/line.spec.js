import {test} from 'supertape';
import {getLine} from './line.js';

test('estrace: getLine: no node', (t) => {
    const parentPath = {
        isExportDeclaration() {
            return false;
        },
    };
    
    const path = {
        parentPath,
    };
    
    const result = getLine(path);
    const expected = '🤷';
    
    t.equal(result, expected);
    t.end();
});

test('estrace: getLine: export', (t) => {
    const parentPath = {
        isExportDeclaration() {
            return true;
        },
        node: {
            loc: {
                start: {
                    line: 1,
                },
            },
        },
    };
    
    const path = {
        parentPath,
    };
    
    const result = getLine(path);
    const expected = 1;
    
    t.equal(result, expected);
    t.end();
});
