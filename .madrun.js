import {
    run,
    cutEnv,
} from 'madrun';

const NODE_OPTIONS = `'--loader ./lib/estrace.js'`;
const traceEnv = {
    NODE_OPTIONS,
};

const UPDATE_FIXTURE = {
    UPDATE: 1,
};

export default {
    'test': () => `tape 'test/**/*.js' 'lib/**/*.spec.js'`,
    'test:fix': async () => [UPDATE_FIXTURE, await cutEnv('test')],
    'trace:test': () => [traceEnv, `tape 'test/**/*.js' 'lib/**/*.spec.js'`],
    'coverage': async () => `c8 --exclude="lib/**/{fixture,*.spec.js}" ${await cutEnv('test')}`,
    'lint': () => 'putout . --raw',
    'fresh:lint': () => run('lint', '--fresh'),
    'lint:fresh': () => run('lint', '--fresh'),
    'fix:lint': () => run('lint', '--fix'),
    'report': () => 'c8 report --reporter=lcov',
    'watcher': () => 'nodemon -w test -w lib --exec',
    
    'watch:test': async () => await run('watcher', `"${await cutEnv('test')}"`),
    
    'watch:lint': () => run('watcher', '\'npm run lint\''),
    'watch:tape': () => 'nodemon -w test -w lib --exec tape',
    
    'watch:coverage': async () => await run('watcher', await run('coverage')),
};

