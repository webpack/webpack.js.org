---
title: stylus-loader
source: https://raw.githubusercontent.com/webpack-contrib/stylus-loader/master/README.md
edit: https://github.com/webpack-contrib/stylus-loader/edit/master/README.md
repo: https://github.com/webpack-contrib/stylus-loader
---


[![npm][npm]][npm-url]
[![node][node]][node-url]
[![deps][deps]][deps-url]
[![tests][tests]][tests-url]
[![cover][cover]][cover-url]
[![chat][chat]][chat-url]
[![size][size]][size-url]



A Stylus loader for webpack. Compiles Styl to CSS.

## Getting Started

To begin, you'll need to install `stylus` and `stylus-loader`:

```console
$ npm install stylus stylus-loader --save-dev
```

Then add the loader to your `webpack` config. For example:

**webpack.config.js**

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.styl$/,
        loader: "stylus-loader", // compiles Styl to CSS
      },
    ],
  },
};
```

And run `webpack` via your preferred method.

## Options

|                   Name                    |         Type         |      Default       | Description                                              |
| :---------------------------------------: | :------------------: | :----------------: | :------------------------------------------------------- |
|   **[`stylusOptions`](#stylusoptions)**   | `{Object\|Function}` |        `{}`        | Options for Stylus.                                      |
|       **[`sourceMap`](#sourcemap)**       |     `{Boolean}`      | `compiler.devtool` | Enables/Disables generation of source maps.              |
| **[`webpackImporter`](#webpackimporter)** |     `{Boolean}`      |       `true`       | Enables/Disables the default Webpack importer.           |
|  **[`additionalData`](#additionaldata)**  | `{String\|Function}` |    `undefined`     | Prepends/Appends `Stylus` code to the actual entry file. |
|  **[`implementation`](#implementation)**  | `{String\|Function}` |      `stylus`      | Setup Stylus implementation to use.                      |

### `stylusOptions`

Type: `Object|Function`
Default: `{}`

You can pass any Stylus specific options to the `stylus-loader` through the `stylusOptions` property in the [loader options](/configuration/module/#ruleoptions--rulequery).
See the [Stylus documentation](https://stylus-lang.com/docs/js.html).
Options in dash-case should use camelCase.

#### `Object`

Use an object to pass options through to Stylus.

**webpack.config.js**

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.styl$/,
        use: [
          {
            loader: "style-loader",
          },
          {
            loader: "css-loader",
          },
          {
            loader: "stylus-loader",
            options: {
              stylusOptions: {
                /**
                 * Specify Stylus plugins to use. Plugins may be passed as
                 * strings instead of importing them in your Webpack config.
                 *
                 * @type {(string|Function)[]}
                 * @default []
                 */
                use: ["nib"],

                /**
                 * Add path(s) to the import lookup paths.
                 *
                 * @type {string[]}
                 * @default []
                 */
                include: [path.join(__dirname, "src/styl/config")],

                /**
                 * Import the specified Stylus files/paths.
                 *
                 * @type {string[]}
                 * @default []
                 */
                import: ["nib", path.join(__dirname, "src/styl/mixins")],

                /**
                 * Define Stylus variables or functions.
                 *
                 * @type {Array|Object}
                 * @default {}
                 */
                // Array is the recommended syntax: [key, value, raw]
                define: [
                  ["$development", process.env.NODE_ENV === "development"],
                  ["rawVar", 42, true],
                ],
                // Object is deprecated syntax (there is no possibility to specify "raw')
                // define: {
                //   $development: process.env.NODE_ENV === 'development',
                //   rawVar: 42,
                // },

                /**
                 * Include regular CSS on @import.
                 *
                 * @type {boolean}
                 * @default false
                 */
                includeCSS: false,

                /**
                 * Resolve relative url()'s inside imported files.
                 *
                 * @see https://stylus-lang.com/docs/js.html#stylusresolveroptions
                 *
                 * @type {boolean|Object}
                 * @default { nocheck: true }
                 */
                resolveURL: true,
                // resolveURL: { nocheck: true },

                /**
                 * Emits comments in the generated CSS indicating the corresponding Stylus line.
                 *
                 * @see https://stylus-lang.com/docs/executable.html
                 *
                 * @type {boolean}
                 * @default false
                 */
                lineNumbers: true,

                /**
                 * Move @import and @charset to the top.
                 *
                 * @see https://stylus-lang.com/docs/executable.html
                 *
                 * @type {boolean}
                 * @default false
                 */
                hoistAtrules: true,

                /**
                 * Compress CSS output.
                 * In the "production" mode is `true` by default
                 *
                 * @see https://stylus-lang.com/docs/executable.html
                 *
                 * @type {boolean}
                 * @default false
                 */
                compress: true,
              },
            },
          },
        ],
      },
    ],
  },
};
```

#### `Function`

