---
title: IgnorePlugin
group: webpack
contributors:
  - simon04
  - byzyk
  - DullReferenceException
  - EugeneHlushko
  - FadySamirSadek
  - iamakulov
---

IgnorePlugin prevents the generation of modules for `import` or `require` calls matching the regular expressions or filter functions:

## Using regular expressions

- `resourceRegExp`: A RegExp to test the resource against.
- `contextRegExp`: (optional) A RegExp to test the context (directory) against.

```javascript
new webpack.IgnorePlugin({ resourceRegExp, contextRegExp });
// Supported in webpack 4 and earlier, unsupported in webpack 5:
new webpack.IgnorePlugin(resourceRegExp, [contextRegExp]);
```

## Using filter functions

- `checkResource (resource, context)` A Filter function that receives `resource` and `context` as arguments, must return boolean.
- `checkContext (context)` was **removed in webpack 5** as `checkResource` already gets context.

```javascript
new webpack.IgnorePlugin({
  checkResource(resource) {
    // do something with resource
    return true | false;
  },
});
```

## Example of ignoring Moment Locales

As of [moment](https://momentjs.com/) 2.18, all locales are bundled together with the core library (see [this GitHub issue](https://github.com/moment/moment/issues/2373)).

The `resourceRegExp` parameter passed to `IgnorePlugin` is not tested against the resolved file names or absolute module names being imported or required, but rather against the _string_ passed to `require` or `import` _within the source code where the import is taking place_. For example, if you're trying to exclude `node_modules/moment/locale/*.js`, this won't work:

```diff
-new webpack.IgnorePlugin({ resourceRegExp: /moment\/locale\// });
```

Rather, because `moment` imports with this code:

```js
require('./locale/' + name);
```

...your first regexp must match that `'./locale/'` string. The second `contextRegExp` parameter is then used to select specific directories from where the import took place. The following will cause those locale files to be ignored:

```javascript
new webpack.IgnorePlugin({
  resourceRegExp: /^\.\/locale$/,
  contextRegExp: /moment$/,
});
```

...which means "any require statement matching `'./locale'` from any directories ending with `'moment'` will be ignored.
