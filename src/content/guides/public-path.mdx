---
title: Public Path
sort: 23
contributors:
  - rafaelrinaldi
  - chrisVillanueva
  - gonzoyumo
  - chenxsan
---

The [`publicPath`](/configuration/output/#outputpublicpath) configuration option can be quite useful in a variety of scenarios. It allows you to specify the base path for all the assets within your application.

## Use Cases

There are a few use cases in real applications where this feature becomes especially neat. Essentially, every file emitted to your `output.path` directory will be referenced from the `output.publicPath` location. This includes child chunks (created via [code splitting](/guides/code-splitting/)) and any other assets (e.g. images, fonts, etc.) that are a part of your dependency graph.

### Environment Based

In development for example, we might have an `assets/` folder that lives on the same level of our index page. This is fine, but what if we wanted to host all these static assets on a CDN in production?

To approach this problem you can easily use a good old environment variable. Let's say we have a variable `ASSET_PATH`:

```js
import webpack from 'webpack';

// Try the environment variable, otherwise use root
const ASSET_PATH = process.env.ASSET_PATH || '/';

export default {
  output: {
    publicPath: ASSET_PATH,
  },

  plugins: [
    // This makes it possible for us to safely use env vars on our code
    new webpack.DefinePlugin({
      'process.env.ASSET_PATH': JSON.stringify(ASSET_PATH),
    }),
  ],
};
```

### On The Fly

Another possible use case is to set the `publicPath` on the fly. webpack exposes a global variable called `__webpack_public_path__` that allows you to do that. In your application's entry point, you can do this:

```js
__webpack_public_path__ = process.env.ASSET_PATH;
```

That's all you need. Since we're already using the `DefinePlugin` on our
configuration, `process.env.ASSET_PATH` will always be defined so we can safely
do that.

W> Be aware that if you use ES6 module imports in your entry file the `__webpack_public_path__` assignment will be done after the imports. In such cases, you'll have to move the public path assignment to its own dedicated module and then import it on top of your entry.js:

```js
// entry.js
import './public-path';
import './app';
```

### Automatic publicPath

There are chances that you don't know what the publicPath will be in advance, and webpack can handle it automatically for you by determining the public path from variables like [`import.meta.url`](/api/module-variables/#importmetaurl), [`document.currentScript`](https://developer.mozilla.org/en-US/docs/Web/API/Document/currentScript), `script.src` or `self.location`. What you need is to set [`output.publicPath`](/configuration/output/#outputpublicpath) to `'auto'`:

**webpack.config.js**

```js
module.exports = {
  output: {
    publicPath: 'auto',
  },
};
```

Note that in cases where `document.currentScript` is not supported, e.g., IE browser, you will have to include a polyfill like [`currentScript Polyfill`](https://github.com/amiller-gh/currentScript-polyfill).
