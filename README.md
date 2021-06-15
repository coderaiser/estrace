# ESTrace [![License][LicenseIMGURL]][LicenseURL] [![NPM version][NPMIMGURL]][NPMURL] [![Dependency Status][DependencyStatusIMGURL]][DependencyStatusURL] [![Build Status][BuildStatusIMGURL]][BuildStatusURL] [![Coverage Status][CoverageIMGURL]][CoverageURL]

[NPMIMGURL]: https://img.shields.io/npm/v/estrace.svg?style=flat
[DependencyStatusIMGURL]: https://img.shields.io/david/coderaiser/estrace.svg?style=flat
[BuildStatusURL]: https://github.com/coderaiser/estrace/actions?query=workflow%3A%22Node+CI%22 "Build Status"
[BuildStatusIMGURL]: https://github.com/coderaiser/estrace/workflows/Node%20CI/badge.svg
[LicenseIMGURL]: https://img.shields.io/badge/license-MIT-317BF9.svg?style=flat
[NPMURL]: https://npmjs.org/package/estrace "npm"
[DependencyStatusURL]: https://david-dm.org/coderaiser/estrace "Dependency Status"
[LicenseURL]: https://tldrlegal.com/license/mit-license "MIT License"
[CoverageURL]: https://coveralls.io/github/coderaiser/estrace?branch=master
[CoverageIMGURL]: https://coveralls.io/repos/coderaiser/estrace/badge.svg?branch=master&service=github

Trace functions in Node.js [EcmaScript Modules](https://nodejs.org/api/esm.html#esm_modules_ecmascript_modules).

## Install

`npm i estrace`

## Run

[Loaders](https://nodejs.org/api/esm.html#esm_loaders) used to get things done, run with `--loader` flag:

```sh
node --loader estrace lint.js
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
> node --loader estrace lint.js
enter lint [ [] ]
enter getFiles [ [] ]
exit getFiles
enter lintFiles [ [] ]
exit lintFiles
exit lint
```

## License

MIT

