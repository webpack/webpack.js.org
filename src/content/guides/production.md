---
title: Production
sort: 17
contributors:
  - henriquea
  - rajagopal4890
  - makuzaverite
  - markerikson
  - simon04
  - kisnows
  - chrisVillanueva
  - swapnilmishra
  - bring2dip
  - redian
  - skipjack
  - xgqfrms
  - kelset
  - xgirma
  - mehrdaad
  - SevenOutman
  - AnayaDesign
  - wizardofhogwarts
  - aholzner
  - EugeneHlushko
  - snitin315
---

In this guide, we'll dive into some of the best practices and utilities for building a production site or application.

T> This walkthrough stems from [Tree Shaking](/guides/tree-shaking) and [Development](/guides/development). Please ensure you are familiar with the concepts/setup introduced in those guides before continuing on.

## Setup

The goals of _development_ and _production_ builds differ greatly. In _development_, we want strong source mapping and a localhost server with live reloading or hot module replacement. In _production_, our goals shift to a focus on minified bundles, lighter weight source maps, and optimized assets to improve load time. With this logical separation at hand, we typically recommend writing **separate webpack configurations** for each environment.

While we will separate the _production_ and _development_ specific bits out, note that we'll still maintain a "common" configuration to keep things DRY. In order to merge these configurations together, we'll use a utility called [`webpack-merge`](https://github.com/survivejs/webpack-merge). With the "common" configuration in place, we won't have to duplicate code within the environment-specific configurations.

Let's start by installing `webpack-merge` and splitting out the bits we've already worked on in previous guides:

```bash
npm install --save-dev webpack-merge
```

**project**

```diff
  webpack-demo
  |- package.json
- |- webpack.config.js
+ |- webpack.common.js
+ |- webpack.dev.js
+ |- webpack.prod.js
  |- /dist
  |- /src
    |- index.js
    |- math.js
  |- /node_modules
```

**webpack.common.js**

```diff
+ const path = require('path');
+ const { CleanWebpackPlugin } = require('clean-webpack-plugin');
+ const HtmlWebpackPlugin = require('html-webpack-plugin');
+
+ module.exports = {
+   entry: {
+     app: './src/index.js',
+   },
+   plugins: [
+     // new CleanWebpackPlugin(['dist/*']) for < v2 versions of CleanWebpackPlugin
+     new CleanWebpackPlugin(),
+     new HtmlWebpackPlugin({
+       title: 'Production',
+     }),
+   ],
+   output: {
+     filename: '[name].bundle.js',
+     path: path.resolve(__dirname, 'dist'),
+   },
+ };
```

**webpack.dev.js**

```diff
+ const { merge } = require('webpack-merge');
+ const common = require('./webpack.common.js');
+
+ module.exports = merge(common, {
+   mode: 'development',
+   devtool: 'inline-source-map',
+   devServer: {
+     contentBase: './dist',
+   },
+ });
```

**webpack.prod.js**

```diff
+ const { merge } = require('webpack-merge');
+ const common = require('./webpack.common.js');
+
+ module.exports = merge(common, {
+   mode: 'production',
+ });
```

In `webpack.common.js`, we now have setup our `entry` and `output` configuration and we've included any plugins that are required for both environments. In `webpack.dev.js`, we've set `mode` to `development`. Also, we've added the recommended `devtool` for that environment (strong source mapping), as well as our simple `devServer` configuration. Finally, in `webpack.prod.js`,`mode` is set to `production` which loads [`TerserPlugin`](/plugins/terser-webpack-plugin/), which was first introduced by the [tree shaking](/guides/tree-shaking/) guide.

Note the use of `merge()` calls in the environment-specific configurations to include our common configuration in `webpack.dev.js` and `webpack.prod.js`. The `webpack-merge` tool offers a variety of advanced features for merging but for our use case we won't need any of that.

## NPM Scripts

Now, let's modify our npm scripts to use the new configuration files. For the `start` script, which runs `webpack-dev-server`, we will use `webpack.dev.js`, and for the `build` script, which runs `webpack` to create a production build, we will use `webpack.prod.js`:

**package.json**

```diff
  {
    "name": "development",
    "version": "1.0.0",
    "description": "",
    "main": "src/index.js",
    "scripts": {
-     "start": "webpack serve --open",
+     "start": "webpack serve --open --config webpack.dev.js",
-     "build": "webpack"
+     "build": "webpack --config webpack.prod.js"
    },
    "keywords": [],
    "author": "",
    "license": "ISC",
    "devDependencies": {
      "clean-webpack-plugin": "^0.1.17",
      "css-loader": "^0.28.4",
      "csv-loader": "^2.1.1",
      "express": "^4.15.3",
      "file-loader": "^0.11.2",
      "html-webpack-plugin": "^2.29.0",
      "style-loader": "^0.18.2",
      "webpack": "^4.30.0",
      "webpack-dev-middleware": "^1.12.0",
      "webpack-dev-server": "^2.9.1",
      "webpack-merge": "^4.1.0",
      "xml-loader": "^1.2.1"
    }
  }
```

Feel free to run those scripts and see how the output changes as we continue adding to our _production_ configuration.

## Specify the Mode

Many libraries will key off the `process.env.NODE_ENV` variable to determine what should be included in the library. For example, when `process.env.NODE_ENV` is not set to `'production'` some libraries may add additional logging and testing to make debugging easier. However, with `process.env.NODE_ENV` set to `'production'` they might drop or add significant portions of code to optimize how things run for your actual users. Since webpack v4, specifying [`mode`](/configuration/mode/) automatically configures [`DefinePlugin`](/plugins/define-plugin) for you:

**webpack.prod.js**

```diff
  const { merge } = require('webpack-merge');
  const common = require('./webpack.common.js');

  module.exports = merge(common, {
    mode: 'production',
  });
```

T> Technically, `NODE_ENV` is a system environment variable that Node.js exposes into running scripts. It is used by convention to determine dev-vs-prod behavior by server tools, build scripts, and client-side libraries. Contrary to expectations, `process.env.NODE_ENV` is not set to `'production'` **within** the build script `webpack.config.js`, see [#2537](https://github.com/webpack/webpack/issues/2537). Thus, conditionals like `process.env.NODE_ENV === 'production' ? '[name].[contenthash].bundle.js' : '[name].bundle.js'` within webpack configurations do not work as expected.

If you're using a library like [`react`](https://reactjs.org/), you should actually see a significant drop in bundle size after adding `DefinePlugin`. Also, note that any of our local `/src` code can key off of this as well, so the following check would be valid:

**src/index.js**

```diff
  import { cube } from './math.js';
+
+ if (process.env.NODE_ENV !== 'production') {
+   console.log('Looks like we are in development mode!');
+ }

  function component() {
    const element = document.createElement('pre');

    element.innerHTML = [
      'Hello webpack!',
      '5 cubed is equal to ' + cube(5)
    ].join('\n\n');

    return element;
  }

  document.body.appendChild(component());
```

## Minification

webpack v4+ will minify your code by default in [`production mode`](/configuration/mode/#mode-production).

Note that while the [`TerserPlugin`](/plugins/terser-webpack-plugin/) is a great place to start for minification and being used by default, there are other options out there:

- [`ClosureWebpackPlugin`](https://github.com/webpack-contrib/closure-webpack-plugin)

If you decide to try another minification plugin, just make sure your new choice also drops dead code as described in the [tree shaking](/guides/tree-shaking) guide and provide it as the [`optimization.minimizer`](/configuration/optimization/#optimizationminimizer).

## Source Mapping

We encourage you to have source maps enabled in production, as they are useful for debugging as well as running benchmark tests. That said, you should choose one with a fairly quick build speed that's recommended for production use (see [`devtool`](/configuration/devtool)). For this guide, we'll use the `source-map` option in the _production_ as opposed to the `inline-source-map` we used in the _development_:

**webpack.prod.js**

```diff
  const { merge } = require('webpack-merge');
  const common = require('./webpack.common.js');

  module.exports = merge(common, {
    mode: 'production',
+   devtool: 'source-map',
  });
```

T> Avoid `inline-***` and `eval-***` use in production as they can increase bundle size and reduce the overall performance.

## Minimize CSS

It is crucial to minimize your CSS for production. Please see the [Minimizing for Production](/plugins/mini-css-extract-plugin/#minimizing-for-production) section.

## CLI Alternatives

Many of the options described above can be set as command line arguments. For example, [`optimization.minimize`](/configuration/optimization/#optimizationminimize) can be set with `--optimization-minimize`, and [`mode`](/configuration/mode/) can be set with `--mode`. Run `npx webpack --help=verbose` for a full list of CLI arguments.

While these shorthand methods are useful, we recommend setting these options in a webpack configuration file for more configurability.
