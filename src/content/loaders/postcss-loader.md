---
title: postcss-loader
source: https://raw.githubusercontent.com/webpack-contrib/postcss-loader/master/README.md
edit: https://github.com/webpack-contrib/postcss-loader/edit/master/README.md
repo: https://github.com/webpack-contrib/postcss-loader
---

</div>

<<<<<<< HEAD
## Install {#install}

```bash
npm i -D postcss-loader
```

## Usage {#usage}

### `Configuration` {#configuration}

**`postcss.config.js`**

```js
module.exports = {
  parser: 'sugarss',
  plugins: {
    'postcss-import': {},
    'postcss-preset-env': {},
    cssnano: {},
  },
};
```
=======
[![npm][npm]][npm-url]
[![node][node]][node-url]
[![deps][deps]][deps-url]
[![tests][tests]][tests-url]
[![coverage][cover]][cover-url]
[![size][size]][size-url]

Webpack chat: [![chat][chat]][chat-url]
>>>>>>> 365d872615d16bfd69f540c1f8f70890de9c81ff

PostCSS chat: [![chat-postcss][chat-postcss]][chat-postcss-url]

<<<<<<< HEAD
### `Config Cascade` {#config-cascade}
=======
>>>>>>> 365d872615d16bfd69f540c1f8f70890de9c81ff


Loader to process CSS with [`PostCSS`](https://github.com/postcss/postcss).

## Getting Started

To begin, you'll need to install `postcss-loader` and `postcss`:

```console
npm install --save-dev postcss-loader postcss
```

Then add the plugin to your `webpack` config. For example:

**file.js**

```js
import css from 'file.css';
```

<<<<<<< HEAD
## Options {#options}

|                Name                 |            Type             |                Default                | Description                                     |
| :---------------------------------: | :-------------------------: | :-----------------------------------: | :---------------------------------------------- |
|           [`exec`](#exec)           |         `{Boolean}`         |              `undefined`              | Enable PostCSS Parser support in `CSS-in-JS`    |
|         [`config`](#config)         | `{String\|Object\|Boolean}` |              `undefined`              | Set `postcss.config.js` config path && `ctx`    |
| [`postcssOptions`](#postcssoptions) |         `{Object}`          | `defaults values for Postcss.process` | Set Postcss.process options and postcss plugins |
|      [`sourceMap`](#sourcemap)      |         `{Boolean}`         |          `compiler.devtool`           | Enables/Disables generation of source maps      |

### `Exec` {#exec}

Type: `Boolean`
Default: `undefined`

If you use JS styles without the [`postcss-js`][postcss-js] parser, add the `exec` option.

=======
>>>>>>> 365d872615d16bfd69f540c1f8f70890de9c81ff
**webpack.config.js**

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  'postcss-present-env',
                  {
                    // Options
                  },
                ],
              },
            },
          },
        ],
      },
    ],
  },
};
```

<<<<<<< HEAD
### `Config` {#config}

Type: `Boolean|String|Object`
Default: `undefined`

Options specified in the config file are combined with options passed to the loader.
Loader options overwrite options from config.

#### Boolean {#boolean}

Enables/Disables autoloading config.
=======
Alternative use with [config files](#config):
>>>>>>> 365d872615d16bfd69f540c1f8f70890de9c81ff

**postcss.config.js**

```js
module.exports = {
  plugins: [
    [
      'postcss-preset-env',
      {
        // Options
      },
    ],
  ],
};
```

<<<<<<< HEAD
#### String {#string}

Allows to specify the absolute path to the config file.
=======
The loader **automatically** searches for configuration files.
>>>>>>> 365d872615d16bfd69f540c1f8f70890de9c81ff

**webpack.config.js**

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      },
    ],
  },
};
```

<<<<<<< HEAD
#### Object {#object}

