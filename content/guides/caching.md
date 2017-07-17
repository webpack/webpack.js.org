---
title: Caching
sort: 11
contributors:
  - okonet
  - jouni-kantola
  - skipjack
related:
  - title: Predictable Long Term Caching
    url: https://medium.com/webpack/predictable-long-term-caching-with-webpack-d3eee1d3fa31
  - title: Long Term Caching of Static Assets
    url: https://medium.com/@okonetchnikov/long-term-caching-of-static-assets-with-webpack-1ecb139adb95#.vtwnssps4
  - title: Webpack & Caching
    url: https://gist.github.com/sokra/ff1b0290282bfa2c037bdb6dcca1a7aa
  - title: Advanced Webpack Presentation
    url: https://presentations.survivejs.com/advanced-webpack/
  - title: Issue 1315
    url: https://github.com/webpack/webpack/issues/1315
  - title: Issue 652
    url: https://github.com/webpack/webpack.js.org/issues/652
---

T> This examples in this guide stem from [getting started](/guides/getting-started), [output management](/guides/output-management) and [code splitting](/guides/code-splitting).

So we're using webpack to bundle our modular application, deploying our `/dist` directory to the server, and clients, typically browsers, are hitting that server to grab the site and its assets. The last step can be time consuming, which is why browsers use a technique called [caching](). This allows sites to load faster with less unnecessary network traffic, however it can also cause headaches when you need new code to be picked up.

This guide focuses on the configuration changes needed to ensure that your `output` files are cached when appropriate, but re-requested when changed.


## Output Filenames

