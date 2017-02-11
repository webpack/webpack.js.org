---
title: Plugin API
sort: 4
---

For a high-level introduction to writing plugins, start with [How to write a plugin](/development/how-to-write-a-plugin).

Many objects in webpack extend the Tapable class, which exposes a `plugin` method. And with the `plugin` method, plugins can inject custom build steps. You will see `compiler.plugin` and `compilation.plugin` used a lot. Essentially, each one of these plugin calls binds a callback to fire at specific steps throughout the build process.

A plugin is installed once as webpack starts up. webpack installs a plugin by calling its `apply` method, and passes a reference to the webpack `compiler` object. You may then call `compiler.plugin` to access asset compilations and their individual build steps. An example would look like this:

```javascript
// MyPlugin.js

function MyPlugin(options) {
  // Configure your plugin with options...
}

MyPlugin.prototype.apply = function(compiler) {
  compiler.plugin("compile", function(params) {
    console.log("The compiler is starting to compile...");
  });

  compiler.plugin("compilation", function(compilation) {
    console.log("The compiler is starting a new compilation...");

    compilation.plugin("optimize", function() {
      console.log("The compilation is starting to optimize files...");
    });
  });

  compiler.plugin("emit", function(compilation, callback) {
    console.log("The compilation is going to emit files...");
    callback();
  });
};

module.exports = MyPlugin;
```

Then in `webpack.config.js`

```javascript
    plugins: [
        new MyPlugin({options: 'nada'})
    ]
```

## Plugin Interfaces

There are two types of plugin interfaces.

* Timing based
  * sync (default): As seen above. Use return.
  * async: Last parameter is a callback. Signature: function(err, result)
  * parallel: The handlers are invoked parallel (async).

* Return value
  * not bailing (default): No return value.
  * bailing: The handlers are invoked in order until one handler returns something.
  * parallel bailing: The handlers are invoked in parallel (async). The first returned value (by order) is significant.
  * waterfall: Each handler gets the result value of the last handler as an argument.

## The `Compiler` instance

Plugins need to have the apply method on their prototype chain (or bound to) in order to have access to the compiler instance.

**MyPlugin.js**

```javascript
function MyPlugin() {};
MyPlugin.prototype.apply = function (compiler) {
    //now you have access to all the compiler instance methods
}
module.exports = MyPlugin;
```

Something like this should also work

**MyFunction.js**

```javascript
function apply(options, compiler) {
    //now you have access to the compiler instance
    //and options
}

//this little trick makes it easier to pass and check options to the plugin
module.exports = function(options) {
    if (options instanceof Array) {
        options = {
            include: options
        };
    }

    if (!Array.isArray(options.include)) {
        options.include = [ options.include ];
    }

    return {
        apply: apply.bind(this, options)
    };
};

```

### `run(compiler: Compiler)` async

The `run` method of the Compiler is used to start a compilation. This is not called in watch mode.

### `watch-run(watching: Watching)` async

The `watch` method of the Compiler is used to start a watching compilation. This is not called in normal mode.

### `compilation(c: Compilation, params: Object)`

A `Compilation` is created. A plugin can use this to obtain a reference to the `Compilation` object. The `params` object contains useful references.

### `normal-module-factory(nmf: NormalModuleFactory)`

A `NormalModuleFactory` is created. A plugin can use this to obtain a reference to the `NormalModuleFactory` object.

```javascript
compiler.plugin("normal-module-factory", function(nmf) {
    nmf.plugin("after-resolve", function(data) {
        data.loaders.unshift(path.join(__dirname, "postloader.js"));
    });
});
```

### `context-module-factory(cmf: ContextModuleFactory)`

A `ContextModuleFactory` is created. A plugin can use this to obtain a reference to the `ContextModuleFactory` object.

### `compile(params)`

The Compiler starts compiling. This is used in normal and watch mode. Plugins can use this point to modify the `params` object (i. e. to decorate the factories).

