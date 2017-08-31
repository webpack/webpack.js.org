---
title: IgnorePlugin
contributors:
  - simon04
---

Prevent generation of modules for `import` or `require` calls matching the following regular expressions:

* `requestRegExp` A RegExp to test the request against.
* `contextRegExp` (optional) A RegExp to test the context (directory) against.

``` js
new webpack.IgnorePlugin(requestRegExp, [contextRegExp])
```

The following examples demonstrate a few ways this plugin can be used.


## Ignore Moment Locales

As of [moment](https://momentjs.com/) 2.18, all locales are bundled together with the core library (see [this GitHub issue](https://github.com/moment/moment/issues/2373)). You can use the `IgnorePlugin` to stop any locale being bundled with moment:

```js
new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
```
