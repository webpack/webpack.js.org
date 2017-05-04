---
title: 模块(Module)
sort: 6
contributors:
  - sokra
  - skipjack
  - jouni-kantola
  - jhnns
---

这些选项决定了如何处理项目中的[不同类型的模块](/concepts/modules)。


## `module.noParse`

`RegExp | [RegExp]`

防止 webpack 解析那些任何与给定正则表达式相匹配的文件。忽略的文件**不应该被** `import`, `require`, `define`  或者任何其他导入机制调用。忽略大型的 library 可以提高构建性能。

```js
noParse: /jquery|lodash/
```


## `module.rules`

`array`

创建模块时，匹配请求的[规则](#rule)数组。这些规则能够修改模块的创建方式。这些规则能够对模块(module)应用 loader，或者修改解析器(parser)。


## Rule

每个规则可以分为三部分 - 条件(condition)，结果(result)和嵌套规则(nested rule)。


### Rule 条件

条件有两种输入值：

1. resource：请求文件的绝对路径。它已经根据 [`resolve` 规则](/configuration/resolve)解析。

2. issuer: 被请求资源(requested the resource)的模块文件的绝对路径。是导入时的位置。

**例如:** 从 `app.js` `导入 "./style.css"`，resource 是 `/path/to/style.css`. issuer 是 `/path/to/app.js`。

在规则中，属性 [`test`](#rule-test), [`include`](#rule-include), [`exclude`](#rule-exclude) 和 [`resource`](#rule-resource) 对 resource 匹配，并且属性 [`issuer`](#rule-issuer) 对 issuer 匹配。

当使用多个条件时，所有条件都匹配。

W> 小心！resource 是文件的_解析_路径，这意味着符号链接的资源是真正的路径，_而不是_符号链接位置。在使用工具来符号链接包的时候（如 `npm link`）比较好记，像 `/node_modules/` 等常见条件可能会不小心错过符号链接的文件。


### Rule 结果

规则结果只在规则条件匹配时使用。

规则有两种输入值：

1. 应用的 loader：应用在 resource 上的 loader 数组。
2. Parser 选项：用于为模块创建解析器的选项对象。

这些属性会影响 loader：[`loader`](#rule-loader), [`options`](#rule-options-rule-query), [`use`](#rule-use)。

也兼容这些属性：[`query`](#rule-options-rule-query), [`loaders`](#rule-loaders)。

[`enforce`](#rule-enforce) 属性会影响 loader 种类。不论是普通的，前置的，后置的 loader。

[`parser`](#rule-parser) 属性会影响 parser 选项。


## 嵌套的 Rule

可以使用属性 [`rules`](#rule-rules) 和 [`oneOf`](#rule-oneof) 指定嵌套规则。

这些规则用于在规则条件(rule condition)匹配时进行取值。


## `Rule.enforce`

可能的值有：`"pre" | "post"`

指定 loader 种类。没有值表示是普通 loader。

还有一个额外的种类"行内 loader"，loader 被应用在 import/require 行内。

所有 loader 通过 `后置, 行内, 普通, 前置` 排序，并按此顺序使用。

所有普通 loader 可以通过在请求中加上 `!` 前缀来忽略（覆盖）。

所有普通和前置 loader 可以通过在请求中加上 `-!` 前缀来忽略（覆盖）。

所有普通，后置和前置 loader 可以通过在请求中加上 `!!` 前缀来忽略（覆盖）。

不应该使用行内 loader 和 `!` 前缀，因为它们是非标准的。它们可在由 loader 生成的代码中使用。


## `Rule.exclude`

`Rule.exclude` 是 `Rule.resource.exclude` 的简写。详细请查看 [`Rule.resource`](#rule-resource) 和 [`Condition.exclude`](#condition)。


## `Rule.include`

`Rule.include` 是 `Rule.resource.include` 的简写。详细请查看 [`Rule.resource`](#rule-resource) 和 [`Condition.include`](#condition)。


## `Rule.issuer`

[`条件`](#condition)会匹配 issuer。在 [`Rule` 条件](#rule-conditions) 中查看详细。


## `Rule.loader`

`Rule.loader` 是 `Rule.use: [ { loader } ]` 的简写。详细请查看 [`Rule.use`](#rule-use) 和 [`UseEntry.loader`](#useentry)。


## `Rule.loaders`

`Rule.loaders` 是 `Rule.use` 的别名。详细请查看 [`Rule.use`](#rule-use)。

由于兼容性原因而存在。请使用 `Rule.use` 代替。


## `Rule.oneOf`

[`规则`](#rule)数组，当规则匹配时，只使用第一个匹配规则。


## `Rule.options / Rule.query`

`Rule.options` 和 `Rule.query` 是 `Rule.use: [ { options } ]` 的简写。详细请查看 [`Rule.use`](#rule-use) 和 [`UseEntry.options`](#useentry)。

`Rule.query` 仅由于兼容性原因而存在。请使用 `Rule.options` 代替。


## `Rule.parser`

解析选项对象。所有应用的解析选项被合并。

为每个不同的解析器选项对象，创建新的解析器，并且插件可以应用在那些依赖解析器选项的插件。许多默认插件，仅在解析器选项属性未设置或为 true 时，应用解析器插件。

**示例**（默认的插件解析器选项）：

``` js-with-links
parser: {
  amd: false, // 禁用 AMD
  commonjs: false, // 禁用 CommonJS
  system: false, // 禁用 SystemJS
  harmony: false, // 禁用 ES2015 Harmony import/export
  requireInclude: false, // 禁用 require.include
  requireEnsure: false, // 禁用 require.ensure
  requireContext: false, // 禁用 require.context
  browserify: false, // 禁用特殊处理的 browserify bundle
  requireJs: false, // 禁用 requirejs.*
  node: false, // 禁用 __dirname, __filename, module, require.extensions, require.main 等。
  node: {...} // 在模块级别(module level)上重新配置 [node](/configuration/node) 层(layer)
}
```


## `Rule.resource`

[`条件`](#condition)会匹配 resource。在 [`Rule` 条件](#rule-conditions) 中查看详细。


## `Rule.resourceQuery`

A [`Condition`](#condition) matched with the resource query. The condition matches against a string that starts with a question mark (`"?exampleQuery"`). See details in [`Rule` conditions](#rule-conditions).


## `Rule.rules`

[`规则`](#rule)数组，当规则匹配时使用。


## `Rule.test`

`Rule.test` 是 `Rule.resource.test` 的简写。详细请查看 [`Rule.resource`](#rule-resource) 和 [`Condition.test`](#condition)。


## `Rule.use`

应用于模块的 [UseEntries](#useentry) 列表。每个入口(entry)指定使用一个 loader。

传递字符串（如：`use: [ "style-loader" ]`）是 loader 属性的简写方式（如：`use: [ { loader: "style-loader "} ]`）。

Loaders can be chained by passing multiple loaders, which will be applied from right to left (last to first configured).

```javascript
use: [
  {
    loader: 'style-loader'
  },
  {
    loader: 'css-loader',
    options: {
      importLoaders: 1
    }
  },
  {
    loader: 'less-loader',
    options: {
      noIeCompat: true
    }
  }
]
```

详细请查看 [UseEntry](#useentry)。


## `条件`

条件可以是这些之一：

* 字符串：匹配输入必须以提供的字符串开始。是的。目录绝对路径或文件绝对路径。
* 正则表达式：test 输入值。
* 函数：调用输入的函数，必须返回一个真值(truthy value)以匹配。
* 条件数组：至少一个匹配条件。
* 对象：匹配所有属性。每个属性都有一个定义行为。

`{ test: Condition }`：匹配特定条件。一般是提供一个正则表达式或正则表达式的数组，但这不是强制的。

`{ include: Condition }`：匹配特定条件。一般是提供一个字符串或者字符串数组，但这不是强制的。

`{ exclude: Condition }`：排除特定条件。一般是提供一个字符串或字符串数组，但这不是强制的。

`{ and: [Condition] }`：必须匹配数组中的所有条件

`{ or: [Condition] }`：匹配数组中任何一个条件

`{ not: [Condition] }`：必须排除这个条件

**示例:**

``` js
{
  test: /\.css$/,
  include: [
    path.resolve(__dirname, "app/styles"),
    path.resolve(__dirname, "vendor/styles")
  ]
}
```


## `UseEntry`

`object`

必须有一个 `loader` 属性是字符串。它使用 loader 解析选项（[resolveLoader](/configuration/resolve#resolveloader)），相对于配置中的 [`context`](/configuration/entry-context#context) 来解析。

可以有一个 `options` 属性为字符串或对象。值可以传递到 loader 中，将其理解为 loader 选项。

由于兼容性原因，也可能有 `query` 属性，它是 `options` 属性的别名。使用 `options` 属性替代。

**Example:**

``` js
{
  loader: "css-loader",
  options: {
    modules: true
  }
}
```

注意，webpack 需要生成资源和所有 loader 的独立模块标识，包括选项。它尝试对选项对象使用 `JSON.stringify`。这在 99.9% 的情况下是可以的，但是如果将相同的 loader 应用于相同资源的不同选项，并且选项具有一些带字符的值，则可能不是唯一的。

如果选项对象不被字符化（例如循环 JSON），它也会中断。因此，你可以在选项对象使用 `ident` 属性，作为唯一标识符。


## 模块上下文

（废弃）

这些选项描述了当遇到动态依赖时，创建上下文的默认设置。

例如，`未知的(unknown)` 动态依赖：`require`。

例如，`表达式(expr)` 动态依赖：`require(expr)`。

例如，`包裹的(wrapped)` 动态依赖：`require("./templates/" + expr)`。

以下是其[默认值](https://github.com/webpack/webpack/blob/master/lib/WebpackOptionsDefaulter.js)的可用选项

```js
module: {
  exprContextCritical: true,
  exprContextRecursive: true,
  exprContextRegExp: false,
  exprContextRequest: ".",
  unknownContextCritical: true,
  unknownContextRecursive: true,
  unknownContextRegExp: false,
  unknownContextRequest: ".",
  wrappedContextCritical: false
  wrappedContextRecursive: true,
  wrappedContextRegExp: /.*/,
  strictExportPresence: false // since webpack 2.3.0
}
```

注意：你可以使用 `ContextReplacementPlugin` 来修改这些单个依赖的值。这也会删除警告。

几个用例：

* 动态依赖的警告：`wrappedContextCritical: true`。
* `require(expr)` 应该包含整个目录：`exprContextRegExp: /^\.\//`
* `require("./templates/" + expr)` 不应该包含默认子目录：`wrappedContextRecursive: false`
* `strictExportPresence` makes missing exports an error instead of warning

***

> 原文：https://webpack.js.org/configuration/module/