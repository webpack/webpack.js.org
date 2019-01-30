---
title: Output
sort: 3
contributors:
  - TheLarkInn
  - chyipin
  - rouzbeh84
  - byzyk
---

Configuring the `output` configuration options tells webpack how to write the compiled files to disk. Note that, while there can be multiple `entry` points, only one `output` configuration is specified.


## Usage

The minimum requirements for the `output` property in your webpack config is to set its value to an object including the following thing:

- A `filename` to use for the output file(s).

__webpack.config.js__

```javascript
module.exports = {
  output: {
    filename: 'bundle.js',
  }
};
```

This configuration would output a single `bundle.js` file into the `dist` directory.


## Multiple Entry Points

If your configuration creates more than a single "chunk" (as with multiple entry points or when using plugins like CommonsChunkPlugin), you should use [substitutions](/configuration/output#output-filename) to ensure that each file has a unique name.

```javascript
module.exports = {
  entry: {
    app: './src/app.js',
    search: './src/search.js'
  },
  output: {
    filename: '[name].js',
    path: __dirname + '/dist'
  }
};

// writes to disk: ./dist/app.js, ./dist/search.js
```


## Advanced

Here's a more complicated example of using a CDN and hashes for assets:

__config.js__

```javascript
module.exports = {
  //...
  output: {
    path: '/home/proj/cdn/assets/[hash]',
    publicPath: 'http://cdn.example.com/assets/[hash]/'
  }
};
```

In cases where the eventual `publicPath` of output files isn't known at compile time, it can be left blank and set dynamically at runtime via the `__webpack_public_path__` variable in the entry point file:

```javascript
__webpack_public_path__ = myRuntimePublicPath;

// rest of your application entry
```
