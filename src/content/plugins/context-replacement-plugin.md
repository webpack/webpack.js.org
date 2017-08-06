---
title: ContextReplacementPlugin
contributors:
  - simon04
related:
  - title: Issue #2783 - ContextReplacementPlugin Description
  - url: https://github.com/webpack/webpack/issues/2783#issuecomment-234137265
---

*Context* refers to a [require with an expression](/guides/dependency-management/#require-with-expression) such as `require('./locale/' + name + '.json')`. When encountering such an expression, webpack infers the directory (`'./locale/'`) and a regular expression (`/^.*\.json$/`). Since the `name` is not known at compile time, webpack includes every file as module in the bundle.

The `ContextReplacementPlugin` allows you to override the inferred information. There are various ways to configure the plugin:


## `newContentResource`, `newContentRecursive`, `newContentRegExp`

```javascript
new webpack.ContextReplacementPlugin(
  resourceRegExp: RegExp,
  newContentResource?: string,
  newContentRecursive?: boolean,
  newContentRegExp?: RegExp
)
```

If the resource (directory) matches `resourceRegExp`, the plugin replaces the default resource, recursive flag or generated regular expression with `newContentResource`, `newContentRecursive` or `newContextRegExp` respectively. If `newContentResource` is relative, it is resolved relative to the previous resource.

**Example**

```javascript
new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /de|fr|hu/)
```

The `moment/locale` context is restricted to files matching `/de|fr|hu/`. Thus only those locales are included (see also [this GitHub issue](https://github.com/moment/moment/issues/2373)).


## `newContentCallback`

```javascript
new webpack.ContextReplacementPlugin(
  resourceRegExp: RegExp,
  newContentCallback: (data) => void
)
```

The function `newContentCallback` is given a [`data` object of the `ContextModuleFactory`](/api/plugins/module-factories/) and it is expected to overwrite the `request` attribute of the supplied object.

**Example**

```javascript
new webpack.ContextReplacementPlugin(/^\.\/locale$/, (context) => {
  if (!/\/moment\//.test(context.context)) { return; }
  Object.assign(context, {
    regExp: /^\.\/\w+/,
    request: '../../locale', // resolved relatively
  });
}),
```


## `newContentResource`, `newContentCreateContextMap`

```javascript
new webpack.ContextReplacementPlugin(
  resourceRegExp: RegExp,
  newContentResource: string,
  newContentCreateContextMap: object // mapping runtime-request (userRequest) to compile-time-request (request)
)
```

**Example**

```javascript
new ContextReplacementPlugin(/selector/, './folder', {
  './request': './request',
  './other-request': './new-request'
  /* runtime-request: compile-time request */
})
```