```javascript
compiler.plugin("compile", function(params) {
    //you are now in the "compile" phase
});
```

### `make(c: Compilation)` parallel

Plugins can use this point to add entries to the compilation or prefetch modules. They can do this by calling `addEntry(context, entry, name, callback)` or `prefetch(context, dependency, callback)` on the Compilation.

### `after-compile(c: Compilation)` async

The compile process is finished and the modules are sealed. The next step is to emit the generated stuff. Here modules can use the results in some cool ways.

The handlers are not copied to child compilers.

### `emit(c: Compilation)` async

The Compiler begins with emitting the generated assets. Here plugins have the last chance to add assets to the `c.assets` array.

### `after-emit(c: Compilation)` async

The Compiler has emitted all assets.

### `done(stats: Stats)`

All is done.

### `failed(err: Error)`

The Compiler is in watch mode and a compilation has failed hard.

### `invalid()`

The Compiler is in watch mode and a file change is detected. The compilation will be begin shortly (`options.watchDelay`).

### `after-plugins()`

All plugins extracted from the options object are added to the compiler.

### `after-resolvers()`

All plugins extracted from the options object are added to the resolvers.

## The `Compilation` instance

The Compilation instance extends from the compiler. I.e. compiler.compilation  It is the literal compilation of all the objects in the require graph. This object has access to all the modules and their dependencies (most of which are circular references). In the compilation phase, modules are loaded, sealed, optimized, chunked, hashed and restored, etc. This would be the main lifecycle of any operations of the compilation.

```javascript
compiler.plugin("compilation", function(compilation) {
    //the main compilation instance
    //all subsequent methods are derived from compilation.plugin
});
```

### `normal-module-loader`

The normal module loader, is the function that actually loads all the modules in the module graph (one-by-one).

```javascript
compilation.plugin('normal-module-loader', function(loaderContext, module) {
    //this is where all the modules are loaded
    //one by one, no dependencies are created yet
});
```

### `seal`

The sealing of the compilation has started.

```javascript
compilation.plugin('seal', function() {
    //you are not accepting any more modules
    //no arguments
});
```

### `optimize`

Optimize the compilation.

```javascript
compilation.plugin('optimize', function() {
    //webpack is begining the optimization phase
    // no arguments
});
```

### `optimize-tree(chunks, modules)` async

Async optimization of the tree.

```javascript
compilation.plugin('optimize-tree', function(chunks, modules) {

});
```

### `optimize-modules(modules: Module[])`

Optimize the modules.

```javascript
compilation.plugin('optimize-modules', function(modules) {
    //handle to the modules array during tree optimization
});
```

### `after-optimize-modules(modules: Module[])`

Optimizing the modules has finished.

### `optimize-chunks(chunks: Chunk[])`

Optimize the chunks.

```javascript
//optimize chunks may be run several times in a compilation

compilation.plugin('optimize-chunks', function(chunks) {
    //unless you specified multiple entries in your config
    //there's only one chunk at this point
    chunks.forEach(function (chunk) {
        //chunks have circular references to their modules
        chunk.modules.forEach(function (module){
            //module.loaders, module.rawRequest, module.dependencies, etc.
        });
    });
});
```

### `after-optimize-chunks(chunks: Chunk[])`

Optimizing the chunks has finished.

### `revive-modules(modules: Module[], records)`

Restore module info from records.

### `optimize-module-order(modules: Module[])`

Sort the modules in order of importance. The first is the most important module. It will get the smallest id.

### `optimize-module-ids(modules: Module[])`

Optimize the module ids.

### `after-optimize-module-ids(modules: Module[])`

Optimizing the module ids has finished.

### `record-modules(modules: Module[], records)`

Store module info to the records.

### `revive-chunks(chunks: Chunk[], records)`

Restore chunk info from records.

### `optimize-chunk-order(chunks: Chunk[])`

Sort the chunks in order of importance. The first is the most important chunk. It will get the smallest id.

