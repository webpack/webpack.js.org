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

A simple way to ensure the browser picks up changed files is by using `output.filename` [substitutions](/configuration/output#output-filename). The `[hash]` substitution can be used to include a build-specific hash in the filename, however it's even better to use the `[contenthash]` subsitution which include a bundle-specific hash in the filename.

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
+     filename: '[name].[contenthash].js',
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

...
