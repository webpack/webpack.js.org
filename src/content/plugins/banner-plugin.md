---
title: BannerPlugin
contributors:
  - simon04
  - byzyk
  - chenxsan
related:
  - title: banner-plugin-hashing test
    url: https://github.com/webpack/webpack/blob/master/test/configCases/plugins/banner-plugin-hashing/webpack.config.js
---

Adds a banner to the top of each generated chunk.

```javascript
const webpack = require('webpack');

new webpack.BannerPlugin(banner);
// or
new webpack.BannerPlugin(options);
```

<<<<<<< HEAD

## Options {#options}
=======
## Options
>>>>>>> 2a79b6b70d9af5bbff0bb3f044dcb2d575090ce5

<!-- eslint-skip -->

```js
{
  banner: string | function, // the banner as string or function, it will be wrapped in a comment
  raw: boolean, // if true, banner will not be wrapped in a comment
  entryOnly: boolean, // if true, the banner will only be added to the entry chunks
  test: string | RegExp | [string, RegExp], // Include all modules that pass test assertion.
  include: string | RegExp | [string, RegExp], // Include all modules matching any of these conditions.
  exclude: string | RegExp | [string, RegExp], // Exclude all modules matching any of these conditions.
}
```

## Usage {#usage}

```javascript
import webpack from 'webpack';

// string
new webpack.BannerPlugin({
  banner: 'hello world',
});

// function
new webpack.BannerPlugin({
  banner: (yourVariable) => {
    return `yourVariable: ${yourVariable}`;
  },
});
```

<<<<<<< HEAD

## Placeholders {#placeholders}
=======
## Placeholders
>>>>>>> 2a79b6b70d9af5bbff0bb3f044dcb2d575090ce5

Since webpack 2.5.0, placeholders are evaluated in the `banner` string:

```javascript
import webpack from 'webpack';

new webpack.BannerPlugin({
  banner:
    'fullhash:[fullhash], chunkhash:[chunkhash], name:[name], filebase:[filebase], query:[query], file:[file]',
});
```
