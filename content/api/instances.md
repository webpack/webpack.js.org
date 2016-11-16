---
title: Tapable Instances
contributors:
  - TheLarkInn
sort: 2
---

**Tapable Instances** are classes in the webpack source code which have been extended or mixed in from class `Tapable`. For more information on `Tapable` visit the [tapable repository](https://github.com/webpack/tapable) or visit the [plugins overview](./plugins#tapable)

## Compiler

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


## MultiCompiler

## Compilation

## ContextModuleFactory

## NormalModuleFactory

## DllModuleFactory

## MultiModuleFactory

## Resolver

## Template

## ChunkTemplate

## HotUpdateChunkTemplate

## MainTemplate

## ModuleTemplate

## Parser

