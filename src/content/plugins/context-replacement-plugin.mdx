---
title: ContextReplacementPlugin
group: webpack
contributors:
  - simon04
  - byzyk
  - masives
  - chenxsan
related:
  - title: Issue 2783 - ContextReplacementPlugin Description
    url: https://github.com/webpack/webpack/issues/2783#issuecomment-234137265
  - title: Using context replacement module for date-fns
    url: https://github.com/date-fns/date-fns/blob/master/docs/webpack.md
---

_Context_ refers to a [require with an expression](/guides/dependency-management/#require-with-expression) such as `require('./locale/' + name + '.json')`. When encountering such an expression, webpack infers the directory (`'./locale/'`) and a regular expression (`/^.*\.json$/`). Since the `name` is not known at compile time, webpack includes every file as module in the bundle.

The `ContextReplacementPlugin` allows you to override the inferred information. There are various ways to configure the plugin:

## Usage

```typescript
new webpack.ContextReplacementPlugin(
  resourceRegExp: RegExp,
  newContentResource?: string,
  newContentRecursive?: boolean,
  newContentRegExp?: RegExp
)
```

If the resource (directory) matches `resourceRegExp`, the plugin replaces the default resource, recursive flag or generated regular expression with `newContentResource`, `newContentRecursive` or `newContextRegExp` respectively. If `newContentResource` is relative, it is resolved relative to the previous resource.

Here's a small example to restrict module usage:

```javascript
new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /de|fr|hu/);
```

The `moment/locale` context is restricted to files matching `/de|fr|hu/`. Thus only those locales are included (see [this issue](https://github.com/moment/moment/issues/2373) for more information).

## Content Callback

```typescript
new webpack.ContextReplacementPlugin(
  resourceRegExp: RegExp,
  newContentCallback: (data) => void
);
```

The `newContentCallback` function is given a [`data` object of the `ContextModuleFactory`](/api/plugins/module-factories/) and is expected to overwrite the `request` attribute of the supplied object.

Using this callback we can dynamically redirect requests to a new location:

```javascript
new webpack.ContextReplacementPlugin(/^\.\/locale$/, (context) => {
  if (!/\/moment\//.test(context.context)) return;

  Object.assign(context, {
    regExp: /^\.\/\w+/,
    request: '../../locale', // resolved relatively
  });
});
```

## Other Options

The `newContentResource` and `newContentCreateContextMap` parameters are also available:

```typescript
new webpack.ContextReplacementPlugin(
  resourceRegExp: RegExp,
  newContentResource: string,
  newContentCreateContextMap: object // mapping runtime-request (userRequest) to compile-time-request (request)
);
```

These two parameters can be used together to redirect requests in a more targeted way. The `newContentCreateContextMap` allows you to map runtime requests to compile requests in the form of an object:

```javascript
new ContextReplacementPlugin(/selector/, './folder', {
  './request': './request',
  './other-request': './new-request',
});
```