|           Name            |    Type    |   Default   | Description              |
| :-----------------------: | :--------: | :---------: | :----------------------- |
|      [`path`](#path)      | `{String}` | `undefined` | PostCSS Config Directory |
| [`context`](#context-ctx) | `{Object}` | `undefined` | PostCSS Config Context   |

##### `Path` {#path}
=======
And run `webpack` via your preferred method.

## Options
>>>>>>> 365d872615d16bfd69f540c1f8f70890de9c81ff

|                Name                 |         Type         |                Default                | Description                                  |
| :---------------------------------: | :------------------: | :-----------------------------------: | :------------------------------------------- |
|        [`execute`](#execute)        |     `{Boolean}`      |              `undefined`              | Enable PostCSS Parser support in `CSS-in-JS` |
| [`postcssOptions`](#postcssoptions) | `{Object\/Function}` | `defaults values for Postcss.process` | Set `PostCSS` options and plugins            |
|      [`sourceMap`](#sourcemap)      |     `{Boolean}`      |          `compiler.devtool`           | Enables/Disables generation of source maps   |

### `execute`

Type: `Boolean`
Default: `undefined`

If you use JS styles the [`postcss-js`](https://github.com/postcss/postcss-js) parser, add the `execute` option.

**webpack.config.js**

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.style.js$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                parser: 'postcss-js',
              },
              execute: true,
            },
          },
        ],
      },
    ],
  },
};
```

<<<<<<< HEAD
[supported config formats]: https://github.com/michael-ciniawsky/postcss-load-config#usage

##### `Context (ctx)` {#context-ctx}
=======
### `postcssOptions`
>>>>>>> 365d872615d16bfd69f540c1f8f70890de9c81ff

Type: `Object|Function`
Default: `undefined`

Allows to set [`PostCSS options`](http://api.postcss.org/global.html#processoptions) and plugins.

All `PostCSS` options are supported.
There is the special `config` option for config files. How it works and how it can be configured is described below.

We recommend do not specify `from`, `to` and `map` options, because this can lead to wrong path in source maps.
If you need source maps please use the [`sourcemap`](#sourcemap) option.

#### `Object`

Setup `plugins`:

**webpack.config.js** (**recommended**)

```js
const myOtherPostcssPlugin = require('postcss-my-plugin');

module.exports = {
  module: {
    rules: [
      {
        test: /\.sss$/i,
        loader: 'postcss-loader',
        options: {
          postcssOptions: {
            plugins: [
              'postcss-import',
              ['postcss-short', { prefix: 'x' }],
              require.resolve('my-postcss-plugin'),
              myOtherPostcssPlugin({ myOption: true }),
              // Deprecated and will be removed in the next major release
              { 'postcss-nested': { preserveEmpty: true } },
            ],
          },
        },
      },
    ],
  },
};
```

<<<<<<< HEAD
### `postcssOptions` {#postcss-options}

|             Name              |                     Type                      |   Default   | Description                    |
| :---------------------------: | :-------------------------------------------: | :---------: | :----------------------------- |
|     [`plugins`](#plugins)     | `{Function\|Object\|Array<Function\|Object>}` |    `[]`     | Set PostCSS Plugins            |
|      [`parser`](#parser)      |         `{String\|Object\|Function}`          | `undefined` | Set custom PostCSS Parser      |
|      [`syntax`](#syntax)      |              `{String\|Object}`               | `undefined` | Set custom PostCSS Syntax      |
| [`stringifier`](#stringifier) |         `{String\|Object\|Function}`          | `undefined` | Set custom PostCSS Stringifier |

#### `Plugins` {#plugins}

Type: `Function|Object|Array<String|Function\|Object|Array>`
Default: `[]`

It is recommended to specify plugins in the format `Array<String\|Array>` or `Function` that returns the same array as shown below.
`Object` format (`{pluginName: pluginOptions}`) is deprecated and will be removed in the next major release.

**`webpack.config.js`**
=======
**webpack.config.js** (**deprecated**, will be removed in the next major release)
>>>>>>> 365d872615d16bfd69f540c1f8f70890de9c81ff

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.sss$/i,
        loader: 'postcss-loader',
        options: {
          postcssOptions: {
            plugins: {
              'postcss-import': {},
              'postcss-short': { prefix: 'x' },
            },
          },
        },
      },
    ],
  },
};
```

Setup `syntax`:

