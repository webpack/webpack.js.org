---
title: Module Federation
contributors:
  - sokra
  - chenxsan
---

## Motivation

Multiple separate builds should form a single application. These separate builds should not have build dependencies between each other, so they can be developed and deployed individually.

This is often known as Micro-Frontends, but is not limited to that.

## Low-level concepts

We distinguish between local and remote modules. Local modules are normal modules which are part of the current build. Remote modules are modules that are not part of the current build and loaded from a so called container at runtime.

Loading remote modules is considered as async operation. When using a remote module these async operation will be placed in the next chunk loading operation(s) that is between the remote module and the entrypoint. It's not possible to use a remote module without a chunk loading operation.

A chunk loading operation is usually an `import()`, but older constructs like `require.ensure` or `require([...])` are possible as well.

A container is created through a container entry, which exposes async access to specified modules. The exposed access is separated into two steps:

1. loading the module (async)
2. evaluating the module (sync).

Step 1 will be done during chunk loading. Step 2 will be done during module evaluation interleaved with other (local and remote) modules. This way evaluation order is unaffected by converting a module from local to remote or the other way around.

Nesting container is possible. Containers can use modules from other containers. Circular dependencies between container are also possible.

### Overriding

A container is able to flag selected local modules as "overridable". A consumer of the container is able to provide "overrides", which are modules that replace one of the overridable module of the container. All modules of the container will use the replacement module instead of the local module when the consomer provides one. When the consumer doesn't provide a replacement module, all modules of the container will use the local one.

The container will organize overridable modules in a way that they do not need to be downloaded when they has been overriding by the consumer. This usually happens by placing them into separate chunks.

One the other hand the provider of the replacement modules will only provide async loading functions which allow the container to load replacement modules only when they are needed. The provider will organize replacement modules in a way that they do not need to be downloaded when they are not requested by the container at all. This usually happens by placing them into separate chunks.

A "name" is used to identify overridable modules from the container.

Overrides are provided in a similar way as the container exposes modules, separated into two steps:

1. Loading (async)
2. evaluating (sync).

In nested scenarios, where a container uses other containers to load modules from, is overriding a transitive operation. Providing overrides to one container will also override these modules in nested container. This means that using a container will automatically make all "names" of the overridable modules, part of the overriding interface of the parent container.

Overrides must be provided before modules of the container are loaded, otherwise behavior is undefined.

## High-level concepts

Each build acts as container and also consumes other build as containers. This way each build is able to access any other exposed module by loading it from its container.

Shared modules are modules that are both overridable and provided as overrides to nested container. They usually point to the same module in each build, e.g. the same library.

## Building blocks

### `OverridablesPlugin` (low level)

This plugin makes specified modules "overridable". A local API (`__webpack_override__`) allows to provide overrides.

### `ContainerPlugin` (low level)

This plugin creates an additional container entry with the specified exposed modules. It also uses the `OverridablesPlugin` internally and exposes the `override` API to consumer of the container.

### `ContainerReferencePlugin` (low level)

This plugin adds specified references to containers as externals and allows to import remote modules from these containers. It also calls the `override` API of these containers to provide overrides to them. Local overrides (via `__webpack_override__` or `override` API when build is also a container) plus specified overrides are provided to all referenced containers.

### `ModuleFederationPlugin` (high level)

This plugins combines `ContainerPlugin` and `ContainerReferencePlugin`. Overrides and overridables are combined into a single list of specified shared modules.

## Concept goals

- Any module type supported by webpack should be possible to expose and use.
- Chunk loading should load everything needed in parallel. (Web: single round-trip to server)
- Control from consumer to container
    - Overriding modules is a one-directional operation
    - Sibling containers cannot override each other's modules
- Concept should be environment-independent
    - Usable in web, node.js, etc.

## Use cases

### Separate builds per page

Each page of a Single Page Application is exposed from container build in a separate build. The application shell is also a separate build referencing all pages as remove modules. This way each page can be separately deployed. The application shell is deployed when routes are updated or new routes are added. The application shell defines commonly used libraries as shared modules to avoid duplication of them in the page builds.

### Components library as container

Many applications that share a common components library. This component library is build as container with each component exposed. Each application consumes components from the component library container.
Changes to the component library can be separately deployed without the need to re-deploy all applications. The application automatically use the up-to-date version of the component library.
