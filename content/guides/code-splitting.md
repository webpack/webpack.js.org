---
title: Code Splitting
sort: 9
contributors:
  - pksjce
  - pastelsky
  - simon04
  - jonwheeler
  - johnstew
  - shinxi
  - tomtasche
  - levy9527
  - rahulcs
  - chrisVillanueva
  - rafde
  - bartushek
  - shaunwallace
  - skipjack
  - jakearchibald
  - TheDutchCoder
---

Code splitting is one of the most compelling features of webpack. This feature allows you to split your code into various bundles which can then be loaded on demand or in parallel. It can be used to achieve smaller bundles and control resource load prioritization which, if used correctly, can have a major impact on load time.

There are three general approaches to code splitting available:

- Entry Points: Manually split code using [`entry`](/configuration/entry-context) configuration.
- Plugins & Loaders: Certain plugins and loaders can be used to split code in a variety of different ways.
- Dynamic Imports: This method allows splitting code via inline function calls within modules.


## Entry Points

This is by far the easiest, and most intuitive, way to split code. However, it is more manual and has a some pitfalls we will go over. Let's take a look at how we might split the core libraries and frameworks an application uses from the actual source code:

__webpack.config.js__

``` js
const path = require('path');

module.exports = {
  entry: {
    index: './src/index.js',
    vendor: [
      'lodash'
    ]
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  }
};
```

This will yield the following build result:

?> Add bash example of webpack output

As mentioned there are some pitfalls to this approach:

- If there are any duplicated modules between entry chunks they will be included in both bundles.
- It isn't as flexible and can't be used to dynamically split code with the core application logic.

The first of these two points is definitely an issue for our example, as `moment` is also imported within `./src/index.js` and will thus be duplicated in the output. See the `CommonChunkPlugin` example below for a solution to this problem.


## Plugins & Loaders

There are multiple plugins and loaders in webpack's ecosystem that can help with splitting and managing split code. The most widely utilized of these is the [`CommonsChunkPlugin`](/plugins/commons-chunk-plugin), a fairly advanced tool that allows us to extract common dependencies into an existing entry chunk or an entirely new chunk. Let's use this to de-duplicate the `moment` dependency from the previous example:

__webpack.config.js__

``` js
const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: {
    index: './src/index.js',
    vendor: [
      'lodash'
    ]
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor' // Specify the common bundle's name.
    })
  ],
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  }
};
```

This will yield the following build result (notice how our `index.bundle.js` has shrunk in size):

?> Add bash example of webpack output

Here are some other useful plugins and loaders provide by the community for splitting code:

- [`ExtractTextPlugin`](/plugins/extract-text-webpack-plugin): Useful for splitting CSS out from the main application.
- [`bundle-loader`](/loaders/bundle-loader): Used to split code and lazy load the resulting bundles.
- [`promise-loader`](https://github.com/gaearon/promise-loader): Similar to the `bundle-loader` but uses promises.


## Dynamic Imports

...


## Next Steps

See [Lazy Loading](/guides/lazy-loading) for a more concrete example of how `import()` can be used in a real application and [Caching](/guides/caching) to learn how to split code more effectively.
