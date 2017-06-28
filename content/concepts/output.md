---
title: Output
sort: 3
contributors:
  - TheLarkInn
  - chyipin
  - rouzbeh84
---

Configuring the `output` configuration options tell webpack how to write the compiled files to disk. Note that, while there can be multiple `entry` points, only one `output` configuration is specified.


## Usage

The minimum requirements for the `output` property in your webpack config is to set its value to an object including the following two things:

- A `filename` to use for the output file(s).
- An absolute `path` to your preferred output directory.

**webpack.config.js**

```javascript
const config = {
  output: {
    filename: 'bundle.js',
    path: '/home/proj/public/assets'
  }
};

module.exports = config;
```

This configuration would output a single `bundle.js` file into the `/home/proj/public/assets` directory.


## Multiple Entry Points

If your configuration creates more than a single "chunk" (as with multiple entry points or when using plugins like CommonsChunkPlugin), you should use [substitutions](/configuration/output#output-filename) to ensure that each file has a unique name.

```javascript
{
  entry: {
    app: './src/app.js',
    search: './src/search.js'
  },
  output: {
    filename: '[name].js',
    path: __dirname + '/dist'
  }
}

// writes to disk: ./dist/app.js, ./dist/search.js
```


## Advanced

Here's a more complicated example of using a CDN and hashes for assets:

**config.js**

```javascript
output: {
  path: "/home/proj/cdn/assets/[hash]",
  publicPath: "http://cdn.example.com/assets/[hash]/"
}
```

In cases when the eventual `publicPath` of output files isn't known at compile time, it can be left blank and set dynamically at runtime in the entry point file. If you don't know the `publicPath` while compiling, you can omit it and set `__webpack_public_path__` on your entry point.

```javascript
__webpack_public_path__ = myRuntimePublicPath

// rest of your application entry
```
