import {run} from 'madrun';

const NODE_OPTIONS = `'--loader ./lib/estrace.js'`;
const traceEnv = {
    NODE_OPTIONS,
};

const UPDATE_FIXTURE = {
    UPDATE: 1,
};

export default {
    'test': () => `tape 'test/**/*.js' 'lib/**/*.spec.js'`,
    'test:fix': async () => [UPDATE_FIXTURE, await run('test')],
    'trace:test': () => [traceEnv, `tape 'test/**/*.js' 'lib/**/*.spec.js'`],
    'coverage': async () => `c8 ${await run('test')}`,
    'lint': () => 'putout . --raw',
    'fresh:lint': () => run('lint', '--fresh'),
    'lint:fresh': () => run('lint', '--fresh'),
    'fix:lint': () => run('lint', '--fix'),
    'report': () => 'c8 report --reporter=lcov',
    'watcher': () => 'nodemon -w test -w lib --exec',
    
    'watch:test': async () => await run('watcher', `"${await run('test')}"`),
    
    'watch:lint': async () => await run('watcher', `'npm run lint'`),
    'watch:tape': () => 'nodemon -w test -w lib --exec tape',
    
    'watch:coverage': async () => await run('watcher', await run('coverage')),
};
