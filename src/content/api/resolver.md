---
title: Resolvers
group: Plugins
sort: 3
---

Resolvers are created using the `enhanced-resolve` package. The `Resolver`
class extends the `tapable` class and uses `tapable` to provide a few hooks.
The `enhanced-resolve` package can be used directly to create new resolvers,
however any [`compiler` instance]() has a few resolver instances that can be
tapped into.

Before reading on, make sure you at least skim through the
[`enhanced-resolve`]() and [`tapable`]() documentation.


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
  })
})
```

Where `[type]` is one of the three resolvers mention above, specified as:

- `normal`
- `context`
- `loader`

See the `enhanced-resolve` [documentation]() for a full list of hooks and
descriptions.


## Configuration Options

Briefly discuss and link to resolver-related configuration docs. Clarify how
the options affect the three different resolvers...