**webpack.config.js**

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.sss$/i,
        loader: 'postcss-loader',
        options: {
          postcssOptions: {
            // Can be `String`
            syntax: 'sugarss',
            // Can be `Object`
            syntax: require('sugarss'),
          },
        },
      },
    ],
  },
};
```

Setup `parser`:

**webpack.config.js**

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.sss$/i,
        loader: 'postcss-loader',
        options: {
          postcssOptions: {
            // Can be `String`
            parser: 'sugarss',
            // Can be `Object`
            parser: require('sugarss'),
            // Can be `Function`
            parser: require('sugarss').parse,
          },
        },
      },
    ],
  },
};
```

Setup `stringifier`:

**webpack.config.js**

```js
const Midas = require('midas');
const midas = new Midas();

module.exports = {
  module: {
    rules: [
      {
        test: /\.sss$/i,
        loader: 'postcss-loader',
        options: {
          postcssOptions: {
            // Can be `String`
            stringifier: 'sugarss',
            // Can be `Object`
            stringifier: require('sugarss'),
            // Can be `Function`
            stringifier: midas.stringifier,
          },
        },
      },
    ],
  },
};
```

#### `Function`

**webpack.config.js**

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.(css|sss)$/i,
        loader: 'postcss-loader',
        options: {
          postcssOptions: (loaderContext) => {
            if (/\.sss$/.test(loaderContext.resourcePath)) {
              return {
                parser: 'sugarss',
                plugins: [
                  ['postcss-short', { prefix: 'x' }],
                  'postcss-present-env',
                ],
              };
            }

            return {
              plugins: [
                ['postcss-short', { prefix: 'x' }],
                'postcss-present-env',
              ],
            };
          },
        },
      },
    ],
  },
};
```

<<<<<<< HEAD
#### `Parser` {#parser}
=======
#### `config`
>>>>>>> 365d872615d16bfd69f540c1f8f70890de9c81ff

Type: `Boolean|String`
Default: `undefined`

<<<<<<< HEAD
##### `String` {#string}
=======
Allows to set options using config files.
Options specified in the config file are combined with options passed to the loader, the loader options overwrite options from config.

##### Config Files

The loader will search up the directory tree for configuration in the following places:

- a `postcss` property in `package.json`
- a `.postcssrc` file in JSON or YAML format
- a `.postcss.json`, `.postcss.yaml`, `.postcss.yml`, `.postcss.js`, or `.postcss.cjs` file
- a `postcss.config.js` or `postcss.config.cjs` CommonJS module exporting an object (**recommended**)

##### Examples of Config Files
>>>>>>> 365d872615d16bfd69f540c1f8f70890de9c81ff

Using `Object` notation:

**postcss.config.js** (**recommend**)

```js
module.exports = {
  // You can specify any options from http://api.postcss.org/global.html#processOptions here
  // parser: 'sugarss',
  plugins: [
    // Plugins for PostCSS
    ['postcss-short', { prefix: 'x' }],
    'postcss-present-env',
  ],
};
```

<<<<<<< HEAD
##### `Object` {#object}
=======
Using `Function` notation:
>>>>>>> 365d872615d16bfd69f540c1f8f70890de9c81ff

**postcss.config.js** (**recommend**)

```js
module.exports = (api) => {
  // `api.file` - path to the file
  // `api.mode` - `mode` value of webpack, please read https://webpack.js.org/configuration/mode/
  // `api.webpackLoaderContext` - loader context for complex use cases

  if (/\.sss$/.test(api.file)) {
    return {
      // You can specify any options from http://api.postcss.org/global.html#processOptions here
      parser: 'sugarss',
      plugins: [
        // Plugins for PostCSS
        ['postcss-short', { prefix: 'x' }],
        'postcss-present-env',
      ],
    };
  }

  return {
    // You can specify any options from http://api.postcss.org/global.html#processOptions here
    plugins: [
      // Plugins for PostCSS
      ['postcss-short', { prefix: 'x' }],
      'postcss-present-env',
    ],
  };
};
```

<<<<<<< HEAD
##### `Function` {#function}

**`webpack.config.js`**
=======
**postcss.config.js** (**deprecated**, will be removed in the next major release)
>>>>>>> 365d872615d16bfd69f540c1f8f70890de9c81ff

```js
module.exports = {
  // You can specify any options from http://api.postcss.org/global.html#processOptions here
  // parser: 'sugarss',
  plugins: {
    // Plugins for PostCSS
    'postcss-short': { prefix: 'x' },
    'postcss-present-env': {},
  },
};
```

<<<<<<< HEAD
#### `Syntax` {#syntax}
=======
##### Config Cascade
>>>>>>> 365d872615d16bfd69f540c1f8f70890de9c81ff

You can use different `postcss.config.js` files in different directories.
Config lookup starts from `path.dirname(file)` and walks the file tree upwards until a config file is found.

<<<<<<< HEAD
##### `String` {#string}
=======
```
|– components
| |– component
| | |– index.js
| | |– index.png
| | |– style.css (1)
| | |– postcss.config.js (1)
| |– component
| | |– index.js
| | |– image.png
| | |– style.css (2)
|
|– postcss.config.js (1 && 2 (recommended))
|– webpack.config.js
|
|– package.json
```
>>>>>>> 365d872615d16bfd69f540c1f8f70890de9c81ff

After setting up your `postcss.config.js`, add `postcss-loader` to your `webpack.config.js`.
You can use it standalone or in conjunction with `css-loader` (recommended).

Use it **before** `css-loader` and `style-loader`, but **after** other preprocessor loaders like e.g `sass|less|stylus-loader`, if you use any (since [webpack loaders evaluate right to left/bottom to top](/concepts/loaders/#configuration)).

**webpack.config.js** (**recommended**)

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
            },
          },
          'postcss-loader',
        ],
      },
    ],
  },
};
```