### `optimize-chunk-ids(chunks: Chunk[])`

Optimize the chunk ids.

### `after-optimize-chunk-ids(chunks: Chunk[])`

Optimizing the chunk ids has finished.

### `record-chunks(chunks: Chunk[], records)`

Store chunk info to the records.

### `before-hash`

Before the compilation is hashed.

### `after-hash`

After the compilation is hashed.

### `before-chunk-assets`

Before creating the chunk assets.

### `additional-chunk-assets(chunks: Chunk[])`

Create additional assets for the chunks.

### `record(compilation, records)`

Store info about the compilation to the records

### `optimize-chunk-assets(chunks: Chunk[])` async

Optimize the assets for the chunks.

The assets are stored in `this.assets`, but not all of them are chunk assets. A `Chunk` has a property `files` which points to all files created by this chunk. The additional chunk assets are stored in `this.additionalChunkAssets`.

Here's an example that simply adds a banner to each chunk.

```javascript
compilation.plugin("optimize-chunk-assets", function(chunks, callback) {
    chunks.forEach(function(chunk) {
        chunk.files.forEach(function(file) {
            compilation.assets[file] = new ConcatSource("\/**Sweet Banner**\/", "\n", compilation.assets[file]);
        });
    });
    callback();
});
```

### `after-optimize-chunk-assets(chunks: Chunk[])`

The chunk assets have been optimized. Here's an example plugin from [@boopathi](https://github.com/boopathi) that outputs exactly what went into each chunk.

```javascript
var PrintChunksPlugin = function() {};
PrintChunksPlugin.prototype.apply = function(compiler) {
    compiler.plugin('compilation', function(compilation, params) {
        compilation.plugin('after-optimize-chunk-assets', function(chunks) {
            console.log(chunks.map(function(c) {
                return {
                    id: c.id,
                    name: c.name,
                    includes: c.modules.map(function(m) {
                        return m.request;
                    })
                };
            }));
        });
    });
};
```

### `optimize-assets(assets: Object{name: Source})` async

Optimize all assets.

The assets are stored in `this.assets`.

### `after-optimize-assets(assets: Object{name: Source})`

The assets has been optimized.

### `build-module(module)`

Before a module build has started.

```javascript
compilation.plugin('build-module', function(module){
    console.log('build module');
    console.log(module);
});
```

### `succeed-module(module)`

A module has been built successfully.

```javascript
compilation.plugin('succeed-module', function(module){
    console.log('succeed module');
    console.log(module);
});
```

### `failed-module(module)`

The module build has failed.

```javascript
compilation.plugin('failed-module', function(module){
    console.log('failed module');
    console.log(module);
});
```

### `module-asset(module, filename)`

An asset from a module was added to the compilation.

### `chunk-asset(chunk, filename)`

An asset from a chunk was added to the compilation.

## The `MainTemplate` instance

### `startup(source, module, hash)`
```javascript
    compilation.mainTemplate.plugin('startup', function(source, module, hash) {
      if (!module.chunks.length && source.indexOf('__ReactStyle__') === -1) {
        var originName = module.origins && module.origins.length ? module.origins[0].name : 'main';
        return ['if (typeof window !== "undefined") {',
            '  window.__ReactStyle__ = ' + JSON.stringify(classNames[originName]) + ';',
            '}'
          ].join('\n') + source;
      }
      return source;
    });
```

## The `Parser` instance (`compiler.parser`)

The parser instance takes a String and callback and will return an expression when there's a match.

```javascript
compiler.parser.plugin("var rewire", function (expr) {
    //if you original module has 'var rewire'
    //you now have a handle on the expresssion object
    return true;
});
```

### `program(ast)` bailing

General purpose plugin interface for the AST of a code fragment.

### `statement(statement: Statement)` bailing

General purpose plugin interface for the statements of the code fragment.

### `call <identifier>(expr: Expression)` bailing

`abc(1)` => `call abc`

`a.b.c(1)` => `call a.b.c`

