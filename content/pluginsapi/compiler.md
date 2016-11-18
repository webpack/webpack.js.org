---
title: Compiler
sort: 2
---

## Compiler

## Watching

## MultiCompiler

## Event Hooks

`environment()`

`after-environment()`

`before-run(compiler: Compiler, callback)`

`run(callback)`

`watch-run(watching: Watching, callback)`

`normal-module-factory(normalModuleFactory: NormalModuleFactory)`

`context-module-factory(contextModuleFactory: ContextModuleFactory)`

`compilation(compilation: Compilation, params: Object)`

`this-compilation(compilation: Compilation, params: Object)`

`after-plugins(compiler: Compiler)`

`after-resolvers(compiler: Compiler)`

`should-emit(compilation: Compilation)`

`emit(compilation: Compilation, callback)`    

`after-emit(compilation: Compilation, callback)`

`done(stats: Stats)`

`additional-pass(callback)`

`failed(err: Error)`

`invalid(fileName: string, changeTime)`

`entry-option(context, entry)`

## Examples