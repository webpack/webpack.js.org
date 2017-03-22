---
title: Code Splitting - Libraries
sort: 32
contributors:
  - pksjce
  - chrisVillanueva
  - johnstew
  - rafde
  - bartushek
  - shaunwallace
---

A typical application uses third party libraries for framework/functionality needs. Particular versions of these libraries are used and code here does not change often. However, the application code changes frequently.

Bundling application code with third party code would be inefficient. This is because the browser can cache asset files based on the cache header and files can be cached without needing to call the cdn again if its contents don't change. To take advantage of this, we want to keep the hash of the vendor files constant regardless of application code changes.

We can do this only when we separate the bundles for vendor and application code.

Let's consider a sample application that uses [momentjs](https://www.npmjs.com/package/moment), a commonly used time formatting library.

Install `moment` as follows in your application directory.

`npm install --save moment`

The index file will require `moment` as a dependency and log the current date as follows

__index.js__
```javascript
var moment = require('moment');
console.log(moment().format());

```

We can bundle the application with webpack using the following config

__webpack.config.js__

```javascript
var path = require('path');

module.exports = function(env) {
    return {
        entry: './index.js',
        output: {
            filename: '[name].[chunkhash].js',
            path: path.resolve(__dirname, 'dist')
        }
    }
}
```

On running `webpack` in your application, if you inspect the resulting bundle, you will see that `moment` and `index.js` have been bundled in `bundle.js`.

This is not ideal for the application. If the code in `index.js` changes, then the whole bundle is rebuilt. The browser will have to load a new copy of the new bundle even though most of it hasn't changed at all.

## Multiple Entries

Let's try to mitigate this by adding a separate entry point for `moment` and name it `vendor`

__webpack.config.js__

```javascript
var path = require('path');

module.exports = function(env) {
    return {
        entry: {
            main: './index.js',
            vendor: 'moment'
        },
        output: {
            filename: '[name].[chunkhash].js',
            path: path.resolve(__dirname, 'dist')
        }
    }
}
```

On running `webpack` now, we see that two bundles have been created. If you inspect these though, you will find that the code for `moment` is present in both the files! The reason for that is `moment` is a dependency of the main application (e.g. index.js) and each entry point will bundle its own dependencies.

It is for this reason, that we will need to use the [CommonsChunkPlugin](/plugins/commons-chunk-plugin).

## `CommonsChunkPlugin`

This is a pretty complex plugin. It fundamentally allows us to extract all the common modules from different bundles and add them to the common bundle. If a common bundle does not exist, then it creates a new one.

We can modify our webpack config file to use the `CommonsChunkPlugin` as follows

__webpack.config.js__

```javascript
var webpack = require('webpack');
var path = require('path');

module.exports = function(env) {
    return {
        entry: {
            main: './index.js',
            vendor: 'moment'
        },
        output: {
            filename: '[name].[chunkhash].js',
            path: path.resolve(__dirname, 'dist')
        },
        plugins: [
            new webpack.optimize.CommonsChunkPlugin({
                name: 'vendor' // Specify the common bundle's name.
            })
        ]
    }
}
```
Now run `webpack` on your application. Bundle inspection shows that `moment` code is present only in the vendor bundle.

## Implicit Common Vendor Chunk

You can configure a `CommonsChunkPlugin` instance to only accept vendor libraries.

 __webpack.config.js__

```javascript
var webpack = require('webpack');
var path = require('path');

module.exports = function() {
    return {
        entry: {
            main: './index.js'
        },
        output: {
            filename: '[name].[chunkhash].js',
            path: path.resolve(__dirname, 'dist')
        },
        plugins: [
            new webpack.optimize.CommonsChunkPlugin({
                name: 'vendor',
                minChunks: function (module) {
                   // this assumes your vendor imports exist in the node_modules directory
                   return module.context && module.context.indexOf('node_modules') !== -1;
                }
            })
        ]
    };
}
```

## Manifest File

But, if we change application code and run `webpack` again, we see that the hash for the vendor file changes. Even though we achieved separate bundles for `vendor` and `main` bundles, we see that the `vendor` bundle changes when the application code changes.
This means that we still don't reap the benefits of browser caching because the hash for vendor file changes on every build and the browser will have to reload the file.

The issue here is that on every build, webpack generates some webpack runtime code, which helps webpack do its job. When there is a single bundle, the runtime code resides in it. But when multiple bundles are generated, the runtime code is extracted into the common module, here the `vendor` file.

To prevent this, we need to extract out the runtime into a separate manifest file. Even though we are creating another bundle, the overhead is offset by the long term caching benefits that we obtain on the `vendor` file.

__webpack.config.js__

```javascript
var webpack = require('webpack');
var path = require('path');

module.exports = function(env) {
    return {
        entry: {
            main: './index.js',
            vendor: 'moment'
        },
        output: {
            filename: '[name].[chunkhash].js',
            path: path.resolve(__dirname, 'dist')
        },
        plugins: [
            new webpack.optimize.CommonsChunkPlugin({
                names: ['vendor', 'manifest'] // Specify the common bundle's name.
            })
        ]
    }
};
```

With the above webpack config, we see three bundles being generated. `vendor`, `main` and `manifest` bundles. 

Using what we have learned so far, we could also achieve the same result with an implicit common vendor chunk.

 __webpack.config.js__
 
```javascript
var webpack = require('webpack');
var path = require('path');

module.exports = function() {
    return {
        entry: {
            main: './index.js' //Notice that we do not have an explicit vendor entry here
        },
        output: {
            filename: '[name].[chunkhash].js',
            path: path.resolve(__dirname, 'dist')
        },
        plugins: [
            new webpack.optimize.CommonsChunkPlugin({
                name: 'vendor',
                minChunks: function (module) {
                   // this assumes your vendor imports exist in the node_modules directory
                   return module.context && module.context.indexOf('node_modules') !== -1;
                }
            }),
            //CommonChunksPlugin will now extract all the common modules from vendor and main bundles
            new webpack.optimize.CommonsChunkPlugin({ 
                name: 'manifest' //But since there are no more common modules between them we end up with just the runtime code included in the manifest file
            })
        ]
    };
}
```

T> Note that long-term bundle caching is achieved with content-based hashing policy `chunkhash`. Learn more about [caching](/guides/caching/).
