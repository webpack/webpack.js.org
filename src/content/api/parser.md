---
title: Parser
group: Plugins
sort: 8
---

parser 实例对象接收一个字符串以及回调函数，并在匹配时返回一个表达式。

```javascript
compiler.parser.plugin("var rewire", function (expr) {
    //如果原始模块包含 "var rewire"
    //将得到一个表达式对象的句柄
    return true;
});
```

## `program(ast)` bailing

代码片段中 AST 的通用插件接口。

## `statement(statement: Statement)` bailing

代码片段中 statements 的通用插件接口。

## `call <identifier>(expr: Expression)` bailing

`abc(1)` => `call abc`

`a.b.c(1)` => `call a.b.c`

## `expression <identifier>(expr: Expression)` bailing

`abc` => `expression abc`

`a.b.c` => `expression a.b.c`

## `expression ?:(expr: Expression)` bailing

`(abc ? 1 : 2)` => `expression ?!`

返回一个布尔值以忽略对错误路径的解析。

## `typeof <identifier>(expr: Expression)` bailing

`typeof a.b.c` => `typeof a.b.c`

## `statement if(statement: Statement)` bailing

`if(abc) {}` => `statement if`

返回一个布尔值以省略对错误路径的解析。

## `label <labelname>(statement: Statement)` bailing

`xyz: abc` => `label xyz`

## `var <name>(statement: Statement)` bailing

`var abc, def` => `var abc` + `var def`

返回 `false`，变量不会添加到已知的定义中。

## `evaluate <expression type>(expr: Expression)` bailing

对表达式求值。

## `evaluate typeof <identifier>(expr: Expression)` bailing

对标识符的类型求值。

## `evaluate Identifier <identifier>(expr: Expression)` bailing

对一个自由变量的标识符求值。

## `evaluate defined Identifier <identifier>(expr: Expression)` bailing

对一个已定义变量的标识符求值。

## `evaluate CallExpression .<property>(expr: Expression)` bailing

对成功鉴定的表达式的成员函数的调用求值。

***

> 原文：https://webpack.js.org/api/plugins/parser/