<<<<<<< HEAD
##### `Object` {#object}
=======
#### Boolean

Enables/Disables autoloading config.
>>>>>>> 365d872615d16bfd69f540c1f8f70890de9c81ff

**webpack.config.js**

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/i,
        loader: 'postcss-loader',
        options: {
          postcssOptions: {
            config: false,
          },
        },
      },
    ],
  },
};
```

<<<<<<< HEAD
#### `Stringifier` {#stringifier}

Type: `String|Object|Function`
Default: `undefined`

##### `String` {#string}
=======
#### String
>>>>>>> 365d872615d16bfd69f540c1f8f70890de9c81ff

Allows to specify the path to the config file.

**webpack.config.js**

```js
const path = require('path');

module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/i,
        loader: 'postcss-loader',
        options: {
          postcssOptions: {
            config: path.resolve(__dirname, 'custom.config.js'),
          },
        },
      },
    ],
  },
};
```

<<<<<<< HEAD
##### `Object` {#object}
=======
### `sourceMap`

Type: `Boolean`
Default: depends on the `compiler.devtool` value

By default generation of source maps depends on the [`devtool`](/configuration/devtool/) option.
All values enable source map generation except `eval` and `false` value.
>>>>>>> 365d872615d16bfd69f540c1f8f70890de9c81ff

**webpack.config.js**

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader', options: { sourceMap: true } },
          { loader: 'postcss-loader', options: { sourceMap: true } },
          { loader: 'sass-loader', options: { sourceMap: true } },
        ],
      },
    ],
  },
};
```

<<<<<<< HEAD
##### `Function` {#function}
=======
Alternative setup:
>>>>>>> 365d872615d16bfd69f540c1f8f70890de9c81ff

**webpack.config.js**

```js
module.exports = {
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
          { loader: 'postcss-loader' },
          { loader: 'sass-loader' },
        ],
      },
    ],
  },
};
```

<<<<<<< HEAD
### `SourceMap` {#sourcemap}
=======
## Examples
>>>>>>> 365d872615d16bfd69f540c1f8f70890de9c81ff

### SugarSS

You'll need to install `sugarss`:

```console
npm install --save-dev sugarss
```

Using [`SugarSS`](https://github.com/postcss/sugarss) syntax.

**webpack.config.js**

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.sss$/i,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: { importLoaders: 1 },
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                parser: 'sugarss',
              },
            },
          },
        ],
      },
    ],
  },
};
```

<<<<<<< HEAD
## Examples {#examples}

### `Stylelint` {#stylelint}
=======
### Autoprefixer

You'll need to install `autoprefixer`:

```console
npm install --save-dev autoprefixer
```

Add vendor prefixes to CSS rules using [`autoprefixer`](https://github.com/postcss/autoprefixer).
>>>>>>> 365d872615d16bfd69f540c1f8f70890de9c81ff

**webpack.config.js**

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: { importLoaders: 1 },
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  [
                    'autoprefixer',
                    {
                      // Options
                    },
                  ],
                ],
              },
            },
          },
        ],
      },
    ],
  },
};
```

