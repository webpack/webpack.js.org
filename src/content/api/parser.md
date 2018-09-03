---
title: Parser
group: Plugins
sort: 4
contributors:
  - byzyk
  - DeTeam
---

The `parser` instance, found in the `compiler`, is used to parse each module
being processed by webpack. The `parser` is yet another webpack class that
extends `tapable` and provides a variety of `tapable` hooks that can be used by
plugin authors to customize the parsing process.

The `parser` is found within [module factories](/api/compiler-hooks/#normalmodulefactory) and therefore takes little
more work to access:

``` js
compiler.hooks.normalModuleFactory.tap('MyPlugin', factory => {
  factory.hooks.parser.for('javascript/auto').tap('MyPlugin', (parser, options) => {
    parser.hooks.someHook.tap(/* ... */);
  });
});
```

As with the `compiler`, `tapAsync` and `tapPromise` may also be available
depending on the type of hook.


## Hooks

The following lifecycle hooks are exposed by the `parser` and can be accessed
as such:


### evaluateTypeof

`SyncBailHook`

Evaluate the type of an identifier.

Parameters: `expression`


### evaluate

`SyncBailHook`

Evaluate an expression.

Parameters: `expression`


### evaluateIdentifier

`SyncBailHook`

Evaluate an identifier that is a free variable.

Parameters: `expression`


### evaluateDefinedIdentifier

`SyncBailHook`

Evaluate an identifier that is a defined variable.

Parameters: `expression`


### evaluateCallExpressionMember

`SyncBailHook`

Evaluate a call to a member function of a successfully evaluated expression.

Parameters: `expression` `param`


### statement

`SyncBailHook`

General purpose hook that is called when parsing statements in a code fragment.

Parameters: `statement`


### statementIf

`SyncBailHook`

...

Parameters: `statement`


### label

`SyncBailHook`

...

Parameters: `statement`


### import

`SyncBailHook`

...

Parameters: `statement` `source`


### importSpecifier

`SyncBailHook`

...

Parameters: `statement` `source` `exportName` `identifierName`


### export

`SyncBailHook`

...

Parameters: `statement`


### exportImport

`SyncBailHook`

...

Parameters: `statement` `source`


### exportDeclaration

`SyncBailHook`

...

Parameters: `statement` `declaration`


### exportExpression

`SyncBailHook`

...

Parameters: `statement` `declaration`


### exportSpecifier

`SyncBailHook`

...

Parameters: `statement` `identifierName` `exportName` `index`


### exportImportSpecifier

`SyncBailHook`

...

Parameters: `statement` `source` `identifierName` `exportName` `index`


### varDeclaration

`SyncBailHook`

...

Parameters: `declaration`


### varDeclarationLet

`SyncBailHook`

...

Parameters: `declaration`


### varDeclarationConst

`SyncBailHook`

...

Parameters: `declaration`


### varDeclarationVar

`SyncBailHook`

...

Parameters: `declaration`


### canRename

`SyncBailHook`

...

Parameters: `initExpression`


### rename

`SyncBailHook`

...

Parameters: `initExpression`


### assigned

`SyncBailHook`

...

Parameters: `expression`


### assign

`SyncBailHook`

...

Parameters: `expression`


### typeof

`SyncBailHook`

...

Parameters: `expression`


### call

`SyncBailHook`

...

Parameters: `expression`


### callAnyMember

`SyncBailHook`

...

Parameters: `expression`


### new

`SyncBailHook`

...

Parameters: `expression`


### expression

`SyncBailHook`

...

Parameters: `expression`


### expressionAnyMember

`SyncBailHook`

...

Parameters: `expression`


### expressionConditionalOperator

`SyncBailHook`

...

Parameters: `expression`


### program

`SyncBailHook`

Get access to the abstract syntax tree (AST) of a code fragment

Parameters: `ast` `comments`
