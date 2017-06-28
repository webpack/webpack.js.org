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

T> This guide extends the examples provided in [Getting Started](/guides/getting-started) and [Managing Built Files](/guides/output-management). Please make sure you are at least familiar with the examples provided in them.

Code splitting is one of the most compelling features of webpack. This feature allows you to split your code into various bundles which can then be loaded on demand or in parallel. It can be used to achieve smaller bundles and control resource load prioritization which, if used correctly, can have a major impact on load time.

There are three general approaches to code splitting available:

- Entry Points: Manually split code using [`entry`](/configuration/entry-context) configuration.
- Prevent Duplication: Use the [`CommonsChunkPlugin`](/plugins/commons-chunk-plugin) to dedupe and split chunks.
- Dynamic Imports: Split code via inline function calls within modules.


## Entry Points

This is by far the easiest, and most intuitive, way to split code. However, it is more manual and has a some pitfalls we will go over. Let's take a look at how we might split another module from the main bundle:

__project__

``` diff
webpack-demo
|- package.json
|- webpack.config.js
|- /dist
  |- bundle.js
  |- index.html
|- /src
  |- index.js
+ |- another-module.js
|- /node_modules
```

__another-module.js__

``` js
import _ from 'lodash';

console.log(
  _.join(['Another', 'module', 'loaded!'], ' ')
);
```

__webpack.config.js__

``` js
const path = require('path');

module.exports = {
  entry: {
    index: './src/index.js',
    another: './src/another-module.js'
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  }
};
```

This will yield the following build result:

?> Update the bash output

As mentioned there are some pitfalls to this approach:

- If there are any duplicated modules between entry chunks they will be included in both bundles.
- It isn't as flexible and can't be used to dynamically split code with the core application logic.

The first of these two points is definitely an issue for our example, as `lodash` is also imported within `./src/index.js` and will thus be duplicated in both bundles. See the `CommonsChunkPlugin` example below for a solution to this problem.


## Prevent Duplication

The [`CommonsChunkPlugin`](/plugins/commons-chunk-plugin) allows us to extract common dependencies into an existing entry chunk or an entirely new chunk. Let's use this to de-duplicate the `lodash` dependency from the previous example:

__webpack.config.js__

``` diff
  const path = require('path');
+ const webpack = require('webpack');

  module.exports = {
    entry: {
      index: './src/index.js',
      another: './src/another-module.js'
    },
+   plugins: [
+     new webpack.optimize.CommonsChunkPlugin({
+       name: 'common' // Specify the common bundle's name.
+     })
+   ],
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist')
    }
  };
```

With the `CommonsChunkPlugin` in place, we should now see the duplicate dependency removed from our `index.bundle.js`. The plugin should notice that we've separated `lodash` out to a separate chunk and remove the dead weight from our main bundle. Let's do an `npm run build` to see if it worked:

?> Update bash output.

Here are some other useful plugins and loaders provide by the community for splitting code:

- [`ExtractTextPlugin`](/plugins/extract-text-webpack-plugin): Useful for splitting CSS out from the main application.
- [`bundle-loader`](/loaders/bundle-loader): Used to split code and lazy load the resulting bundles.
- [`promise-loader`](https://github.com/gaearon/promise-loader): Similar to the `bundle-loader` but uses promises.


## Dynamic Imports

Two similar techniques are supported by webpack when it comes to dynamic code splitting. The first and more preferable approach is use to the [`import()` syntax](/api/module-methods#import-) that conforms to the [ECMAScript proposal](https://github.com/tc39/proposal-dynamic-import) for dynamic imports. The legacy, webpack-specific approach is to use [`require.ensure`](/api/module-methods#require-ensure). Let's try using the first of these two approaches...

Before we start, let's remove the `entry` and `CommonsChunkPlugin` from our config as they won't be needed for this next demonstration:

__webpack.config.js__

``` diff
  const path = require('path');
- const webpack = require('webpack');

  module.exports = {
    entry: {
+     index: './src/index.js'
-     index: './src/index.js',
-     vendor: [
-       'lodash'
-     ]
    },
-   plugins: [
-     new webpack.optimize.CommonsChunkPlugin({
-       name: 'vendor' // Specify the common bundle's name.
-     })
-   ],
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist')
    }
  };
```

Now, instead of statically importing lodash, we'll use dynamic importing to separate a chunk:

__src/index.js__

``` diff
- import _ from 'lodash';
-
- function component() {
+ function getComponent() {
-   var element = document.createElement('div');
-
-   // Lodash, now imported by this script
-   element.innerHTML = _.join(['Hello', 'webpack'], ' ');
+   return import(/* webpackChunkName: "lodash" */ 'lodash').then(module => {
+     var element = document.createElement('div');
+
+     element.innerHTML = _.join(['Hello', 'webpack'], ' ');
+
+     return element;
+
+   }).catch(error => 'An error occurred while loading the component');
  }

- document.body.appendChild(component());
+ getComponent().then(component => {
+   document.body.appendChild(component);
+ })
```

Now, when we run webpack, we should see lodash separated out to a separate bundle:

?> Add bash example of webpack output

If you've enabled [`async` functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function) via a pre-processor like babel, note that you can simplify the code as `import()` statements just return promises:

__src/index.js__

``` diff
- function getComponent() {
+ async function getComponent() {
-   return import(/* webpackChunkName: "lodash" */ 'lodash').then(module => {
-     var element = document.createElement('div');
-
-     element.innerHTML = _.join(['Hello', 'webpack'], ' ');
-
-     return element;
-
-   }).catch(error => 'An error occurred while loading the component');
+   var element = document.createElement('div');
+   const _ = await import(/* webpackChunkName: "lodash" */ 'lodash');
+
+   element.innerHTML = _.join(['Hello', 'webpack'], ' ');
+
+   return element;
  }

  getComponent().then(component => {
    document.body.appendChild(component);
  });
```


## Next Steps

See [Lazy Loading](/guides/lazy-loading) for a more concrete example of how `import()` can be used in a real application and [Caching](/guides/caching) to learn how to split code more effectively.
