---
title: mocha-loader
source: https://raw.githubusercontent.com/webpack-contrib/mocha-loader/master/README.md
edit: https://github.com/webpack-contrib/mocha-loader/edit/master/README.md
repo: https://github.com/webpack-contrib/mocha-loader
---
Allows <a href="http://mochajs.org/">Mocha</a> tests to be loaded and run via webpack

## Install

```bash
npm i -D mocha-loader
```

## Usage

##

```bash
webpack --module-bind 'mocha-loader!./test'
```

### Require

```js
import test from 'mocha-loader!./test'
```

### Config (recommended)

```js
import test from './test'
```

**`webpack.config.js`**
```js
module.exports = {
  entry: './entry.js',
  output: {
    path: __dirname,
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /test\.js$/,
        use: 'mocha-loader',
        exclude: /node_modules/
      }
    ]
  }
}
```

## Options

>

> **None**

>

## Examples

### Basic

**`module.js`**
```js
module.exports = true
```

**`test.js`**
```js
describe('Test', () => {
  it('should succeed', (done) => {
    setTimeout(done, 1000)
  })

  it('should fail', () => {
    setTimeout(() => {
      throw new Error('Failed')
    }, 1000)
  })

  it('should randomly fail', () => {
    if (require('./module')) {
      throw new Error('Randomly failed')
    }
  })
})
```


[npm]: https://img.shields.io/npm/v/mocha-loader.svg
[npm-url]: https://npmjs.com/package/mocha-loader

[node]: https://img.shields.io/node/v/mocha-loader.svg
[node-url]: https://nodejs.org

[deps]: https://david-dm.org/webpack-contrib/mocha-loader.svg
[deps-url]: https://david-dm.org/webpack-contrib/mocha-loader

[test]: 	https://img.shields.io/circleci/project/github/webpack-contrib/mocha-loader.svg
[test-url]: https://circleci.com/gh/webpack-contrib/mocha-loader

[cover]: https://codecov.io/gh/webpack-contrib/mocha-loader/branch/master/graph/badge.svg
[cover-url]: https://codecov.io/gh/webpack-contrib/mocha-loader

[chat]: https://img.shields.io/badge/gitter-webpack%2Fwebpack-brightgreen.svg
[chat-url]: https://gitter.im/webpack/webpack
