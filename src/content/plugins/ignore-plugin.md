---
title: IgnorePlugin
contributors:
  - simon04
  - byzyk
  - DullReferenceException
  - EugeneHlushko
---

Prevent generation of modules for `import` or `require` calls matching the following regular expressions:

- `requestRegExp` A RegExp to test the request against.
- `contextRegExp` (optional) A RegExp to test the context (directory) against.

``` js
new webpack.IgnorePlugin(requestRegExp, [contextRegExp]);
```

The following examples demonstrate a few ways this plugin can be used.


## Ignore Moment Locales

As of [moment](https://momentjs.com/) 2.18, all locales are bundled together with the core library (see [this GitHub issue](https://github.com/moment/moment/issues/2373)). 

The `requestRegExp` parameter passed to `IgnorePlugin` is not tested against the resolved file names or absolute module names being imported or required, but rather against the _string_ passed to `require` or `import` _within the source code where the import is taking place_. For example, if you're trying to exclude `node_modules/moment/locale/*.js`, this won't work:

```diff
-new webpack.IgnorePlugin(/moment\/locale\//);
```

Rather, because `moment` imports with this code:

```js
require('./locale/' + name);
```

...your first regexp must match that `'./locale/'` string. The second `contextRegExp` parameter is then used to select specific directories from where the import took place. The following will cause those locale files to be ignored:

```js
new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/);
```

...which means "any require statement matching `'./locale'` from any directories ending with `'moment'` will be ignored.