A simple way to ensure the browser picks up changed files is by using `output.filename` [substitutions](/configuration/output#output-filename). The `[hash]` substitution can be used to include a build-specific hash in the filename, however it's even better to use the `[chunkhash]` subsitution which include a bundle-specific hash in the filename.

Let's get our project set up using the example from [getting started](/guides/getting-started) with the `plugins` from [output management](/guides/output-management), so we don't have to deal with maintaining our `index.html` file manually:

__project__

``` diff
webpack-demo
|- package.json
|- webpack.config.js
|- /dist
|- /src
  |- index.js
|- /node_modules
```

__webpack.config.js__

``` diff
  var path = require('path');

  module.exports = {
    entry: './src/index.js',
    plugins: [
      new CleanWebpackPlugin(['dist']),
      new HtmlWebpackPlugin({
-       title: 'Output Management'
+       title: 'Caching'
      })
    ],
    output: {
-     filename: 'bundle.js',
+     filename: '[name].[chunkhash].js',
      path: path.resolve(__dirname, 'dist')
    }
  };
```

Running our build script, `npm run build`, with this configuration should produce the following output:

?> Add bash output

Now our bundle's name should change to reflect its content, meaning if `src/index.js` is changed, the filename should change. However, if we run another build, we'll see that this is not the case:

?> Add bash output

This is because webpack includes certain boilerplate, specifically the runtime and manifest, in the entry chunk.


## Extracting Boilerplate

As we learned in [code splitting](/guides/code-splitting), the [`CommonsChunkPlugin`](/plugins/commons-chunk-plugin) can be used to split modules out into separate bundles. A lesser-known feature of the `CommonsChunkPlugin` is extracting webpack's boilerplate and manifest which can change with every build. By specifying a name not mentioned in the `entry` configuration, the plugin will automatically extract what we want into a separate bundle:

__webpack.config.js__

``` diff
  var path = require('path');

  module.exports = {
    entry: './src/index.js',
    plugins: [
      new CleanWebpackPlugin(['dist']),
      new HtmlWebpackPlugin({
        title: 'Caching'
-     })
+     }),
+     new webpack.optimize.CommonsChunkPlugin({
+       name: 'runtime'
+     })
    ],
    output: {
      filename: '[name].[contenthash].js',
      path: path.resolve(__dirname, 'dist')
    }
  };
```

Now let's run a build to see if it worked:

``` bash
Hash: 80552632979856ddab34
Version: webpack 3.3.0
Time: 1512ms
                          Asset       Size  Chunks                    Chunk Names
   main.5ec8e954e32d66dee1aa.js     542 kB       0  [emitted]  [big]  main
runtime.719796322be98041fff2.js    5.82 kB       1  [emitted]         runtime
                     index.html  275 bytes          [emitted]
   [0] ./src/index.js 336 bytes {0} [built]
   [2] (webpack)/buildin/global.js 509 bytes {0} [built]
   [3] (webpack)/buildin/module.js 517 bytes {0} [built]
    + 1 hidden module
```

Another thing we may want to extract is our core third-party libraries, in our case `lodash`, as they are less likely to change than our source code. This step will allow clients to request even less from the server to stay up to date. Let's do this using a combination of a new `entry` point along with another `CommonsChunkPlugin` instance:

__webpack.config.js__

``` diff
  var path = require('path');

  module.exports = {
-   entry: './src/index.js',
+   entry: {
+     main: './src/index.js',
+     vendor: [
+       'lodash'
+     ]
+   }
    plugins: [
      new CleanWebpackPlugin(['dist']),
      new HtmlWebpackPlugin({
        title: 'Caching'
      }),
+     new webpack.optimize.CommonsChunkPlugin({
+       name: 'vendor'
+     }),
      new webpack.optimize.CommonsChunkPlugin({
        name: 'runtime'
      })
    ],
    output: {
      filename: '[name].[contenthash].js',
      path: path.resolve(__dirname, 'dist')
    }
  };
```

W> Note that order matters here. The `'vendor'` instance must be included prior to the `'runtime'` instance.

Let's run another build to see our new `vendor` bundle:

``` bash
Hash: 69eb92ebf8935413280d
Version: webpack 3.3.0
Time: 1502ms
                          Asset       Size  Chunks                    Chunk Names
 vendor.8196d409d2f988123318.js     541 kB       0  [emitted]  [big]  vendor
   main.0ac0ae2d4a11214ccd19.js  791 bytes       1  [emitted]         main
runtime.004a1114de8bcf026622.js    5.85 kB       2  [emitted]         runtime
                     index.html  352 bytes          [emitted]
   [1] ./src/index.js 336 bytes {1} [built]
   [2] (webpack)/buildin/global.js 509 bytes {0} [built]
   [3] (webpack)/buildin/module.js 517 bytes {0} [built]
   [4] multi lodash 28 bytes {0} [built]
    + 1 hidden module
```


## Module Identifiers

Let's add another module, `print.js`, to our project:

__project__

``` diff
webpack-demo
|- package.json
|- webpack.config.js
|- /dist
|- /src
  |- index.js
+ |- print.js
|- /node_modules
```

__print.js__

``` diff
+ export default function print(text) {
+   console.log(text);
+ };
```

__src/index.js__

``` diff
  import _ from 'lodash';
+ import Print from './print';

  function component() {
    var element = document.createElement('div');

    // Lodash, currently included via a script, is required for this line to work
    // Lodash, now imported by this script
    element.innerHTML = _.join(['Hello', 'webpack'], ' ');
+   element.onClick = Print.bind(null, 'Hello webpack!');

    return element;
  }

  document.body.appendChild(component());
```

Running another build, we would expect only our `main` bundle's hash to change, however...

``` bash
Hash: d38a06644fdbb898d795
Version: webpack 3.3.0
Time: 1445ms
                          Asset       Size  Chunks                    Chunk Names
 vendor.a7561fb0e9a071baadb9.js     541 kB       0  [emitted]  [big]  vendor
   main.b746e3eb72875af2caa9.js    1.22 kB       1  [emitted]         main
runtime.1400d5af64fc1b7b3a45.js    5.85 kB       2  [emitted]         runtime
                     index.html  352 bytes          [emitted]
   [1] ./src/index.js 421 bytes {1} [built]
   [2] (webpack)/buildin/global.js 509 bytes {0} [built]
   [3] (webpack)/buildin/module.js 517 bytes {0} [built]
   [4] ./src/print.js 62 bytes {1} [built]
   [5] multi lodash 28 bytes {0} [built]
    + 1 hidden module
```

... we can see that all three have. This is because the [`module.id`]() of each is incremental by default, so...

- The `main` bundle changed because of it's new content.
- The `vendor` bundle changed because it's `module.id` was changed.
- And, the `runtime` bundle changed because it now contains a reference to a new module.

The first and last are expected -- it's the `vendor` hash we want to fix. Luckily, there are two plugins that can help us out with this dilemma. First, the [`NamedModulesPlugin`]() which the path to the module rather than a numerical ID. While this plugin is useful during development for easier to read output, it does take a bit longer to run. The second option is the `HashedModuleIdsPlugin`, which is what we'll use as these examples are more targeted toward production builds:

__webpack.config.js__

``` diff

```