<<<<<<< HEAD
### `Autoprefixing` {#autoprefixing}
=======
> :warning: [`postcss-preset-env`](https://github.com/csstools/postcss-preset-env) includes [`autoprefixer`](https://github.com/postcss/autoprefixer), so adding it separately is not necessary if you already use the preset. More [information](https://github.com/csstools/postcss-preset-env#autoprefixer)

### PostCSS Preset Env

You'll need to install `postcss-preset-env`:

```console
npm install --save-dev postcss-preset-env
```
>>>>>>> 365d872615d16bfd69f540c1f8f70890de9c81ff

**webpack.config.js**

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: { importLoaders: 1 },
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  [
                    'postcss-preset-env',
                    {
                      // Options
                    },
                  ],
                ],
              },
            },
          },
        ],
      },
    ],
  },
};
```

### CSS Modules

<<<<<<< HEAD
### `CSS Modules` {#css-modules}
=======
What is `CSS Modules`? Please [read](https://github.com/webpack-contrib/css-loader#modules).
>>>>>>> 365d872615d16bfd69f540c1f8f70890de9c81ff

No additional options required on the `postcss-loader` side.
To make them work properly, either add the `css-loader`’s `importLoaders` option.

**webpack.config.js**

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
              importLoaders: 1,
            },
          },
          'postcss-loader',
        ],
      },
    ],
  },
};
```

### CSS-in-JS and [`postcss-js`](https://github.com/postcss/postcss-js)

You'll need to install `postcss-js`:

<<<<<<< HEAD
### `CSS-in-JS` {#css-in-js}

If you want to process styles written in JavaScript, use the [postcss-js] parser.
=======
```console
npm install --save-dev postcss-js
```
>>>>>>> 365d872615d16bfd69f540c1f8f70890de9c81ff

If you want to process styles written in JavaScript, use the [`postcss-js`](https://github.com/postcss/postcss-js) parser.

**webpack.config.js**

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.style.js$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                parser: 'postcss-js',
              },
              execute: true,
            },
          },
          'babel-loader',
        ],
      },
    ],
  },
};
```

As result you will be able to write styles in the following way

```js
import colors from './styles/colors';

export default {
  '.menu': {
    color: colors.main,
    height: 25,
    '&_link': {
      color: 'white',
    },
  },
};
```

> :warning: If you are using Babel you need to do the following in order for the setup to work

> 1. Add [`babel-plugin-add-module-exports`](https://github.com/59naga/babel-plugin-add-module-exports) to your configuration.
> 2. You need to have only one **default** export per style module.

<<<<<<< HEAD
### [Extract CSS][extractplugin] {#extract-cssextractplugin}
=======
### Extract CSS
>>>>>>> 365d872615d16bfd69f540c1f8f70890de9c81ff

Using [`mini-css-extract-plugin`](/plugins/mini-css-extract-plugin/).

**webpack.config.js**

```js
const isProductionMode = process.env.NODE_ENV === 'production';

const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  mode: isProductionMode ? 'production' : 'development',
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          isProductionMode ? MiniCssExtractPlugin.loader : 'style-loader',
          'css-loader',
          'postcss-loader',
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: isProductionMode ? '[name].[contenthash].css' : '[name].css',
    }),
  ],
};
```

<<<<<<< HEAD
### `Emit assets` {#emit-assets}
=======
### Emit assets

To write a asset from PostCSS plugin to the webpack, need to add a message in `result.messages`.
>>>>>>> 365d872615d16bfd69f540c1f8f70890de9c81ff

The message should contain the following fields:

- `type` = `asset` - Message type (require, should be equal `asset`)
- `file` - file name (require)
- `content` - file content (require)
- `sourceMap` - sourceMap
- `info` - asset info

**webpack.config.js**

```js
const customPlugin = () => (css, result) => {
  result.messages.push({
    type: 'asset',
    file: 'sprite.svg',
    content: '<svg>...</svg>',
  });
};

