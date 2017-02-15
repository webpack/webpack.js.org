---
title: Passing a Configuration
sort: 2
contributors:
  - sokra
  - skipjack
  - kbariotis
---

Besides exporting a single config object, there are a few more ways that cover other needs as well.

?> exporting a function and --env

## Returning a Promise

Webpack will run the function exported by the configuration file and wait for a Promise to be returned. Handy when you need to asyncronously load configuration variables.

```js
const path = require('path');

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

?> exporting multiple configurations