Allows setting the options passed through to Stylus based off of the loader context.

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.styl/,
        use: [
          "style-loader",
          "css-loader",
          {
            loader: "stylus-loader",
            options: {
              stylusOptions: (loaderContext) => {
                // More information about available properties https://webpack.js.org/api/loaders/
                const { resourcePath, rootContext } = loaderContext;
                const relativePath = path.relative(rootContext, resourcePath);

                if (relativePath === "styles/foo.styl") {
                  return {
                    paths: ["absolute/path/c", "absolute/path/d"],
                  };
                }

                return {
                  paths: ["absolute/path/a", "absolute/path/b"],
                };
              },
            },
          },
        ],
      },
    ],
  },
};
```

### `sourceMap`

Type: `Boolean`

**webpack.config.js**

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.styl$/i,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              sourceMap: true,
            },
          },
          {
            loader: "stylus-loader",
            options: {
              sourceMap: true,
            },
          },
        ],
      },
    ],
  },
};
```

### `webpackImporter`

Type: `Boolean`
Default: `true`

Enables/Disables the default Webpack importer.

This can improve performance in some cases.
Use it with caution because aliases and `@import` at-rules starting with `~` will not work.

**webpack.config.js**

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.styl/i,
        use: [
          "style-loader",
          "css-loader",
          {
            loader: "stylus-loader",
            options: {
              webpackImporter: false,
            },
          },
        ],
      },
    ],
  },
};
```

### `additionalData`

Type: `String|Function`
Default: `undefined`

Prepends `Stylus` code before the actual entry file.
In this case, the `stylus-loader` will not override the source but just **prepend** the entry's content.

This is especially useful when some of your Stylus variables depend on the environment:

> ℹ Since you're injecting code, this will break the source mappings in your entry file. Often there's a simpler solution than this, like multiple Stylus entry files.

#### `String`

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.styl/,
        use: [
          "style-loader",
          "css-loader",
          {
            loader: "stylus-loader",
            options: {
              additionalData: `@env: ${process.env.NODE_ENV};`,
            },
          },
        ],
      },
    ],
  },
};
```

#### `Function`

##### Sync

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.styl/,
        use: [
          "style-loader",
          "css-loader",
          {
            loader: "stylus-loader",
            options: {
              additionalData: (content, loaderContext) => {
                // More information about available properties https://webpack.js.org/api/loaders/
                const { resourcePath, rootContext } = loaderContext;
                const relativePath = path.relative(rootContext, resourcePath);

                if (relativePath === "styles/foo.styl") {
                  return "value = 100px" + content;
                }

                return "value 200px" + content;
              },
            },
          },
        ],
      },
    ],
  },
};
```

##### Async

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.styl/,
        use: [
          "style-loader",
          "css-loader",
          {
            loader: "stylus-loader",
            options: {
              additionalData: async (content, loaderContext) => {
                // More information about available properties https://webpack.js.org/api/loaders/
                const { resourcePath, rootContext } = loaderContext;
                const relativePath = path.relative(rootContext, resourcePath);

                if (relativePath === "styles/foo.styl") {
                  return "value = 100px" + content;
                }

                return "value 200px" + content;
              },
            },
          },
        ],
      },
    ],
  },
};
```

### `implementation`

Type: `Function | String`

The special `implementation` option determines which implementation of Stylus to use. Overrides the locally installed `peerDependency` version of `stylus`.

#### Function

**webpack.config.js**

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.styl/i,
        use: [
          "style-loader",
          "css-loader",
          {
            loader: "stylus-loader",
            options: {
              implementation: require("stylus"),
            },
          },
        ],
      },
    ],
  },
};
```

#### String

**webpack.config.js**

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.styl/i,
        use: [
          "style-loader",
          "css-loader",
          {
            loader: "stylus-loader",
            options: {
              implementation: require.resolve("stylus"),
            },
          },
        ],
      },
    ],
  },
};
```

## Examples

### Normal usage

Chain the `stylus-loader` with the [`css-loader`](/loaders/css-loader/) and the [`style-loader`](/loaders/style-loader/) to immediately apply all styles to the DOM.

**webpack.config.js**

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.styl$/,
        use: [
          {
            loader: "style-loader", // creates style nodes from JS strings
          },
          {
            loader: "css-loader", // translates CSS into CommonJS
          },
          {
            loader: "stylus-loader", // compiles Stylus to CSS
          },
        ],
      },
    ],
  },
};
```

### Source maps

To enable sourcemaps for CSS, you'll need to pass the `sourceMap` property in the loader's options. If this is not passed, the loader will respect the setting for webpack source maps, set in `devtool`.

**webpack.config.js**

```javascript
module.exports = {
  devtool: "source-map", // any "source-map"-like devtool is possible
  module: {
    rules: [
      {
        test: /\.styl$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              sourceMap: true,
            },
          },
          {
            loader: "stylus-loader",
            options: {
              sourceMap: true,
            },
          },
        ],
      },
    ],
  },
};
```

### Using nib with stylus

**webpack.config.js**

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.styl$/,
        use: [
          {
            loader: "style-loader", // creates style nodes from JS strings
          },
          {
            loader: "css-loader", // translates CSS into CommonJS
          },
          {
            loader: "stylus-loader", // compiles Stylus to CSS
            options: {
              stylusOptions: {
                use: [require("nib")()],
                import: ["nib"],
              },
            },
          },
        ],
      },
    ],
  },
};
```

