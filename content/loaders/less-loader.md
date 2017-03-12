---
title: less-loader
source: https://raw.githubusercontent.com/webpack-contrib/less-loader/master/README.md
edit: https://github.com/webpack-contrib/less-loader/edit/master/README.md
---
## Install

```bash
npm install --save-dev less-loader less
```

The less-loader requires [less](https://github.com/less/less.js) as [`peerDependency`](https://docs.npmjs.com/files/package.json#peerdependencies). Thus you are able to control the versions accurately.

## Examples

Chain the less-loader with the [css-loader](https://github.com/webpack-contrib/css-loader) and the [style-loader](https://github.com/webpack-contrib/style-loader) to immediately apply all styles to the DOM.

```js
// webpack.config.js
module.exports = {
    ...
    module: {
        rules: [{
            test: /\.less$/,
            use: [{
                loader: "style-loader" // creates style nodes from JS strings
            }, {
                loader: "css-loader" // translates CSS into CommonJS
            }, {
                loader: "less-loader" // compiles Less to CSS
            }]
        }]
    }
};
```

You can pass any Less specific options to the less-loader via [loader options](https://webpack.js.org/configuration/module/#rule-options-rule-query). See the [Less documentation](http://lesscss.org/usage/#command-line-usage-options) for all available options in dash-case. Since we're passing these options to Less programmatically, you need to pass them in camelCase here:

```js
// webpack.config.js
module.exports = {
    ...
    module: {
        rules: [{
            test: /\.less$/,
            use: [{
                loader: "style-loader"
            }, {
                loader: "css-loader"
            }, {
                loader: "less-loader", options: {
                    strictMath: true,
                    noIeCompat: true
                }
            }]
        }]
    }
};
```

### In production

Usually, it's recommended to extract the style sheets into a dedicated file in production using the [ExtractTextPlugin](https://github.com/webpack-contrib/extract-text-webpack-plugin). This way your styles are not dependent on JavaScript:

```js
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const extractLess = new ExtractTextPlugin({
    filename: "[name].[contenthash].css",
    disable: process.env.NODE_ENV === "development"
});

module.exports = {
    ...
    module: {
        rules: [{
            test: /\.less$/,
            use: extractLess.extract({
                use: [{
                    loader: "css-loader"
                }, {
                    loader: "less-loader"
                }],
                // use style-loader in development
                fallback: "style-loader"
            })
        }]
    },
    plugins: [
        extractLess
    ]
};
```

## Usage

### Imports

webpack provides an [advanced mechanism to resolve files](https://webpack.js.org/configuration/resolve/). The less-loader applies a Less plugin that passes all queries to the webpack resolving engine. Thus you can import your less-modules from `node_modules`. Just prepend them with a `~` which tells webpack to look-up the [`modules`](https://webpack.js.org/configuration/resolve/#resolve-modules).

```css
@import "~bootstrap/less/bootstrap";
```

It's important to only prepend it with `~`, because `~/` resolves to the home-directory. webpack needs to distinguish between `bootstrap` and `~bootstrap` because css- and less-files have no special syntax for importing relative files. Writing `@import "file"` is the same as `@import "./file";`

Also please note that for [CSS modules](https://github.com/css-modules/css-modules), relative file paths do not work as expected. Please see [this issue for the explanation](https://github.com/webpack-contrib/less-loader/issues/109#issuecomment-253797335).

### Plugins

In order to use [plugins](http://lesscss.org/usage/#plugins), simply set the `lessPlugins` option like this:

```js
// webpack.config.js
const CleanCSSPlugin = require("less-plugin-clean-css");

module.exports = {
    ...
            {
                loader: "less-loader", options: {
                    lessPlugins: [
                        new CleanCSSPlugin({ advanced: true })
                    ]
                }
            }]
    ...
};
```

### Extracting style sheets

Bundling CSS with webpack has some nice advantages like referencing images and fonts with hashed urls or [hot module replacement](https://webpack.js.org/concepts/hot-module-replacement/) in development. In production, on the other hand, it's not a good idea to apply your style sheets depending on JS execution. Rendering may be delayed or even a [FOUC](https://en.wikipedia.org/wiki/Flash_of_unstyled_content) might be visible. Thus it's often still better to have them as separate files in your final production build.

There are two possibilities to extract a style sheet from the bundle:

- [extract-loader](https://github.com/peerigon/extract-loader) (simpler, but specialized on the css-loader's output)
- [extract-text-webpack-plugin](https://github.com/webpack-contrib/extract-text-webpack-plugin) (more complex, but works in all use-cases)

### Source maps

To enable CSS source maps, you'll need to pass the `sourceMap` option to the less-loader *and* the css-loader. Your `webpack.config.js` should look like this:

```javascript
module.exports = {
    ...
    devtool: "source-map", // any "source-map"-like devtool is possible
    module: {
        rules: [{
            test: /\.less$/,
            use: [{
                loader: "style-loader"
            }, {
                loader: "css-loader", options: {
                    sourceMap: true
                }
            }, {
                loader: "less-loader", options: {
                    sourceMap: true
                }
            }]
        }]
    }
};
```

If you want to edit the original Less files inside Chrome, [there's a good blog post](https://medium.com/@toolmantim/getting-started-with-css-sourcemaps-and-in-browser-sass-editing-b4daab987fb0). The blog post is about Sass but it also works for Less.

## Maintainer

<table>
    <tr>
      <td align="center">
        <a href="https://github.com/jhnns"><img width="150" height="150" src="https://github.com/jhnns.png?s=150"></a>
        <br>
        <a href="https://github.com/jhnns">Johannes Ewald</a>
      </td>
    <tr>
</table>


[npm]: https://img.shields.io/npm/v/less-loader.svg
[npm-stats]: https://img.shields.io/npm/dm/less-loader.svg
[npm-url]: https://npmjs.com/package/less-loader

[node]: https://img.shields.io/node/v/less-loader.svg
[node-url]: https://nodejs.org

[deps]: https://david-dm.org/webpack-contrib/less-loader.svg
[deps-url]: https://david-dm.org/webpack-contrib/less-loader

[travis]: http://img.shields.io/travis/webpack-contrib/less-loader.svg
[travis-url]: https://travis-ci.org/webpack-contrib/less-loader

[appveyor-url]: https://ci.appveyor.com/project/jhnns/less-loader/branch/master
[appveyor]: https://ci.appveyor.com/api/projects/status/github/webpack-contrib/less-loader?svg=true

[coverage]: https://img.shields.io/codecov/c/github/webpack-contrib/less-loader.svg
[coverage-url]: https://codecov.io/gh/webpack-contrib/less-loader

[chat]: https://badges.gitter.im/webpack-contrib/webpack.svg
[chat-url]: https://gitter.im/webpack-contrib/webpack
