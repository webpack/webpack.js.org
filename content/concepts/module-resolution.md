---
title: Module Resolution
sort: 8
contributors:
    - pksjce
---

A resolver is a library which helps find the absolute path of a module.
A module can be required as a dependency from another module as

```js
import mymodule from 'path/to/module'
// or
require('path/to/module')
```

The dependency module can be from the application code or a third party library. The resolver helps
`webpack` find the module code that needs to be included in the bundle for every such `require()/import` statement.
`webpack` uses [enhanced-resolve](https://github.com/webpack/enhanced-resolve) to resolve file paths while bundling modules.

## Resolving rules in webpack

`webpack` resolves three kinds of file paths

### Absolute paths

```js
import "/home/me/file";
import "C:\\Users\\me\\file";
```

Since we already have the absolute path to the file, no further resolution is required.

### Relative paths

```js
import "../src/file";
import "./file";
```

In this case, the directory of the resource file is taken to be the context directory (the directory of the currently processed file). The given relative path is joined to the context path to produce the absolute path to the file.

### Module path

```js
import "module";
import "module/lib/file";
```

Modules are searched for inside directories which are specified using `resolve.modules`, which can be an array comprised of different paths.
Aliasing, i. e. setting `resolve.alias` to an existing module path, allows you to replace the module path with an alias name during `require/import`.

Once the path is resolved based on the above rule, the resolver checks if the path points to a file or to a directory. If the path points to a file then it is bundled straightaway.
But if the path points to a folder, then the following steps are taken to find the right file with the right extension.
* The right file is determined using the `main: "<filename>.js"` field in `package.json`.
* If there is no package.json or the main file is not found, `resolve.mainFiles` configuration option is looked up.
* If this also fails, then it looks for a file named `index` by default.
* `resolve.extensions` tells the resolver which extensions (eg - `.js, .jsx`) are acceptable for resolution.

## Resolving Loaders

This follows the same rules as the file resolver. But `resolveLoader` configuration can be used to have separate resolution rules for loaders.

## Caching

Every filesystem access is cached so that multiple parallel or serial requests to the same thing are merged. In watching mode only changed files are removed from cache (the watcher knows which files got changed). In non-watching mode the cache is purged before every compilation.

### Unsafe caching

There is a configuration option `resolve.unsafeCache` which boosts performance by aggressive caching. Every resolve process is cached and isn’t ever purged. This is correct in most cases, but incorrect in edge cases (what edge cases?).

Look at [Resolve API](/configuration/resolve) for more info on the configuration mentioned above.