### `expression <identifier>(expr: Expression)` bailing

`abc` => `expression abc`

`a.b.c` => `expression a.b.c`

### `expression ?:(expr: Expression)` bailing

`(abc ? 1 : 2)` => `expression ?!`

Return a boolean value to omit parsing of the wrong path.

### `typeof <identifier>(expr: Expression)` bailing

`typeof a.b.c` => `typeof a.b.c`

### `statement if(statement: Statement)` bailing

`if(abc) {}` => `statement if`

Return a boolean value to omit parsing of the wrong path.

### `label <labelname>(statement: Statement)` bailing

`xyz: abc` => `label xyz`

### `var <name>(statement: Statement)` bailing

`var abc, def` => `var abc` + `var def`

Return `false` to not add the variable to the known definitions.

### `evaluate <expression type>(expr: Expression)` bailing

Evaluate an expression.

### `evaluate typeof <identifier>(expr: Expression)` bailing

Evaluate the type of an identifier.

### `evaluate Identifier <identifier>(expr: Expression)` bailing

Evaluate a identifier that is a free var.

### `evaluate defined Identifier <identifier>(expr: Expression)` bailing

Evaluate a identifier that is a defined var.

### `evaluate CallExpression .<property>(expr: Expression)` bailing

Evaluate a call to a member function of a successfully evaluated expression.

# The `NormalModuleFactory`

### `before-resolve(data)` async waterfall

Before the factory starts resolving. The `data` object has these properties:

* `context` The absolute path of the directory for resolving.
* `request` The request of the expression.

Plugins are allowed to modify the object or to pass a new similar object to the callback.

### `after-resolve(data)` async waterfall

After the factory has resolved the request. The `data` object has these properties:

* `request` The resolved request. It acts as an identifier for the NormalModule.
* `userRequest` The request the user entered. It's resolved, but does not contain pre or post loaders.
* `rawRequest` The unresolved request.
* `loaders` A array of resolved loaders. This is passed to the NormalModule and they will be executed.
* `resource` The resource. It will be loaded by the NormalModule.
* `parser` The parser that will be used by the NormalModule.

# The `ContextModuleFactory`

### `before-resolve(data)` async waterfall

### `after-resolve(data)` async waterfall

### `alternatives(options: Array)` async waterfall

## Resolvers

* `compiler.resolvers.normal` Resolver for a normal module
* `compiler.resolvers.context` Resolver for a context module
* `compiler.resolvers.loader` Resolver for a loader

Any plugin should use `this.fileSystem` as fileSystem, as it's cached. It only has async named functions, but they may behave sync, if the user uses a sync file system implementation (i. e. in enhanced-require).

To join paths any plugin should use `this.join`. It normalizes the paths. There is a `this.normalize` too.

A bailing async forEach implementation is available on `this.forEachBail(array, iterator, callback)`.

To pass the request to other resolving plugins, use the `this.doResolve(types: String|String[], request: Request, callback)` or (`this.doResolve(types, request, message, callback)`) method. `types` are multiple possible request types that are tested in order of preference.

```javascript
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

### `resolve(context: String, request: String)`

Before the resolving process starts.

### `resolve-step(types: String[], request: Request)`

Before a single step in the resolving process starts.

### `module(request: Request)` async waterfall

A module request is found and should be resolved.

### `directory(request: Request)` async waterfall

A directory request is found and should be resolved.

### `file(request: Request)` async waterfall

A file request is found and should be resolved.

### The plugins may offer more extensions points

Here is a list what the default plugins in webpack offer. They are all `(request: Request)` async waterfall.

The process for normal modules and contexts is `module -> module-module -> directory -> file`.

The process for loaders is `module -> module-loader-module -> module-module -> directory -> file`.

### `module-module`

A module should be looked up in a specified directory. `path` contains the directory.

### `module-loader-module` (only for loaders)

Used before module templates are applied to the module name. The process continues with `module-module`.
