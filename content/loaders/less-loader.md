---
title: less-loader
source: https://raw.githubusercontent.com/webpack-contrib/less-loader/master/README.md
edit: https://github.com/webpack-contrib/less-loader/edit/master/README.md
---
## Install

```bash
npm install --save-dev less-loader less
```

## Usage

Use [`less-loader`](https://github.com/webpack/less-loader) in tandem with [css-loader](https://github.com/webpack/css-loader) & [style-loader](https://github.com/webpack/style-loader) to add LESS support for webpack.

Use the loader either via your webpack config, CLI or inline.

### Via webpack config (recommended)

**webpack.config.js**
```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.less$/,
        use: [
          'style-loader',
          { loader: 'css-loader', options: { importLoaders: 1 } },
          'less-loader'
        ]
      }
    ]
  }
}
```

**In your application**
```js
import css from 'file.less';
```

### CLI

```bash
webpack --module-bind 'less=style-loader!css-loader!less-loader'
```

**In your application**
```js
import css from 'file.less';
```

### Inline

**In your application**
```js
import css from 'style-loader!css-loader!less-loader!./file.less';
```

## Options

You can pass any LESS specific options to less-loader via loader options or query parameters.

See the [LESS documentation](http://lesscss.org/usage/#command-line-usage-options) for all available options. LESS translates dash-case to camelCase. Certain options which take values (e.g. `lessc --modify-var="a=b"`) are better handled with the [JSON Syntax](http://webpack.github.io/docs/using-loaders.html#query-parameters)

```js
{
  test: /\.less$/,
  use: [
    'style-loader',
    { loader: 'css-loader', options: { importLoaders: 1 } },
    { loader: 'less-loader', options: { strictMath: true, noIeCompat: true } }
	]
}
```

### Plugins

In order to use [plugins](http://lesscss.org/usage/#plugins), simply set
the `options.lessPlugins`-option on your `webpack.config.js`.

```js
const CleanCSSPlugin = require('less-plugin-clean-css');

{
  test: /\.less$/,
  use: [
    'style-loader',
    { loader: 'css-loader', options: { importLoaders: 1 } },
    {
      loader: 'less-loader',
      options: { lessPlugins: [ new CleanCSSPlugin({ advanced: true }) ] }
    }
}
```

### Imports

webpack provides an [advanced mechanism to resolve files](https://webpack.js.org/configuration/resolve/). The less-loader stubs less' `fileLoader` and passes all queries to the webpack resolving engine. Thus you can import your less-modules from `node_modules`. Just prepend them with a `~` which tells webpack to look-up the [`modules`](https://webpack.js.org/configuration/resolve/#resolve-modules)

```css
@import "~bootstrap/less/bootstrap";
```

It's important to only prepend it with `~`, because `~/` resolves to the home-directory. webpack needs to distinguish between `bootstrap` and `~bootstrap` because css- and less-files have no special syntax for importing relative files. Writing `@import "file"` is the same as `@import "./file";`

Also please note that for [CSS modules](https://github.com/css-modules/css-modules), relative file paths do not work as expected. Please see [this issue for the explanation](https://github.com/webpack/less-loader/issues/109#issuecomment-253797335).

### Sourcemaps

Because of browser limitations, sourcemaps are only available in conjunction with the [extract-text-webpack-plugin](https://github.com/webpack/extract-text-webpack-plugin). Use that plugin to extract the CSS code from the generated JS bundle into a separate file (which improves performance because JS and CSS are loaded in parallel).

**webpack.config.js**
```js
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  // must be 'source-map' or 'inline-source-map'
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.less$/,
        use: ExtractTextPlugin.extract(
          fallbackLoader: 'style-loader',
          loaders: [
            // activate source maps via loader query
            {
              loader: 'css-loader',
              options: { sourceMap: true, importLoaders: 1 }
            },
            {
              loader: 'less-loader',
              options: { sourceMap: true }
            }
          ]
        )
      }
    ]
  },
  plugins: [
    // extract CSS into separate file
    new ExtractTextPlugin('app.bundle.css')
  ]
}
```

If you want to view the original LESS files inside Chrome and even edit it,  [there's a good blog post](https://medium.com/@toolmantim/getting-started-with-css-sourcemaps-and-in-browser-sass-editing-b4daab987fb0). Checkout [test/sourceMap](https://github.com/webpack/less-loader/tree/master/test) for a running example. Make sure to serve the content with an HTTP server.

## Contributing

Don't hesitate to create a pull request. Every contribution is appreciated. In development you can start the tests by calling `npm test`.

The tests are basically just comparing the generated css with a reference css-file located under `test/css`. You can easily generate a reference css-file by calling `node test/helpers/generateCss.js <less-file-without-less-extension>`. It passes the less-file to less and writes the output to the `test/css`-folder.

## Maintainer

<table>
  <tbody>
    <tr>
      <td align="center">
        <img width="150 height="150" src="https://github.com/jhnns.png?s=150">
        <br>
        <a href="https://github.com/jhnns">Johannes Ewald</a>
      </td>
    <tr>
  <tbody>
</table>


[npm]: https://img.shields.io/npm/v/less-loader.svg
[npm-url]: https://npmjs.com/package/less-loader

[node]: https://img.shields.io/node/v/less-loader.svg
[node-url]: https://nodejs.org

[deps]: https://david-dm.org/webpack/less-loader.svg
[deps-url]: https://david-dm.org/webpack/less-loader

[tests]: http://img.shields.io/travis/webpack/less-loader.svg
[tests-url]: https://travis-ci.org/webpack/less-loader

[cover]: https://coveralls.io/repos/github/webpack/less-loader/badge.svg
[cover-url]: https://coveralls.io/github/webpack/less-loader

[chat]: https://badges.gitter.im/webpack/webpack.svg
[chat-url]: https://gitter.im/webpack/webpack
