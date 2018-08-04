---
title: Resolvers
group: Plugins
sort: 3
---

Resolvers are created using the `enhanced-resolve` package. The `Resolver`
class extends the `tapable` class and uses `tapable` to provide a few hooks.
The `enhanced-resolve` package can be used directly to create new resolvers,
however any [`compiler` instance](/api/node/#compiler-instance) has a few resolver instances that can be
tapped into.

Before reading on, make sure you at least skim through the
[`enhanced-resolve`](https://github.com/webpack/enhanced-resolve) and [`tapable`](/api/plugins/#tapable) documentation.


## Types

There are three types of built-in resolvers available on the `compiler` class:

- Normal: Resolves a module via an absolute or relative path.
- Context: Resolves a module within a given context.
- Loader: Resolves a webpack [loader](/loaders).

Depending on need, any one of these built-in resolver used by the `compiler`
can be customized via plugins as such:

``` js
compiler.resolverFactory.plugin('resolver [type]', resolver => {
  resolver.hooks.resolve.tapAsync('MyPlugin', params => {
    // ...
  });
});
```

Where `[type]` is one of the three resolvers mention above, specified as:

- `normal`
- `context`
- `loader`


See the `enhanced-resolve` [documentation](https://github.com/webpack/enhanced-resolve) for a full list of hooks and
descriptions.


## Configuration Options

The resolvers mentioned above can also be customized via a configuration file
with the [`resolve`](/configuration/resolve/) or [`resolveLoader`](/configuration/resolve/#resolveloader) options. These options allow
users to change the resolving behavior through a variety of options including
through resolve `plugins`.

The resolver plugins, e.g. [`DirectoryNamedPlugin`](https://github.com/shaketbaby/directory-named-webpack-plugin), can be included
directly in `resolve.plugins` rather than using standard plugins. Note that the
`resolve` configuration affects the `normal` and `context` resolvers while
`resolveLoader` is used to modify the `loader` resolver.
