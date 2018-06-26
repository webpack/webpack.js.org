---
title: Caching
sort: 11
contributors:
  - okonet
  - jouni-kantola
  - skipjack
  - dannycjones
related:
  - title: Predictable Long Term Caching
    url: https://medium.com/webpack/predictable-long-term-caching-with-webpack-d3eee1d3fa31
  - title: Webpack & Caching
    url: https://gist.github.com/sokra/ff1b0290282bfa2c037bdb6dcca1a7aa
  - title: Advanced Webpack Presentation
    url: https://presentations.survivejs.com/advanced-webpack/
  - title: Issue 1315
    url: https://github.com/webpack/webpack/issues/1315
  - title: Issue 652
    url: https://github.com/webpack/webpack.js.org/issues/652
---

T> The examples in this guide stem from [getting started](/guides/getting-started), [output management](/guides/output-management) and [code splitting](/guides/code-splitting).

So we're using webpack to bundle our modular application which yields a deployable `/dist` directory. Once the contents of `/dist` have been deployed to a server, clients (typically browsers) will hit that server to grab the site and its assets. The last step can be time consuming, which is why browsers use a technique called [caching](https://searchstorage.techtarget.com/definition/cache). This allows sites to load faster with less unnecessary network traffic, however it can also cause headaches when you need new code to be picked up.

This guide focuses on the configuration needed to ensure files produced by webpack compilation can remain cached unless their contents has changed.


## Output Filenames

