---
title: Passing a Configuration
sort: 2
contributors:
  - sokra
  - skipjack
  - kbariotis
  - simon04
---

Besides exporting a single config object, there are a few more ways that cover other needs as well.

## Exporting a function

Instead of exporting a configuration object, you may return a function which accepts an environment as argument. When running webpack you may specify build environment keys via `--env`. See [environment](/configuration/environment) for details.

## Exporting a Promise

webpack will run the function exported by the configuration file and wait for a Promise to be returned. Handy when you need to asynchronously load configuration variables.

```js
module.exports = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        entry: './app.js',
        /* ... */
      })
    }, 5000)
  })
}
```

## Exporting multiple configurations
Instead of exporting a single configuration object/function, you may export multiple configurations. When running webpack, all configurations are built. For instance, this is useful for [bundling a library](/guides/author-libraries) for multiple [targets](/configuration/output#output-librarytarget) such as AMD and CommonJS:

```js
module.exports = [{
  output: {
    filename: './dist-amd.js',
    libraryTarget: 'amd'
  },
  entry: './app.js',
}, {
  output: {
    filename: './dist-commonjs.js',
    libraryTarget: 'commonjs'
  },
  entry: './app.js',
}]
```