### Import JSON files

Stylus does not provide resolving capabilities in the `json` function.
Therefore webpack resolver does not work for `.json` files.
Use [`stylus resolver`](#stylus-resolver).

**index.styl**

```styl
// Suppose the file is located here `node_modules/vars/vars.json`
json('vars.json')

@media queries-small
  body
    display nope

```

**webpack.config.js**

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.styl$/,
        use: [
          "style-loader",
          "css-loader",
          {
            loader: "stylus-loader",
            options: {
              stylusOptions: {
                // Specify the path. where to find files
                paths: ["node_modules/vars"],
              },
            },
          },
        ],
      },
    ],
  },
};
```

### In production

Usually, it's recommended to extract the style sheets into a dedicated file in production using the [MiniCssExtractPlugin](/plugins/mini-css-extract-plugin/). This way your styles are not dependent on JavaScript.

### webpack resolver

Webpack provides an [advanced mechanism to resolve files](/configuration/resolve/).
The `stylus-loader` applies the webpack resolver when processing queries.
Thus you can import your Stylus modules from `node_modules`.

```styl
@import 'bootstrap-styl/bootstrap/index.styl';
```

Using `~` is deprecated and can be removed from your code (**we recommend it**), but we still support it for historical reasons.
Why you can removed it? The loader will first try to resolve `@import`/`@require` as relative, if it cannot be resolved, the loader will try to resolve `@import`/`@require` inside [`node_modules`](/configuration/resolve/#resolvemodules).
Just prepend them with a `~` which tells webpack to look up the [`modules`](/configuration/resolve/#resolvemodules).

```styl
@import "~bootstrap-styl/bootstrap/index.styl";
```

It's important to only prepend it with `~`, because `~/` resolves to the home-directory.
Webpack needs to distinguish between `bootstrap` and `~bootstrap`, because CSS and Styl files have no special syntax for importing relative files.
Writing `@import "file"` is the same as `@import "./file";`

### Stylus resolver

If you specify the `paths` option, modules will be searched in the given `paths`.
This is Stylus default behavior.

**webpack.config.js**

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.styl/,
        use: [
          {
            loader: "style-loader",
          },
          {
            loader: "css-loader",
          },
          {
            loader: "stylus-loader",
            options: {
              stylusOptions: {
                paths: [path.resolve(__dirname, "node_modules")],
              },
            },
          },
        ],
      },
    ],
  },
};
```

### Extracting style sheets

Bundling CSS with webpack has some nice advantages like referencing images and fonts with hashed urls or [hot module replacement](/concepts/hot-module-replacement/) in development. In production, on the other hand, it's not a good idea to apply your style sheets depending on JS execution. Rendering may be delayed or even a [FOUC](https://en.wikipedia.org/wiki/Flash_of_unstyled_content) might be visible. Thus it's often still better to have them as separate files in your final production build.

There are two possibilities to extract a style sheet from the bundle:

- [`extract-loader`](https://github.com/peerigon/extract-loader) (simpler, but specialized on the css-loader's output)
- [MiniCssExtractPlugin](/plugins/mini-css-extract-plugin/) (more complex, but works in all use-cases)

## Contributing

Please take a moment to read our contributing guidelines if you haven't yet done so.

[CONTRIBUTING](https://github.com/webpack-contrib/stylus-loader/blob/master/.github/CONTRIBUTING.md)

## License

[MIT](https://github.com/webpack-contrib/stylus-loader/blob/master/LICENSE)

[npm]: https://img.shields.io/npm/v/stylus-loader.svg
[npm-url]: https://npmjs.com/package/stylus-loader
[node]: https://img.shields.io/node/v/stylus-loader.svg
[node-url]: https://nodejs.org
[deps]: https://david-dm.org/webpack-contrib/stylus-loader.svg
[deps-url]: https://david-dm.org/webpack-contrib/stylus-loader
[tests]: https://github.com/webpack-contrib/stylus-loader/workflows/stylus-loader/badge.svg
[tests-url]: https://github.com/webpack-contrib/stylus-loader/actions
[cover]: https://codecov.io/gh/webpack-contrib/stylus-loader/branch/master/graph/badge.svg
[cover-url]: https://codecov.io/gh/webpack-contrib/stylus-loader
[chat]: https://img.shields.io/badge/gitter-webpack%2Fwebpack-brightgreen.svg
[chat-url]: https://gitter.im/webpack/webpack
[size]: https://packagephobia.now.sh/badge?p=stylus-loader
[size-url]: https://packagephobia.now.sh/result?p=stylus-loader
