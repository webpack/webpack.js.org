---
title: expose-loader
source: https://raw.githubusercontent.com/webpack-contrib/expose-loader/master/README.md
edit: https://github.com/webpack-contrib/expose-loader/edit/master/README.md
repo: https://github.com/webpack-contrib/expose-loader
---


[![npm][npm]][npm-url]
[![node][node]][node-url]
[![deps][deps]][deps-url]
[![tests][tests]][tests-url]
[![coverage][cover]][cover-url]
[![chat][chat]][chat-url]
[![size][size]][size-url]



The `expose-loader` loader allow you to expose module to `global` object (`self`, `window` and `global`).

## Getting Started

To begin, you'll need to install `expose-loader`:

```console
$ npm install expose-loader --save-dev
```

Then add the loader to your `webpack` config. For example:

**webpack.config.js**

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.js/i,
        loader: 'expose-loader',
        options: {
          expose: '$',
        },
      },
    ],
  },
};
```

And then require the target file in your bundle's code:

**src/entry.js**

```js
require('expose-loader?expose=libraryName!./thing.js');
```

And run `webpack` via your preferred method.

## Examples

### Expose `jQuery`

For example, let's say you want to expose jQuery as a global called `$`:

```js
require('expose-loader?expose=$!jquery');
```

Thus, `window.$` is then available in the browser console.

Alternately, you can set this in your config file:

**webpack.config.js**

```js
module.exports = {
  module: {
    rules: [
      {
        test: require.resolve('jquery'),
        loader: 'expose-loader',
        options: {
          expose: '$',
        },
      },
    ],
  },
};
```

Let's say you also want to expose it as `window.jQuery` in addition to `window.$`.

For multiple expose you can use `!` in loader string:

**webpack.config.js**

```js
module.exports = {
  module: {
    rules: [
      {
        test: require.resolve('jquery'),
        rules: [
          {
            loader: 'expose-loader',
            options: {
              expose: ['$', 'jQuery'],
            },
          },
        ],
      },
    ],
  },
};
```

The [`require.resolve`](https://nodejs.org/api/modules.html#modules_require_resolve_request_options) call is a Node.js function (unrelated to `require.resolve` in webpack processing).
`require.resolve` gives you the absolute path to the module (`"/.../app/node_modules/jquery/dist/jquery.js"`).
So the expose only applies to the `jquery` module. And it's only exposed when used in the bundle.

## Contributing

Please take a moment to read our contributing guidelines if you haven't yet done so.

## Contributing

Please take a moment to read our contributing guidelines if you haven't yet done so.

[CONTRIBUTING](https://github.com/webpack-contrib/expose-loader/blob/master/.github/CONTRIBUTING.md)

## License

[MIT](https://github.com/webpack-contrib/expose-loader/blob/master/LICENSE)

[npm]: https://img.shields.io/npm/v/expose-loader.svg
[npm-url]: https://npmjs.com/package/expose-loader
[node]: https://img.shields.io/node/v/expose-loader.svg
[node-url]: https://nodejs.org/
[deps]: https://david-dm.org/webpack-contrib/expose-loader.svg
[deps-url]: https://david-dm.org/webpack-contrib/expose-loader
[tests]: https://github.com/webpack-contrib/expose-loader/workflows/expose-loader/badge.svg
[tests-url]: https://github.com/webpack-contrib/expose-loader/actions
[cover]: https://codecov.io/gh/webpack-contrib/expose-loader/branch/master/graph/badge.svg
[cover-url]: https://codecov.io/gh/webpack-contrib/expose-loader
[chat]: https://badges.gitter.im/webpack/webpack.svg
[chat-url]: https://gitter.im/webpack/webpack
[size]: https://packagephobia.now.sh/badge?p=expose-loader
[size-url]: https://packagephobia.now.sh/result?p=expose-loader
