---
title: jshint-loader
source: https://raw.githubusercontent.com/webpack-contrib/jshint-loader/master/README.md
edit: https://github.com/webpack-contrib/jshint-loader/edit/master/README.md
repo: https://github.com/webpack-contrib/jshint-loader
---


[![npm][npm]][npm-url]
[![node][node]][node-url]
[![deps][deps]][deps-url]
[![tests][tests]][tests-url]
[![chat][chat]][chat-url]



A JSHint loader module for webpack. Runs [JSHint](http://jshint.com/) on
JavaScript files in a bundle at build-time.

## Requirements

This module requires a minimum of Node v6.9.0 and Webpack v4.0.0.

## Getting Started

To begin, you'll need to install `jshint-loader`:

```console
$ npm install jshint-loader --save-dev
```

Then add the loader to your `webpack` config. For example:

```js
// webpack.config.js
module.exports = {
  module: {
    rules: [
      {
        test: /.js/,
        enforce: 'pre',
        exclude: /node_modules/,
        use: [
          {
            loader: `jshint-loader`,
            options: {...options}
          }
        ]
      }
    ]
  }
}
```


And run `webpack` via your preferred method.

## Options

All valid JSHint options are valid on this object, in addition to the custom
loader options listed below:

delete options.;
delete options.;
delete options.;

### `emitErrors`

Type: `Boolean`
Default: `undefined`

Instructs the loader to emit all JSHint warnings and errors as webpack errors.

### `failOnHint`

Type: `Boolean`
Default: `undefined`

Instructs the loader to cause the webpack build to fail on all JSHint warnings
and errors.

### `reporter`

Type: `Function`
Default: `undefined`

A function used to format and emit JSHint warnings and errors.

## Custom Reporter

By default, `jshint-loader` will provide a default reporter.

However, if you prefer a custom reporter, pass a function under the `reporter`
property in `jshint` options. (see *usage* above)

The reporter function will be passed an array of errors/warnings produced by
JSHint with the following structure:
```js
[
{
    id:        [string, usually '(error)'],
    code:      [string, error/warning code],
    reason:    [string, error/warning message],
    evidence:  [string, a piece of code that generated this error]
    line:      [number]
    character: [number]
    scope:     [string, message scope;
                usually '(main)' unless the code was eval'ed]

    [+ a few other legacy fields that you don't need to worry about.]
},
// ...
// more errors/warnings
]
```

The reporter function will be excuted with the loader context as `this`. You may
emit messages using `this.emitWarning(...)` or `this.emitError(...)`. See
[webpack docs on loader context](https://webpack.js.org/api/loaders/#the-loader-context).

_Note: JSHint reporters are **not compatible** with JSHint-loader!
This is due to the fact that reporter input is only processed from one file; not
multiple files. Error reporting in this manner differs from
[traditional reporters](http://www.jshint.com/docs/reporters/) for JSHint
since the loader plugin (i.e. JSHint-loader) is executed for each source file;
and thus the reporter is executed for each file._

The output in webpack CLI will usually be:
```js
...
WARNING in ./path/to/file.js
<reporter output>
...
```
`

## Contributing

Please take a moment to read our contributing guidelines if you haven't yet done so.

#### [CONTRIBUTING](https://raw.githubusercontent.com/webpack-contrib/jshint-loader/master/.github/CONTRIBUTING)

## License

#### [MIT](https://raw.githubusercontent.com/webpack-contrib/jshint-loader/master/LICENSE)

[npm]: https://img.shields.io/npm/v/jshint-loader.svg
[npm-url]: https://npmjs.com/package/jshint-loader

[node]: https://img.shields.io/node/v/jshint-loader.svg
[node-url]: https://nodejs.org

[deps]: https://david-dm.org/webpack-contrib/jshint-loader.svg
[deps-url]: https://david-dm.org/webpack-contrib/jshint-loader

[tests]: 	https://img.shields.io/circleci/project/github/webpack-contrib/jshint-loader.svg
[tests-url]: https://circleci.com/gh/webpack-contrib/jshint-loader

[cover]: https://codecov.io/gh/webpack-contrib/jshint-loader/branch/master/graph/badge.svg
[cover-url]: https://codecov.io/gh/webpack-contrib/jshint-loader

[chat]: https://img.shields.io/badge/gitter-webpack%2Fwebpack-brightgreen.svg
[chat-url]: https://gitter.im/webpack/webpack
