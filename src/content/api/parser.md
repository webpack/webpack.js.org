---
title: parser
group: Plugins
sort: 4
---

`parser` 实例，是用来解析由 webpack 处理过的每个模块。`parser` 也是扩展自 `tapable` 的 webpack 类，并且提供多种 `tapable` 钩子，插件作者可以使用它来自定义解析过程。

以下示例中，`parser` 位于 [normalModuleFactory](/api/compiler-hooks/#normalmodulefactory) 这个中，因此需要调用额外钩子来进行获取：

``` js
compiler.hooks.normalModuleFactory.tap(factory => {
  factory.hooks.parser.tap((parser, options) => {
    parser.hooks.someHook.tap(...)
  })
})
```

和 `compiler` 用法相同，取决于不同的钩子类型，也可以在某些钩子上访问 `tapAsync` 和 `tapPromise`。


## 相关钩子

以下生命周期钩子函数，是由 `parser` 暴露，可以通过如下方式访问：


### evaluateTypeof

`SyncBailHook`

取值标识符(identifier)的类型。（译注：取值(evaluate)是一个动词，表示对参数进行求值并返回）

参数：`expression`


### evaluate

`SyncBailHook`

取值一个表达式(expression)

参数：`expression`


### evaluateIdentifier

`SyncBailHook`

取值一个自由变量标识符。

参数：`expression`


### evaluateDefinedIdentifier

`SyncBailHook`

取值一个定义变量标识符。

参数：`expression`


### evaluateCallExpressionMember

`SyncBailHook`

进行一次「成功取值表达式的成员函数(member function of a successfully evaluated expression)」调用取值。

参数：`expression` `param`


### statement

`SyncBailHook`

通用钩子，在从代码片段中解析语句时调用。

参数：`statement`


### statementIf

`SyncBailHook`

...

参数：`statement`


### label

`SyncBailHook`

...

参数：`statement`


### import

`SyncBailHook`

...

参数：`statement` `source`


### importSpecifier

`SyncBailHook`

...

参数：`statement` `source` `exportName` `identifierName`


### export

`SyncBailHook`

...

参数：`statement`


### exportImport

`SyncBailHook`

...

参数：`statement` `source`


### exportDeclaration

`SyncBailHook`

...

参数：`statement` `declaration`


### exportExpression

`SyncBailHook`

...

参数：`statement` `declaration`


### exportSpecifier

`SyncBailHook`

...

参数：`statement` `identifierName` `exportName` `index`


### exportImportSpecifier

`SyncBailHook`

...

参数：`statement` `source` `identifierName` `exportName` `index`


### varDeclaration

`SyncBailHook`

...

参数：`declaration`


### varDeclarationLet

`SyncBailHook`

...

参数：`declaration`


### varDeclarationConst

`SyncBailHook`

...

参数：`declaration`


### varDeclarationVar

`SyncBailHook`

...

参数：`declaration`


### canRename

`SyncBailHook`

...

参数：`initExpression`


### rename

`SyncBailHook`

...

参数：`initExpression`


### assigned

`SyncBailHook`

...

参数：`expression`


### assign

`SyncBailHook`

...

参数：`expression`


### typeof

`SyncBailHook`

...

参数：`expression`


### call

`SyncBailHook`

...

参数：`expression`


### callAnyMember

`SyncBailHook`

...

参数：`expression`


### new

`SyncBailHook`

...

参数：`expression`


### expression

`SyncBailHook`

...

参数：`expression`


### expressionAnyMember

`SyncBailHook`

...

参数：`expression`


### expressionConditionalOperator

`SyncBailHook`

...

参数：`expression`


### program

`SyncBailHook`

访问代码片段的抽象语法树(abstract syntax tree - AST)

参数：`ast` `comments`
