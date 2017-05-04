---
title: IgnorePlugin
contributors:
  - simon04
---

```js
new webpack.IgnorePlugin(requestRegExp, [contextRegExp])
```

Don't generate modules for requests matching the provided RegExp.

* `requestRegExp` A RegExp to test the request against.
* `contextRegExp` (optional) A RegExp to test the context (directory) against.

## Typical use-cases

### Ignore moment locales

As of [moment](https://momentjs.com/) 2.18, all locales are bundled together with the core library (see [this GitHub issue](https://github.com/moment/moment/issues/2373)). You can use the `IgnorePlugin` to stop any locale being bundled with moment:

```js
new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
```