A simple way to ensure the browser picks up changed files is by using `output.filename` [substitutions](/configuration/output#output-filename). The `[hash]` substitution can be used to include a build-specific hash in the filename, however it's even better to use the `[chunkhash]` substitution which includes a chunk-specific hash in the filename.

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
  const path = require('path');
  const CleanWebpackPlugin = require('clean-webpack-plugin');
  const HtmlWebpackPlugin = require('html-webpack-plugin');

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

``` bash
Hash: f7a289a94c5e4cd1e566
Version: webpack 3.5.1
Time: 835ms
                       Asset       Size  Chunks                    Chunk Names
main.7e2c49a622975ebd9b7e.js     544 kB       0  [emitted]  [big]  main
                  index.html  197 bytes          [emitted]
   [0] ./src/index.js 216 bytes {0} [built]
   [2] (webpack)/buildin/global.js 509 bytes {0} [built]
   [3] (webpack)/buildin/module.js 517 bytes {0} [built]
    + 1 hidden module
Child html-webpack-plugin for "index.html":
     1 asset
       [2] (webpack)/buildin/global.js 509 bytes {0} [built]
       [3] (webpack)/buildin/module.js 517 bytes {0} [built]
        + 2 hidden modules
```

As you can see the bundle's name now reflects its content (via the hash). If we run another build without making any changes, we'd expect that filename to stay the same. However, if we were to run it again, we may find that this is not the case:

``` bash
Hash: f7a289a94c5e4cd1e566
Version: webpack 3.5.1
Time: 835ms
                       Asset       Size  Chunks                    Chunk Names
main.205199ab45963f6a62ec.js     544 kB       0  [emitted]  [big]  main
                  index.html  197 bytes          [emitted]
   [0] ./src/index.js 216 bytes {0} [built]
   [2] (webpack)/buildin/global.js 509 bytes {0} [built]
   [3] (webpack)/buildin/module.js 517 bytes {0} [built]
    + 1 hidden module
Child html-webpack-plugin for "index.html":
     1 asset
       [2] (webpack)/buildin/global.js 509 bytes {0} [built]
       [3] (webpack)/buildin/module.js 517 bytes {0} [built]
        + 2 hidden modules
```

This is because webpack includes certain boilerplate, specifically the runtime and manifest, in the entry chunk.

W> Output may differ depending on your current webpack version. Newer versions may not have all the same issues with hashing as some older versions, but we still recommend the following steps to be safe.

## Extracting Boilerplate

As we learned in [code splitting](/guides/code-splitting), the [`SplitChunksPlugin`](/plugins/split-chunks-plugin/) can be used to split modules out into separate bundles. webpack provides an optimization feature which does split out runtime code into a separate chunk(s) according to the options provided, simply use [`optimization.runtimeChunk`](/configuration/optimization/#optimization-runtimechunk) set to `single` for creating one runtime bundle:

__webpack.config.js__

``` diff
  const path = require('path');
  const CleanWebpackPlugin = require('clean-webpack-plugin');
  const HtmlWebpackPlugin = require('html-webpack-plugin');

  module.exports = {
    entry: './src/index.js',
    plugins: [
      new CleanWebpackPlugin(['dist']),
      new HtmlWebpackPlugin({
        title: 'Caching'
    ],
    output: {
      filename: '[name].[chunkhash].js',
      path: path.resolve(__dirname, 'dist')
    },
+   optimization: {
+     runtimeChunk: 'single'
+   }
  };
```

Let's run another build to see the extracted `runtime` bundle:

``` bash
Hash: 82c9c385607b2150fab2
Version: webpack 4.12.0
Time: 3027ms
                          Asset       Size  Chunks             Chunk Names
runtime.cc17ae2a94ec771e9221.js   1.42 KiB       0  [emitted]  runtime
   main.e81de2cf758ada72f306.js   69.5 KiB       1  [emitted]  main
                     index.html  275 bytes          [emitted]  
[1] (webpack)/buildin/module.js 497 bytes {1} [built]
[2] (webpack)/buildin/global.js 489 bytes {1} [built]
[3] ./src/index.js 309 bytes {1} [built]
    + 1 hidden module
```

It's also good practice to extract third-party libraries, such as `lodash` or `react`, to a separate `vendor` chunk as they are less likely to change than our local source code. This step will allow clients to request even less from the server to stay up to date.
This can be done by using the [`cacheGroups`](/plugins/split-chunks-plugin/#splitchunks-cachegroups) option of the [`SplitChunksPlugin`](/plugins/split-chunks-plugin/) demonstrated in [Example 2 of SplitChunksPlugin](/plugins/split-chunks-plugin/#split-chunks-example-2). Lets add `optimization.splitChunks` with `cacheGroups` with next params and build:

__webpack.config.js__

``` diff
  var path = require('path');
  const CleanWebpackPlugin = require('clean-webpack-plugin');
  const HtmlWebpackPlugin = require('html-webpack-plugin');

  module.exports = {
    entry: './src/index.js',
    plugins: [
      new CleanWebpackPlugin(['dist']),
      new HtmlWebpackPlugin({
        title: 'Caching'
      }),
    ],
    output: {
      filename: '[name].[chunkhash].js',
      path: path.resolve(__dirname, 'dist')
    },
    optimization: {
-     runtimeChunk: 'single'
+     runtimeChunk: 'single',
+     splitChunks: {
+       cacheGroups: {
+         vendor: {
+           test: /[\\/]node_modules[\\/]/,
+           name: 'vendors',
+           chunks: 'all'
+         }
+       }
+     }
    }
  };
```

Let's run another build to see our new `vendor` bundle:

``` bash
Hash: 213f57fc3bb5cb47c719
Version: webpack 4.12.0
Time: 475ms
                          Asset       Size  Chunks             Chunk Names
runtime.cc17ae2a94ec771e9221.js   1.42 KiB       0  [emitted]  runtime
vendors.a42c3ca0d742766d7a28.js   69.4 KiB       1  [emitted]  vendors
   main.abf44fedb7d11d4312d7.js  240 bytes       2  [emitted]  main
                     index.html  353 bytes          [emitted]  
[1] (webpack)/buildin/module.js 497 bytes {1} [built]
[2] (webpack)/buildin/global.js 489 bytes {1} [built]
[3] ./src/index.js 309 bytes {2} [built]
    + 1 hidden module
```

We can now see that our `main` bundle does not contain `vendor` code from `node_modules` directory and is down in size to `240 bytes`!

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

    // Lodash, now imported by this script
    element.innerHTML = _.join(['Hello', 'webpack'], ' ');
+   element.onclick = Print.bind(null, 'Hello webpack!');

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
manifest.1400d5af64fc1b7b3a45.js    5.85 kB       2  [emitted]         manifest
                      index.html  352 bytes          [emitted]
   [1] ./src/index.js 421 bytes {1} [built]
   [2] (webpack)/buildin/global.js 509 bytes {0} [built]
   [3] (webpack)/buildin/module.js 517 bytes {0} [built]
   [4] ./src/print.js 62 bytes {1} [built]
   [5] multi lodash 28 bytes {0} [built]
    + 1 hidden module
```

... we can see that all three have. This is because each [`module.id`](/api/module-variables#module-id-commonjs-) is incremented based on resolving order by default. Meaning when the order of resolving is changed, the IDs will be changed as well. So, to recap:

- The `main` bundle changed because of its new content.
- The `vendor` bundle changed because its `module.id` was changed.
- And, the `manifest` bundle changed because it now contains a reference to a new module.

The first and last are expected -- it's the `vendor` hash we want to fix. Luckily, there are two plugins we can use to resolve this issue. The first is the [`NamedModulesPlugin`](/plugins/named-modules-plugin), which will use the path to the module rather than a numerical identifier. While this plugin is useful during development for more readable output, it does take a bit longer to run. The second option is the [`HashedModuleIdsPlugin`](/plugins/hashed-module-ids-plugin), which is recommended for production builds:

__webpack.config.js__

``` diff
  const path = require('path');
  const webpack = require('webpack');
  const CleanWebpackPlugin = require('clean-webpack-plugin');
  const HtmlWebpackPlugin = require('html-webpack-plugin');

  module.exports = {
    entry: {
      main: './src/index.js',
      vendor: [
        'lodash'
      ]
    },
    plugins: [
      new CleanWebpackPlugin(['dist']),
      new HtmlWebpackPlugin({
        title: 'Caching'
      }),
+     new webpack.HashedModuleIdsPlugin(),
      new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor'
      }),
      new webpack.optimize.CommonsChunkPlugin({
        name: 'manifest'
      })
    ],
    output: {
      filename: '[name].[chunkhash].js',
      path: path.resolve(__dirname, 'dist')
    }
  };
```

Now, despite any new local dependencies, our `vendor` hash should stay consistent between builds:

``` bash
Hash: 1f49b42afb9a5acfbaff
Version: webpack 3.3.0
Time: 1372ms
                           Asset       Size  Chunks                    Chunk Names
  vendor.eed6dcc3b30cfa138aaa.js     541 kB       0  [emitted]  [big]  vendor
    main.d103ac311788fcb7e329.js    1.22 kB       1  [emitted]         main
manifest.d2a6dc1ccece13f5a164.js    5.85 kB       2  [emitted]         manifest
                      index.html  352 bytes          [emitted]
[3Di9] ./src/print.js 62 bytes {1} [built]
[3IRH] (webpack)/buildin/module.js 517 bytes {0} [built]
[DuR2] (webpack)/buildin/global.js 509 bytes {0} [built]
   [0] multi lodash 28 bytes {0} [built]
[lVK7] ./src/index.js 421 bytes {1} [built]
    + 1 hidden module
```

And let's modify our `src/index.js` to temporarily remove that extra dependency:

__src/index.js__

``` diff
  import _ from 'lodash';
- import Print from './print';
+ // import Print from './print';

  function component() {
    var element = document.createElement('div');

    // Lodash, now imported by this script
    element.innerHTML = _.join(['Hello', 'webpack'], ' ');
-   element.onclick = Print.bind(null, 'Hello webpack!');
+   // element.onclick = Print.bind(null, 'Hello webpack!');

    return element;
  }

  document.body.appendChild(component());
```

And finally run our build again:

``` bash
Hash: 37e1358f135c0b992f72
Version: webpack 3.3.0
Time: 1557ms
                           Asset       Size  Chunks                    Chunk Names
  vendor.eed6dcc3b30cfa138aaa.js     541 kB       0  [emitted]  [big]  vendor
    main.fc7f38e648da79db2aba.js  891 bytes       1  [emitted]         main
manifest.bb5820632fb66c3fb357.js    5.85 kB       2  [emitted]         manifest
                      index.html  352 bytes          [emitted]
[3IRH] (webpack)/buildin/module.js 517 bytes {0} [built]
[DuR2] (webpack)/buildin/global.js 509 bytes {0} [built]
   [0] multi lodash 28 bytes {0} [built]
[lVK7] ./src/index.js 427 bytes {1} [built]
    + 1 hidden module
```

We can see that both builds yielded `eed6dcc3b30cfa138aaa` in the `vendor` bundle's filename.


## Conclusion

Caching gets messy. Plain and simple. However the walk-through above should give you a running start to deploying consistent, cachable assets. See the _Further Reading_ section below to learn more.
