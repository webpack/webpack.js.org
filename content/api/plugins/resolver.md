---
title: Resolver
sort: 5
---

* `compiler.resolvers.normal` Resolver for a normal module
* `compiler.resolvers.context` Resolver for a context module
* `compiler.resolvers.loader` Resolver for a loader

Any plugin should use `this.fileSystem` as fileSystem, as it's cached. It only has async named functions, but they may behave sync, if the user uses a sync file system implementation (i. e. in enhanced-require).

To join paths any plugin should use `this.join`. It normalizes the paths. There is a `this.normalize` too.

A bailing async `forEach` implementation is available on `this.forEachBail(array, iterator, callback)`.

To pass the request to other resolving plugins, use the `this.doResolve(types: String|String[], request: Request, callback)` method. `types` are multiple possible request types that are tested in order of preference.

``` javascript
interface Request {
  path: String // The current directory of the request
  request: String // The current request string
  query: String // The query string of the request, if any
  module: boolean // The request begins with a module
  directory: boolean // The request points to a directory
  file: boolean // The request points to a file
  resolved: boolean // The request is resolved/done
  // undefined means false for boolean fields
}

// Examples
// from /home/user/project/file.js: require("../test?charset=ascii")
{
  path: "/home/user/project",
  request: "../test",
  query: "?charset=ascii"
}
// from /home/user/project/file.js: require("test/test/")
{
  path: "/home/user/project",
  request: "test/test/",
  module: true,
  directory: true
}
```

## `resolve(context: String, request: String)`

Before the resolving process starts.

## `resolve-step(types: String[], request: Request)`

Before a single step in the resolving process starts.

## `module(request: Request)` async waterfall

A module request is found and should be resolved.

## `directory(request: Request)` async waterfall

A directory request is found and should be resolved.

## `file(request: Request)` async waterfall

A file request is found and should be resolved.

## The plugins may offer more extensions points

Here is a list what the default plugins in webpack offer. They are all `(request: Request)` async waterfall.

The process for normal modules and contexts is `module -> module-module -> directory -> file`.

The process for loaders is `module -> module-loader-module -> module-module -> directory -> file`.

## `module-module`

A module should be looked up in a specified directory. `path` contains the directory.

## `module-loader-module` (only for loaders)

Used before module templates are applied to the module name. The process continues with `module-module`.
