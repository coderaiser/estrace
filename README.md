# ESTrace [![License][LicenseIMGURL]][LicenseURL] [![NPM version][NPMIMGURL]][NPMURL] [![Build Status][BuildStatusIMGURL]][BuildStatusURL] [![Coverage Status][CoverageIMGURL]][CoverageURL]

[NPMIMGURL]: https://img.shields.io/npm/v/estrace.svg?style=flat
[BuildStatusURL]: https://github.com/coderaiser/estrace/actions?query=workflow%3A%22Node+CI%22 "Build Status"
[BuildStatusIMGURL]: https://github.com/coderaiser/estrace/workflows/Node%20CI/badge.svg
[LicenseIMGURL]: https://img.shields.io/badge/license-MIT-317BF9.svg?style=flat
[NPMURL]: https://npmjs.org/package/estrace "npm"
[LicenseURL]: https://tldrlegal.com/license/mit-license "MIT License"
[CoverageURL]: https://coveralls.io/github/coderaiser/estrace?branch=master
[CoverageIMGURL]: https://coveralls.io/repos/coderaiser/estrace/badge.svg?branch=master&service=github

Trace functions in Node.js [EcmaScript Modules](https://nodejs.org/api/esm.html#esm_modules_ecmascript_modules). For CommonJS use [njsTrace](https://github.com/ValYouW/njsTrace).

## Install

`npm i estrace`

## Run

[Loaders](https://nodejs.org/api/esm.html#esm_loaders) used to get things done, run with `--loader` flag:

```sh
NODE_OPTIONS="'--loader estrace --no-warnings'" node lint.js
```

## Perf

When you want to see report of the most hot function calls count use:

```sh
NODE_OPTIONS="'--loader estrace/perf --no-warnings'" node example/perf.js
```

## Example

Let's suppose you want to trace `lint.js`:

```js
const checkFile = (a) => a;
lint();

function lint(runners) {
    const files = getFiles(runners);
    const checkedFiles = checkFiles(files);
    
    return checkedFiles;
}

function getFiles(runners) {
    const files = [];
    
    for (const run of runners) {
        files.push(...run());
    }
    
    return files;
}

function lintFiles(files) {
    const linted = [];
    
    for (const file of files) {
        linted.push(checkFile(file));
    }
    
    return linted;
}
```

You will see something like this

```sh
coderaiser@cloudcmd:~/estrace$ node --loader estrace example/lint.js
..💣 lint([]) 16.05mb file:///Users/coderaiser/estrace/example/lint.js:5
....💣 getFiles([]) 16.05mb file:///Users/coderaiser/estrace/example/lint.js:12
....💥 getFiles 16.06mb file:///Users/coderaiser/estrace/example/lint.js:12
....💣 lintFiles([]) 16.06mb file:///Users/coderaiser/estrace/example/lint.js:22
....💥 lintFiles 16.06mb file:///Users/coderaiser/estrace/example/lint.js:22
..💥 lint 16.06mb file:///Users/coderaiser/estrace/example/lint.js:5
```

## How `ESTrace` works?

Let's suppost you have a function: `const fn = (a) => a`. `EStrace` will replace it with:

```js
const fn = (a) => {
    try {
        var __estrace_context = __estrace.enter('<anonymous:2>', 'file://hello.js:2', arguments);
        return a;
    } finally {
        __estrace.exit('<anonymous:2>', 'file://hello.js:2', __estrace_context);
    }
};
```

And you cat get more information about the way your code works.

## Ignore function

When you need to ignore a function, just add `__estrace.ignore()` before function:

```js
export /* __estrace.ignore() */
function enter() {}
```

And `ESTrace` won't touch it.

## Using as plugin

First of all `ESTrace` is plugin for 🐊[**Putout**](https://github.com/coderaiser/putout) and it can be used independely:

```js
import putout from 'putout';
import {estracePlugin} from 'estrace/plugin';

const source = `
    const fn = (a) => a;
`;

const {code} = putout(source, {
    plugins: [estracePlugin],
});

console.log(code);
```

### Passing file url

If you need to pass `url`, you can with help of `rules` :

```js
const {code} = putout(source, {
    rules: {
        'estrace/trace': ['on', {
            url: 'file://hello.js',
        }],
    },
    plugins: [estracePlugin],
});
```

### Exclude functions

When you need to `exclude` some kinds of functions, you can use universal [cross-plugin way](https://github.com/coderaiser/putout#exclude):

```js
const {code} = putout(source, {
    rules: {
        'estrace/trace': ['on', {
            url: 'file://hello.js',
            exclude: [
                'ArrowFunctionExpression',
            ],
        }],
    },
    plugins: [estracePlugin],
});
```

### Overriding plugin name

If for some reason you need to override the name of a plugin, you can use default import
and name it in a way you like.

```js
import putout from 'putout';
import funnyTracer from 'estrace/plugin';

const source = `
    const fn = (a) => a;
`;

const {code} = putout(source, {
    rules: {
        'funnyTracer/trace': ['on', {
            url: 'file://hello.js',
        }],
    },
    plugins: [
        ['funnyTracer', funnyTracer],
    ],
});

console.log(code);
```

#### Supported function types:

— `FunctionDeclaration` (named):

```js
function hello() {
    return 'world';
}
```

— `FunctionExpression` (anonymous):

```js
hello(function(word) {
    return `hello ${word}`;
});
```

— `ArrowFunctionExpression` (arrow):

```js
hello((word) => {
    return `hello ${word}`;
});
```

— `ClassMethod` (method):

```js
class Hello {
    hello(word) {
        return `hello ${word}`;
    }
}
```

## License

MIT