const postcssPlugin = postcss.plugin('postcss-assets', customPlugin);

module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [postcssPlugin()],
              },
            },
          },
        ],
      },
    ],
  },
};
```

<<<<<<< HEAD
### `Add dependencies` {#add-dependencies}
=======
### Add dependencies

The dependencies are necessary for webpack to understand when it needs to run recompilation on the changed files.
>>>>>>> 365d872615d16bfd69f540c1f8f70890de9c81ff

There are two way to add dependencies:

1. (Recommended). The plugin may emit messages in `result.messages`.

The message should contain the following fields:

- `type` = `dependency` - Message type (require, should be equal `dependency`)
- `file` - absolute file path (require)

**webpack.config.js**

```js
const path = require('path');

const customPlugin = () => (css, result) => {
  result.messages.push({
    type: 'dependency',
    file: path.resolve(__dirname, 'path', 'to', 'file'),
  });
};

const postcssPlugin = postcss.plugin('postcss-assets', customPlugin);

module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [postcssPlugin()],
              },
            },
          },
        ],
      },
    ],
  },
};
```

2. Pass `loaderContext` in plugin.

**webpack.config.js**

```js
const path = require('path');

module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                config: path.resolve(__dirname, 'path/to/postcss.config.js'),
              },
            },
          },
        ],
      },
    ],
  },
};
```

**postcss.config.js**

```js
module.exports = (api) => ({
  plugins: [
    require('path/to/customPlugin')({
      loaderContext: api.webpackLoaderContext,
    }),
  ],
});
```

**customPlugin.js**

```js
const path = require('path');

const customPlugin = (loaderContext) => (css, result) => {
  loaderContext.webpack.addDependency(
    path.resolve(__dirname, 'path', 'to', 'file')
  );
};

module.exports = postcss.plugin('postcss-assets', customPlugin);
```

<<<<<<< HEAD
## Maintainers {#maintainers}

<table>
  <tbody>
    <tr>
      <td align="center">
        <a href="https://github.com/michael-ciniawsky">
          <img width="150" height="150" src="https://github.com/michael-ciniawsky.png?v=3&s=150">
          </br>
          Michael Ciniawsky
        </a>
      </td>
      <td align="center">
        <a href="https://github.com/evilebottnawi">
          <img width="150" height="150" src="https://github.com/evilebottnawi.png?v=3&s=150">
          </br>
          Alexander Krasnoyarov
        </a>
      </td>
    </tr>
  <tbody>
</table>
=======
## Contributing

Please take a moment to read our contributing guidelines if you haven't yet done so.

[CONTRIBUTING](https://github.com/webpack-contrib/postcss-loader/blob/master/.github/CONTRIBUTING.md)

## License

[MIT](https://github.com/webpack-contrib/postcss-loader/blob/master/LICENSE)
>>>>>>> 365d872615d16bfd69f540c1f8f70890de9c81ff

[npm]: https://img.shields.io/npm/v/postcss-loader.svg
[npm-url]: https://npmjs.com/package/postcss-loader
[node]: https://img.shields.io/node/v/postcss-loader.svg
[node-url]: https://nodejs.org/
[deps]: https://david-dm.org/webpack-contrib/postcss-loader.svg
[deps-url]: https://david-dm.org/webpack-contrib/postcss-loader
[tests]: https://github.com/webpack-contrib/postcss-loader/workflows/postcss-loader/badge.svg
[tests-url]: https://github.com/webpack-contrib/postcss-loader/actions
[cover]: https://codecov.io/gh/webpack-contrib/postcss-loader/branch/master/graph/badge.svg
[cover-url]: https://codecov.io/gh/webpack-contrib/postcss-loader
[chat]: https://badges.gitter.im/webpack/webpack.svg
[chat-url]: https://gitter.im/webpack/webpack
[chat-postcss]: https://badges.gitter.im/postcss/postcss.svg
[chat-postcss-url]: https://gitter.im/postcss/postcss
[size]: https://packagephobia.now.sh/badge?p=postcss-loader
[size-url]: https://packagephobia.now.sh/result?p=postcss-loader
