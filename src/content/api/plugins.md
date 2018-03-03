---
title: Plugin API
group: Plugins
sort: 0
contributors:
  - thelarkinn
  - pksjce
  - e-cloud
---

Plugins are a key piece of the webpack ecosystem and provide the community with
a powerful way to tap into webpack's compilation process. A plugin is able to
[hook]() into key events that are fired throughout each compilation. Every step
of the way, the plugin will have full access to the `compiler` and, when
applicable, the current `compilation`.

T> For a high-level introduction to writing plugins, start with
[writing a plugin](/contribute/writing-a-plugin).

Let's start by going over `tapable` utility, which provides the backbone of
webpack's plugin interface.


## Tapable

This small library is a core utility in webpack but can also be used elsewhere
to provide a similar plugin interface. Many objects in webpack extend the
`Tapable` class. The class exposes `tap`, `tapAsync`, and `tapPromise` methods
which plugins can use to inject custom build steps that will be fired
throughout a compilation.

Please see the [documentation](https://github.com/webpack/tapable) to learn
more. An understanding of the three `tap` methods, as well as the hooks that
provide them is crucial. The objects that extend `Tapable` (e.g. the compiler),
the hooks they provide, and each hook's type (e.g. the `SyncHook`) will be
noted.


## Plugin Types

Depending on the hooks used and `tap` methods applied, plugins can function in
a number of different ways. The way this works is closely related to the
[hooks](https://github.com/webpack/tapable#tapable) provided by `Tapable`. The
[compiler hooks]() each note the underlying `Tapable` hook indicating which
`tap` methods are available.

So depending which event you `tap` into, the plugin may run differently. For
example, when hooking into `compile` stage, only the synchronous `tap` method
can be used:

``` js
compiler.hooks.compile.tap('MyPlugin', params => {
  console.log('Synchronously tapping the compile hook.')
})
```

However, for `run` which utilizes the `AsyncHook`, we can utilize `tapAsync`
or `tapPromise` (as well as `tap`):

``` js
compiler.hooks.run.tapAsync('MyPlugin', (compiler, callback) => {
  console.log('Asynchronously tapping the run hook.')
  callback()
})

compiler.hooks.run.tapPromise('MyPlugin', compiler => {
  return new Promise(resolve => setTimeout(resolve, 1000)).then(() => {
    console.log('Asynchronously tapping the run hook with a delay.')
  })
})
```

The moral of the story is that there are a variety of ways to `hook` into the
`compiler`, each allowing your plugin run as it sees fit.


## Custom Hooks

In order to add a new hook to the compilation for other plugins to `tap` into,
simply `require` the necessary hook class from `tapable` and create one:

``` js
const SyncHook = require('tapable').SyncHook;

// Within the `apply` method...
if (compiler.hooks.myCustomHook) throw new Error('Already in use');
compiler.hooks.myCustomHook = new SyncHook(['a', 'b', 'c'])

// Wherever/whenever you'd like to trigger the hook...
compiler.hooks.myCustomHook.call(a, b, c);
```

Again, see the [documentation]() for `tapable` to learn more about the
different hook classes and how they work.


## Next Steps

See the [compiler hooks]() section for a detailed listing of all the available
`compiler` hooks and the parameters they make available.
