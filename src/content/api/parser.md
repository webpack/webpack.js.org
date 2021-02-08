---
title: JavascriptParser Hooks
group: Plugins
sort: 12
contributors:
  - byzyk
  - DeTeam
  - misterdev
  - EugeneHlushko
  - chenxsan
---

`parser` 实例，在 `compiler` 中被发现，是用来解析由 webpack
处理过的每个模块。`parser` 也是扩展自 `tapable` 的 webpack 类
并且提供多种 `tapable` 钩子，

以下示例中，`parser` 位于 [NormalModuleFactory](/api/compiler-hooks/#normalmodulefactory) 中，因此需要调用额外钩子
来进行获取：

```js
compiler.hooks.normalModuleFactory.tap('MyPlugin', (factory) => {
  factory.hooks.parser
    .for('javascript/auto')
    .tap('MyPlugin', (parser, options) => {
      parser.hooks.someHook.tap(/* ... */);
    });
});
```

和 `compiler` 用法相同，取决于不同的钩子类型，
也可以在某些钩子上访问 `tapAsync` 和 `tapPromise`。

<<<<<<< HEAD

## 钩子 {#hooks}
=======
## Hooks
>>>>>>> 2a79b6b70d9af5bbff0bb3f044dcb2d575090ce5

以下生命周期钩子函数，是由 `parser` 暴露，可以通过
如下方式访问：

<<<<<<< HEAD

### evaluateTypeof {#evaluatetypeof}
=======
### evaluateTypeof
>>>>>>> 2a79b6b70d9af5bbff0bb3f044dcb2d575090ce5

`SyncBailHook`

Triggered when evaluating an expression consisting in a `typeof` of a free variable

- Hook Parameters: `identifier`
- Callback Parameters: `expression`

```js
parser.hooks.evaluateTypeof
  .for('myIdentifier')
  .tap('MyPlugin', (expression) => {
    /* ... */
    return expressionResult;
  });
```

这会触发 `evaluateTypeof` 钩子的调用：

```js
const a = typeof myIdentifier;
```

This won't trigger:

```js
const myIdentifier = 0;
const b = typeof myIdentifier;
```

<<<<<<< HEAD

### evaluate {#evaluate}
=======
### evaluate
>>>>>>> 2a79b6b70d9af5bbff0bb3f044dcb2d575090ce5

`SyncBailHook`

Called when evaluating an expression.

- Hook parameters: `expressionType`
- Callback parameters: `expression`

For example:

**index.js**

```js
const a = new String();
```

**MyPlugin.js**

```js
parser.hooks.evaluate.for('NewExpression').tap('MyPlugin', (expression) => {
  /* ... */
  return expressionResult;
});
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

<<<<<<< HEAD

### evaluateIdentifier {#evaluateidentifier}
=======
### evaluateIdentifier
>>>>>>> 2a79b6b70d9af5bbff0bb3f044dcb2d575090ce5

`SyncBailHook`

Called when evaluating an identifier that is a free variable.

- Hook Parameters: `identifier`
- Callback Parameters: `expression`

<<<<<<< HEAD

### evaluateDefinedIdentifier {#evaluatedefinedidentifier}
=======
### evaluateDefinedIdentifier
>>>>>>> 2a79b6b70d9af5bbff0bb3f044dcb2d575090ce5

`SyncBailHook`

Called when evaluating an identifier that is a defined variable.

- Hook Parameters: `identifier`
- Callback Parameters: `expression`

<<<<<<< HEAD

### evaluateCallExpressionMember {#evaluatecallexpressionmember}
=======
### evaluateCallExpressionMember
>>>>>>> 2a79b6b70d9af5bbff0bb3f044dcb2d575090ce5

`SyncBailHook`

Called when evaluating a call to a member function of a successfully evaluated expression.

- Hook Parameters: `identifier`
- Callback Parameters: `expression` `param`

This expression will trigger the hook:

**index.js**

```js
const a = expression.myFunc();
```

**MyPlugin.js**

```js
parser.hooks.evaluateCallExpressionMember
  .for('myFunc')
  .tap('MyPlugin', (expression, param) => {
    /* ... */
    return expressionResult;
  });
```

<<<<<<< HEAD

### statement {#statement}
=======
### statement
>>>>>>> 2a79b6b70d9af5bbff0bb3f044dcb2d575090ce5

`SyncBailHook`

General purpose hook that is called for every parsed statement in a code fragment.

- Callback Parameters: `statement`

```js
parser.hooks.statement.tap('MyPlugin', (statement) => {
  /* ... */
});
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

<<<<<<< HEAD

### statementIf {#statementif}
=======
### statementIf
>>>>>>> 2a79b6b70d9af5bbff0bb3f044dcb2d575090ce5

`SyncBailHook`

Called when parsing an if statement. Same as the `statement` hook, but triggered only when `statement.type == 'IfStatement'`.

- Callback Parameters: `statement`

<<<<<<< HEAD

### label {#label}
=======
### label
>>>>>>> 2a79b6b70d9af5bbff0bb3f044dcb2d575090ce5

`SyncBailHook`

Called when parsing statements with a [label](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/label). Those statements have `statement.type === 'LabeledStatement'`.

- Hook Parameters: `labelName`
- Callback Parameters: `statement`

<<<<<<< HEAD

### import {#import}
=======
### import
>>>>>>> 2a79b6b70d9af5bbff0bb3f044dcb2d575090ce5

`SyncBailHook`

Called for every import statement in a code fragment. The `source` parameter contains the name of the imported file.

- Callback Parameters: `statement` `source`

The following import statement will trigger the hook once:

**index.js**

```js
import _ from 'lodash';
```

**MyPlugin.js**

```js
parser.hooks.import.tap('MyPlugin', (statement, source) => {
  // source == 'lodash'
});
```

<<<<<<< HEAD

### importSpecifier {#importspecifier}
=======
### importSpecifier
>>>>>>> 2a79b6b70d9af5bbff0bb3f044dcb2d575090ce5

`SyncBailHook`

Called for every specifier of every `import` statement.

- Callback Parameters: `statement` `source` `exportName` `identifierName`

The following import statement will trigger the hook twice:

**index.js**

```js
import _, { has } from 'lodash';
```

**MyPlugin.js**

```js
parser.hooks.importSpecifier.tap(
  'MyPlugin',
  (statement, source, exportName, identifierName) => {
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
  }
);
```

<<<<<<< HEAD

### export {#export}
=======
### export
>>>>>>> 2a79b6b70d9af5bbff0bb3f044dcb2d575090ce5

`SyncBailHook`

Called for every `export` statement in a code fragment.

- Callback Parameters: `statement`

<<<<<<< HEAD

### exportImport {#exportimport}
=======
### exportImport
>>>>>>> 2a79b6b70d9af5bbff0bb3f044dcb2d575090ce5

`SyncBailHook`

Called for every `export`-import statement eg: `export * from 'otherModule';`.

- Callback Parameters: `statement` `source`

<<<<<<< HEAD

### exportDeclaration {#exportdeclaration}
=======
### exportDeclaration
>>>>>>> 2a79b6b70d9af5bbff0bb3f044dcb2d575090ce5

`SyncBailHook`

Called for every `export` statement exporting a declaration.

- Callback Parameters: `statement` `declaration`

Those exports will trigger this hook:

```js
export const myVar = 'hello'; // also var, let
export function FunctionName() {}
export class ClassName {}
```

<<<<<<< HEAD

### exportExpression {#exportexpression}
=======
### exportExpression
>>>>>>> 2a79b6b70d9af5bbff0bb3f044dcb2d575090ce5

`SyncBailHook`

Called for every `export` statement exporting an expression e.g.`export default expression;`.

- Callback Parameters: `statement` `declaration`

<<<<<<< HEAD

### exportSpecifier {#exportspecifier}
=======
### exportSpecifier
>>>>>>> 2a79b6b70d9af5bbff0bb3f044dcb2d575090ce5

`SyncBailHook`

Called for every specifier of every `export` statement.

- Callback Parameters: `statement` `identifierName` `exportName` `index`

<<<<<<< HEAD

### exportImportSpecifier {#exportimportspecifier}
=======
### exportImportSpecifier
>>>>>>> 2a79b6b70d9af5bbff0bb3f044dcb2d575090ce5

`SyncBailHook`

Called for every specifier of every `export`-import statement.

- Callback Parameters: `statement` `source` `identifierName` `exportName` `index`

<<<<<<< HEAD

### varDeclaration {#vardeclaration}
=======
### varDeclaration
>>>>>>> 2a79b6b70d9af5bbff0bb3f044dcb2d575090ce5

`SyncBailHook`

Called when parsing a variable declaration.

- Callback Parameters: `declaration`

<<<<<<< HEAD

### varDeclarationLet {#vardeclarationlet}
=======
### varDeclarationLet
>>>>>>> 2a79b6b70d9af5bbff0bb3f044dcb2d575090ce5

`SyncBailHook`

Called when parsing a variable declaration defined using `let`

- Callback Parameters: `declaration`

<<<<<<< HEAD

### varDeclarationConst {#vardeclarationconst}
=======
### varDeclarationConst
>>>>>>> 2a79b6b70d9af5bbff0bb3f044dcb2d575090ce5

`SyncBailHook`

Called when parsing a variable declaration defined using `const`

- Callback Parameters: `declaration`

<<<<<<< HEAD

### varDeclarationVar {#vardeclarationvar}
=======
### varDeclarationVar
>>>>>>> 2a79b6b70d9af5bbff0bb3f044dcb2d575090ce5

`SyncBailHook`

Called when parsing a variable declaration defined using `var`

- Callback Parameters: `declaration`

<<<<<<< HEAD

### canRename {#canrename}
=======
### canRename
>>>>>>> 2a79b6b70d9af5bbff0bb3f044dcb2d575090ce5

`SyncBailHook`

Triggered before renaming an identifier to determine if the renaming is allowed. This is usually used together with the `rename` hook.

- Hook Parameters: `identifier`
- Callback Parameters: `expression`

```js
var a = b;

parser.hooks.canRename.for('b').tap('MyPlugin', (expression) => {
  // returning true allows renaming
  return true;
});
```

<<<<<<< HEAD

### rename {#rename}
=======
### rename
>>>>>>> 2a79b6b70d9af5bbff0bb3f044dcb2d575090ce5

`SyncBailHook`

Triggered when renaming to get the new identifier. This hook will be called only if `canRename` returns `true`.

- Hook Parameters: `identifier`
- Callback Parameters: `expression`

```js
var a = b;

parser.hooks.rename.for('b').tap('MyPlugin', (expression) => {});
```

<<<<<<< HEAD

### assigned {#assigned}
=======
### assigned
>>>>>>> 2a79b6b70d9af5bbff0bb3f044dcb2d575090ce5

`SyncBailHook`

Called when parsing an `AssignmentExpression` before parsing the assigned expression.

- Hook Parameters: `identifier`
- Callback Parameters: `expression`

```js
a += b;

parser.hooks.assigned.for('a').tap('MyPlugin', (expression) => {
  // this is called before parsing b
});
```

<<<<<<< HEAD

### assign {#assign}
=======
### assign
>>>>>>> 2a79b6b70d9af5bbff0bb3f044dcb2d575090ce5

`SyncBailHook`

Called when parsing an `AssignmentExpression` before parsing the assign expression.

- Hook Parameters: `identifier`
- Callback Parameters: `expression`

```js
a += b;

parser.hooks.assigned.for('a').tap('MyPlugin', (expression) => {
  // this is called before parsing a
});
```

<<<<<<< HEAD

### typeof {#typeof}
=======
### typeof
>>>>>>> 2a79b6b70d9af5bbff0bb3f044dcb2d575090ce5

`SyncBailHook`

Triggered when parsing the `typeof` of an identifier

- Hook Parameters: `identifier`
- Callback Parameters: `expression`

<<<<<<< HEAD

### call {#call}
=======
### call
>>>>>>> 2a79b6b70d9af5bbff0bb3f044dcb2d575090ce5

`SyncBailHook`

Called when parsing a function call.

- Hook Parameters: `identifier`
- Callback Parameters: `expression`

```js
eval(/* something */);

parser.hooks.call.for('eval').tap('MyPlugin', (expression) => {});
```

<<<<<<< HEAD

### callMemberChain {#callmemberchain}
=======
### callMemberChain
>>>>>>> 2a79b6b70d9af5bbff0bb3f044dcb2d575090ce5

`SyncBailHook`

Triggered when parsing a call to a member function of an object.

- Hook Parameters: `objectIdentifier`
- Callback Parameters: `expression, properties`

```js
myObj.anyFunc();

parser.hooks.callMemberChain
  .for('myObj')
  .tap('MyPlugin', (expression, properties) => {});
```

<<<<<<< HEAD

### new {#new}
=======
### new
>>>>>>> 2a79b6b70d9af5bbff0bb3f044dcb2d575090ce5

`SyncBailHook`

Invoked when parsing a `new` expression.

- Hook Parameters: `identifier`
- Callback Parameters: `expression`

```js
new MyClass();

parser.hooks.new.for('MyClass').tap('MyPlugin', (expression) => {});
```

<<<<<<< HEAD

### expression {#expression}
=======
### expression
>>>>>>> 2a79b6b70d9af5bbff0bb3f044dcb2d575090ce5

`SyncBailHook`

Called when parsing an expression.

- Hook Parameters: `identifier`
- Callback Parameters: `expression`

```js
const a = this;

parser.hooks.expression.for('this').tap('MyPlugin', (expression) => {});
```

### expressionConditionalOperator {#expressionconditionaloperator}

`SyncBailHook`

Called when parsing a `ConditionalExpression` e.g. `condition ? a : b`

- Callback Parameters: `expression`

<<<<<<< HEAD

### program {#program}
=======
### program
>>>>>>> 2a79b6b70d9af5bbff0bb3f044dcb2d575090ce5

`SyncBailHook`

Get access to the abstract syntax tree (AST) of a code fragment

- Parameters: `ast` `comments`
