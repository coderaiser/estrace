import {
    test,
    stub,
} from 'supertape';

import {
    enter,
    exit,
} from './log.js';

test('estrace: log: enter', (t) => {
    const {log} = console;
    
    const newLog = stub();
    console.log = newLog;
    enter('hello', [], 'file://hello.js:1');
    console.log = log;
    
    const expected = [
        '..💣 hello()',
        'file://hello.js:1',
    ];
    
    t.calledWith(newLog, expected);
    t.end();
});

test('estrace: log: exit', (t) => {
    const {log} = console;
    
    const newLog = stub();
    console.log = newLog;
    exit('hello', [], 'file://hello.js:1');
    console.log = log;
    
    const expected = [
        '..💥 hello ->',
        [],
        'file://hello.js:1',
    ];
    
    t.calledWith(newLog, expected);
    t.end();
});

