---
title: Parser
group: Plugins
sort: 4
contributors:
  - byzyk
  - DeTeam
  - MisterDev
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

Triggered when evaluating the `typeof` of an identifier.

Parameters: `expression`

```js
parser.hooks.evaluateTypeof.for('identifier').tap('MyPlugin', expression => {
  /* ... */
  return expressionResult;
});
```


### evaluate

`SyncBailHook`

Called when evaluating an expression, requires an expression type.

Parameters: `expression`

```js
parser.hooks.evaluate.for(/* expression type */).tap(/* ... */);
```

Where the expressions types are:

- `'ArrowFunctionExpression'`
- `'AssignmentExpression'`
- `'AwaitExpression'`
- `'BinaryExpression'`
- `'CallExpression'`
- `'ClassExpression'`
- `'ConditionalExpression'`
- `'FunctionExpression'`
- `'Identifier'`
- `'LogicalExpression'`
- `'MemberExpression'`
- `'NewExpression'`
- `'ObjectExpression'`
- `'SequenceExpression'`
- `'SpreadElement'`
- `'TaggedTemplateExpression'`
- `'TemplateLiteral'`
- `'ThisExpression'`
- `'UnaryExpression'`
- `'UpdateExpression'`



### evaluateIdentifier

`SyncBailHook`

Evaluate an identifier that is a free variable, requires an identifier.

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

General purpose hook that is called for every parsed statement in a code fragment.

Parameters: `statement`

```js
parser.hooks.statement.tap('MyPlugin', statement => { /* ... */ });
```

Where the `statement.type` could be:

- `'BlockStatement'`
- `'VariableDeclaration'`
- `'FunctionDeclaration'`
- `'ReturnStatement'`
- `'ClassDeclaration'`
- `'ExpressionStatement'`
- `'ImportDeclaration'`
- `'ExportAllDeclaration'`
- `'ExportDefaultDeclaration'`
- `'ExportNamedDeclaration'`
- `'IfStatement'`
- `'SwitchStatement'`
- `'ForInStatement'`
- `'ForOfStatement'`
- `'ForStatement'`
- `'WhileStatement'`
- `'DoWhileStatement'`
- `'ThrowStatement'`
- `'TryStatement'`
- `'LabeledStatement'`
- `'WithStatement'`


### statementIf

`SyncBailHook`

Called when parsing an if statement. It's the same as the `statement` hook, but is triggered only when `statement.type == 'IfStatement'`

Parameters: `statement`


### label

`SyncBailHook`

Called when parsing statement with a [label](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/label).
It requires a `label` and is triggered for statements having `statement.type === 'LabeledStatement'`.

Parameters: `statement`


### import

`SyncBailHook`

Called for every import statement in a code fragment. The `source` parameter contains the name of the imported file

Parameters: `statement` `source`

```js
import _ from 'lodash';

// MyPlugin.js
parser.hooks.import.tap('MyPlugin', (statement, source) => {
  /* source == 'lodash' */
});
```


### importSpecifier

`SyncBailHook`

Called for every specifier of every `import` statement.

Parameters: `statement` `source` `exportName` `identifierName`

```js
import _, { has } from 'lodash';

// MyPlugin.js
parser.hooks.import.tap('MyPlugin', (statement, source, exportName, identifierName) => {
  /* First call
    source == 'lodash'
    exportName == 'default'
    identifierName == '_'
  */
  /* Second call
    source == 'lodash'
    exportName == 'has'
    identifierName == 'has'
  */
});
```


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

Called when parsing a variable declaration.

Parameters: `declaration`


### varDeclarationLet

`SyncBailHook`

Called when parsing a variable declaration defined using `let`

Parameters: `declaration`


### varDeclarationConst

`SyncBailHook`

Called when parsing a variable declaration defined using `const`

Parameters: `declaration`


### varDeclarationVar

`SyncBailHook`

Called when parsing a variable declaration defined using `var`

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

Triggered when parsing the `typeof` of an identifier

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
