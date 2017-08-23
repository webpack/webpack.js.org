---
title: Parser
sort: 8
---

The parser instance takes a String and callback and will return an expression when there's a match.

```javascript
compiler.parser.plugin("var rewire", function (expr) {
    //if you original module has 'var rewire'
    //you now have a handle on the expresssion object
    return true;
});
```

## `program(ast)` bailing

General purpose plugin interface for the AST of a code fragment.

## `statement(statement: Statement)` bailing

General purpose plugin interface for the statements of the code fragment.

## `call <identifier>(expr: Expression)` bailing

`abc(1)` => `call abc`

`a.b.c(1)` => `call a.b.c`

## `expression <identifier>(expr: Expression)` bailing

`abc` => `expression abc`

`a.b.c` => `expression a.b.c`

## `expression ?:(expr: Expression)` bailing

`(abc ? 1 : 2)` => `expression ?!`

Return a boolean value to omit parsing of the wrong path.

## `typeof <identifier>(expr: Expression)` bailing

`typeof a.b.c` => `typeof a.b.c`

## `statement if(statement: Statement)` bailing

`if(abc) {}` => `statement if`

Return a boolean value to omit parsing of the wrong path.

## `label <labelname>(statement: Statement)` bailing

`xyz: abc` => `label xyz`

## `var <name>(statement: Statement)` bailing

`var abc, def` => `var abc` + `var def`

Return `false` to not add the variable to the known definitions.

## `evaluate <expression type>(expr: Expression)` bailing

Evaluate an expression.

## `evaluate typeof <identifier>(expr: Expression)` bailing

Evaluate the type of an identifier.

## `evaluate Identifier <identifier>(expr: Expression)` bailing

Evaluate a identifier that is a free var.

## `evaluate defined Identifier <identifier>(expr: Expression)` bailing

Evaluate a identifier that is a defined var.

## `evaluate CallExpression .<property>(expr: Expression)` bailing

Evaluate a call to a member function of a successfully evaluated expression.
