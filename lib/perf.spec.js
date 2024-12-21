import {test} from 'supertape';
import {convert, merge} from './perf.js';

test('estrace: perf: convert', (t) => {
    const result = convert({
        'file://index.js:1': {
            fn: 1,
        },
    });
    
    const expected = [{
        count: 1,
        name: 'fn:1',
        url: 'file://index.js',
    }];
    
    t.deepEqual(result, expected);
    t.end();
});

test('estrace: perf: merge', (t) => {
    const result = merge([{
        count: 1,
        name: 'fn:1',
        url: 'file://index.js',
    }, {
        count: 1,
        name: 'hello:2',
        url: 'file://index.js',
    }]);
    
    const expected = {
        'file://index.js': [{
            count: 1,
            name: 'fn:1',
        }, {
            count: 1,
            name: 'hello:2',
        }],
    };
    
    t.deepEqual(result, expected);
    t.end();
});
