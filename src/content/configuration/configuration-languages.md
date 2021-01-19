---
title: Configuration Languages
sort: 2
contributors:
  - sokra
  - skipjack
  - tarang9211
  - simon04
  - peterblazejewicz
  - youta1119
  - byzyk
  - Nek-
  - liyiming22
---

webpack accepts configuration files written in multiple programming and data languages. The list of supported file extensions can be found at the [node-interpret](https://github.com/gulpjs/interpret) package. Using [node-interpret](https://github.com/gulpjs/interpret), webpack can handle many different types of configuration files.


## TypeScript

To write the webpack configuration in [TypeScript](http://www.typescriptlang.org/), you would first install the necessary dependencies, i.e., TypeScript and the relevant type definitions from the [DefinitelyTyped](https://definitelytyped.org/) project:

``` bash
npm install --save-dev typescript ts-node @types/node @types/webpack
# and, if using webpack-dev-server
npm install --save-dev @types/webpack-dev-server
```

and then proceed to write your configuration:

__webpack.config.ts__

```typescript
import * as path from 'path';
import * as webpack from 'webpack';

const config: webpack.Configuration = {
  mode: 'production',
  entry: './foo.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'foo.bundle.js'
  }
};

export default config;
```

Above sample assumes version >= 2.7 or newer of TypeScript is used with the new `esModuleInterop` and `allowSyntheticDefaultImports` compiler options in your `tsconfig.json` file.

Note that you'll also need to check your `tsconfig.json` file. If the `module` in `compilerOptions` in `tsconfig.json` is `commonjs`, the setting is complete, else webpack will fail with an error. This occurs because `ts-node` does not support any module syntax other than `commonjs`.

There are two solutions to this issue:

- Modify `tsconfig.json`.
- Install `tsconfig-paths`.

The __first option__ is to open your `tsconfig.json` file and look for `compilerOptions`. Set `target` to `"ES5"` and `module` to `"CommonJS"` (or completely remove the `module` option).

The __second option__ is to install the `tsconfig-paths` package:

``` bash
npm install --save-dev tsconfig-paths
```

And create a separate TypeScript configuration specifically for your webpack configs:

__tsconfig-for-webpack-config.json__

``` json
{
  "compilerOptions": {
    "module": "commonjs",
    "target": "es5",
    "esModuleInterop": true
  }
}
```

T> `ts-node` can resolve a `tsconfig.json` file using the environment variable provided by `tsconfig-paths`.

Then set the environment variable `process.env.TS_NODE_PROJECT` provided by `tsconfig-paths` like so:

__package.json__

```json
{
  "scripts": {
    "build": "cross-env TS_NODE_PROJECT=\"tsconfig-for-webpack-config.json\" webpack"
  }
}
```

W> We had been getting reports that `TS_NODE_PROJECT` might not work with `"TS_NODE_PROJECT" unrecognized command` error. Therefore running it with `cross-env` seems to fix the issue, for more info [see this issue](https://github.com/webpack/webpack.js.org/issues/2733).


## CoffeeScript

Similarly, to use [CoffeeScript](https://coffeescript.org/), you would first install the necessary dependencies:

``` bash
npm install --save-dev coffeescript
```

and then proceed to write your configuration:

__webpack.config.coffee__

<!-- eslint-skip -->

```js
HtmlWebpackPlugin = require('html-webpack-plugin')
webpack = require('webpack')
path = require('path')

config =
  mode: 'production'
  entry: './path/to/my/entry/file.js'
  output:
    path: path.resolve(__dirname, 'dist')
    filename: 'my-first-webpack.bundle.js'
  module: rules: [ {
    test: /\.(js|jsx)$/
    use: 'babel-loader'
  } ]
  plugins: [
    new HtmlWebpackPlugin(template: './src/index.html')
  ]

module.exports = config
```


## Babel and JSX

In the example below JSX (React JavaScript Markup) and Babel are used to create a JSON Configuration that webpack can understand.

> Courtesy of [Jason Miller](https://twitter.com/_developit)

First install the necessary dependencies:

``` bash
npm install --save-dev babel-register jsxobj babel-preset-es2015
```

__.babelrc__

``` json
{
  "presets": [ "es2015" ]
}
```

__webpack.config.babel.js__

``` js
import jsxobj from 'jsxobj';

// example of an imported plugin
const CustomPlugin = config => ({
  ...config,
  name: 'custom-plugin'
});

export default (
  <webpack target="web" watch mode="production">
    <entry path="src/index.js" />
    <resolve>
      <alias {...{
        react: 'preact-compat',
        'react-dom': 'preact-compat'
      }} />
    </resolve>
    <plugins>
      <CustomPlugin foo="bar" />
    </plugins>
  </webpack>
);
```

W> If you are using Babel elsewhere and have `modules` set to `false`, you will have to either maintain two separate `.babelrc` files or use `const jsxobj = require('jsxobj');` and `module.exports` instead of the new `import` and `export` syntax. This is because while Node does support many new ES6 features, they don't yet support ES6 module syntax.
