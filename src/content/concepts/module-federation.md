---
title: Module Federation
sort: 8
contributors:
  - sokra
  - chenxsan
  - EugeneHlushko
  - jamesgeorge007
related:
  - title: 'Webpack 5 Module Federation: A game-changer in JavaScript architecture'
    url: https://medium.com/swlh/webpack-5-module-federation-a-game-changer-to-javascript-architecture-bcdd30e02669
  - title: Explanations and Examples
    url: https://github.com/module-federation/module-federation-examples
---

## Motivation

Multiple separate builds should form a single application. These separate builds should not have dependencies between each other, so they can be developed and deployed individually.

This is often known as Micro-Frontends, but is not limited to that.

## Low-level concepts

We distinguish between local and remote modules. Local modules are normal modules which are part of the current build. Remote modules are modules that are not part of the current build and loaded from a so-called container at the runtime.

Loading remote modules is considered asynchronous operation. When using a remote module these asynchronous operations will be placed in the next chunk loading operation(s) that is between the remote module and the entrypoint. It's not possible to use a remote module without a chunk loading operation.

A chunk loading operation is usually an `import()` call, but older constructs like `require.ensure` or `require([...])` are supported as well.

A container is created through a container entry, which exposes asynchronous access to the specific modules. The exposed access is separated into two steps:

1. loading the module (asynchronous)
2. evaluating the module (synchronous).

Step 1 will be done during the chunk loading. Step 2 will be done during the module evaluation interleaved with other (local and remote) modules. This way, evaluation order is unaffected by converting a module from local to remote or the other way around.

It is possible to nest a container. Containers can use modules from other containers. Circular dependencies between container are also possible.

### Overriding

A container is able to flag selected local modules as "overridable". A consumer of the container is able to provide "overrides", which are modules that replace one of the overridable modules of the container. All modules of the container will use the replacement module instead of the local module when the consumer provides one. When the consumer doesn't provide a replacement module, all modules of the container will use the local one.

The container will manage overridable modules in a way that they do not need to be downloaded when they have been overridden by the consumer. This usually happens by placing them into separate chunks.

On the other hand, the provider of the replacement modules, will only provide asynchronous loading functions. It allows the container to load replacement modules only when they are needed. The provider will manage replacement modules in a way that they do not need to be downloaded at all when they are not requested by the container. This usually happens by placing them into separate chunks.

A "name" is used to identify overridable modules from the container.

Overrides are provided in a similar way as the container exposes modules, separated into two steps:

1. Loading (asynchronous)
2. evaluating (asynchronous)

W> When nesting is used, providing overrides to one container will automatically override the modules with the same "name" in the nested container(s).

Overrides must be provided before the modules of the container are loaded. Overridables that are used in initial chunk, can only be overridden by a synchronous module override that doesn't use Promises. Once evaluated, overridables are no longer overridable.

## High-level concepts

Each build acts as container and also consumes other build as container. This way each build is able to access any other exposed module by loading it from its container.

Shared modules are modules that are both overridable and provided as overrides to nested container. They usually point to the same module in each build, e.g. the same library.

The `packageName` option allows setting a package name to look for a `requiredVersion`. It is automatically inferred for the module requests by default, set `requiredVersion` to `false` when automatic infer should be disabled.

## Building blocks

### `OverridablesPlugin` (low level)

This plugin makes specific modules "overridable". A local API (`__webpack_override__`) allows to provide overrides.

__webpack.config.js__

```js
const OverridablesPlugin = require('webpack/lib/container/OverridablesPlugin');
module.exports = {
  plugins: [
    new OverridablesPlugin([
      {
        // we define an overridable module with OverridablesPlugin
        test1: './src/test1.js',
      },
    ]),
  ],
};
```

__src/index.js__

```js
__webpack_override__({
  // here we override test1 module
  test1: () => 'I will override test1 module under src',
});
```

### `ContainerPlugin` (low level)

This plugin creates an additional container entry with the specified exposed modules. It also uses the `OverridablesPlugin` internally and exposes the `override` API to consumer of the container.

### `ContainerReferencePlugin` (low level)

This plugin adds specific references to containers as externals and allows to import remote modules from these containers. It also calls the `override` API of these containers to provide overrides to them. Local overrides (via `__webpack_override__` or `override` API when build is also a container) and specified overrides are provided to all referenced containers.

### `ModuleFederationPlugin` (high level)

This plugin combines `ContainerPlugin` and `ContainerReferencePlugin`. Overrides and overridables are combined into a single list of specified shared modules.

## Concept goals

- It should be possible to expose and use any module type that webpack supports.
- Chunk loading should load everything needed in parallel (web: single round-trip to server).
- Control from consumer to container
    - Overriding modules is a one-directional operation.
    - Sibling containers cannot override each other's modules.
- Concept should be environment-independent.
    - Usable in web, Node.js, etc.
- Relative and absolute request in shared:
    - Will always be provided, even if not used.
    - Will resolve relative to `config.context`.
    - Does not use a `requiredVersion` by default.
- Module requests in shared:
    - Are only provided when they are used.
    - Will match all used equal module requests in your build.
    - Will provide all matching modules.
    - Will extract `requiredVersion` from package.json at this position in the graph.
    - Could provide and consume multiple different version when you have nested node_modules.
- Module requests with trailing `/` in shared will match all module requests with this prefix.

## Use cases

### Separate builds per page

Each page of a Single Page Application is exposed from container build in a separate build. The application shell is also a separate build referencing all pages as remote modules. This way each page can be separately deployed. The application shell is deployed when routes are updated or new routes are added. The application shell defines commonly used libraries as shared modules to avoid duplication of them in the page builds.

### Components library as container

Many applications share a common components library which could be built as a container with each component exposed. Each application consumes components from the components library container. Changes to the components library can be separately deployed without the need to re-deploy all applications. The application automatically uses the up-to-date version of the components library.
