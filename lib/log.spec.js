import {
    test,
    stub,
} from 'supertape';

import {
    enter,
    exit,
} from './log.js';

const cutMemory = (a) => a.replace(/\d+\.\d+/, '');

test('estrace: log: enter', (t) => {
    const {log} = console;
    
    const newLog = stub();
    console.log = newLog;
    enter('hello', 'file://hello.js:1', []);
    console.log = log;
    
    const expected = '..💣 hello() mb file://hello.js:1';
    const [first] = newLog.args[0];
    const arg = cutMemory(first);
    
    t.equal(arg, expected);
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
        '"file://hello.js:1"',
        'mb',
        '',
    ];
    
    const [args] = newLog.args;
    const memoryIndex = 2;
    args[memoryIndex] = cutMemory(args[memoryIndex]);
    
    t.deepEqual(args, expected);
    t.end();
});

test('estrace: log: exit: void', (t) => {
    const {log} = console;
    
    const newLog = stub();
    console.log = newLog;
    exit('hello', 'file://hello.js:1', undefined);
    console.log = log;
    
    const expected = [
        '.💥 hello ->',
        'void',
        'mb',
        'file://hello.js:1',
    ];
    
    const [args] = newLog.args;
    const memoryIndex = 2;
    args[memoryIndex] = cutMemory(args[memoryIndex]);
    
    t.deepEqual(args, expected);
    t.end();
});

