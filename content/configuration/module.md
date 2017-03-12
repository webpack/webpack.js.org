---
title: Module
sort: 6
contributors:
  - sokra
  - skipjack
  - jouni-kantola
  - jhnns
---

These options determine how the [different types of modules](/concepts/modules) within a project will be treated.

## `module.noParse`

`RegExp | [RegExp]`

Prevent webpack from parsing any files matching the given regular expression(s). Ignored files **should not** have calls to `import`, `require`, `define` or any other importing mechanism. This can boost build performance when ignoring large libraries.

```js
noParse: /jquery|lodash/
```

## `module.rules`

`array`

An array of [Rules](#rule) which are matched to requests when modules are created. These rules can modify how the module is created. They can apply loaders to the module, or modify the parser.


## Rule

A Rule can be separated into three parts — Conditions, Results and nested Rules.

### Rule conditions

There are two input values for the conditions:

1. The resource: An absolute path to the file requested. It's already resolved according the [`resolve` rules](/configuration/resolve).

2. The issuer: An absolute path to the file of the module which requested the resource. It's the location of the import.

**Example:** When we `import "./style.css"` from `app.js`, the resource is `/path/to/style.css` and the issuer is `/path/to/app.js`.

In a Rule the properties [`test`](#rule-test), [`include`](#rule-include), [`exclude`](#rule-exclude) and [`resource`](#rule-resource) are matched with the resource and the property [`issuer`](#rule-issuer) is matched with the issuer.

When using multiple conditions, all conditions must match.

W> Be careful! The resource is the _resolved_ path of the file, which means symlinked resources are the real path _not_ the symlink location. This is good to remember when using tools that symlink packages (like `npm link`), common conditions like `/node_modules/` may inadvertently miss symlinked files.

### Rule results

Rule results are used only when the Rule condition matches.

There are two output values of a Rule:

1. Applied loaders: An array of loaders applied to the resource.

2. Parser options: An options object which should be used to create the parser for this module.

These properties affect the loaders: [`loader`](#rule-loader), [`options`](#rule-options-rule-query), [`use`](#rule-use).

For compatibility also these properties: [`query`](#rule-options-rule-query), [`loaders`](#rule-loaders).

The [`enforce`](#rule-enforce) property affect the loader category. Whether it's an normal, pre- or post- loader.

The [`parser`](#rule-parser) property affect the parser options.


## Nested rules

Nested rules can be specified under the properties [`rules`](#rule-rules) and [`oneOf`](#rule-oneof). 

These rules are evaluated when the Rule condition matches.

## `Rule.enforce`

Possible values: `"pre" | "post"`

Specifies the category of the loader. No value means normal loader.

There is also an additional category "inlined loader" which are loaders applied inline of the import/require.

All loaders are sorted in the order `post, inline, normal, pre` and used in this order.

All normal loaders can be omitted (overridden) by prefixing `!` in the request.

All normal and pre loaders can be omitted (overridden) by prefixing `-!` in the request.

All normal, post and pre loaders can be omitted (overridden) by prefixing `!!` in the request.

Inline loaders and `!` prefixes should not be used as they are non-standard. They may be use by loader generated code.


## `Rule.exclude`

`Rule.exclude` is a shortcut to `Rule.resource.exclude`. See [`Rule.resource`](#rule-resource) and [`Condition.exclude`](#condition) for details.


## `Rule.include`

`Rule.include` is a shortcut to `Rule.resource.include`. See [`Rule.resource`](#rule-resource) and [`Condition.include`](#condition) for details.


## `Rule.issuer`

A [`Condition`](#condition) matched with the issuer. See details in [`Rule` conditions](#rule-conditions).


## `Rule.loader`

`Rule.loader` is a shortcut to `Rule.use: [ { loader } ]`. See [`Rule.use`](#rule-use) and [`UseEntry.loader`](#useentry) for details.


## `Rule.loaders`

`Rule.loaders` is an alias to `Rule.use`. See [`Rule.use`](#rule-use) for details.

It exists for compatibility reasons. Use `Rule.use` instead.


## `Rule.oneOf`

An array of [`Rules`](#rule) from which only the first matching Rule is used when the Rule matches.


## `Rule.options / Rule.query`

`Rule.options` and `Rule.query` are shortcuts to `Rule.use: [ { options } ]`. See [`Rule.use`](#rule-use) and [`UseEntry.options`](#useentry) for details.

`Rule.query` only exists for compatibility reasons. Use `Rule.options` instead.


## `Rule.parser`

An object with parser options. All applied parser options are merged.

For each different parser options object a new parser is created and plugins can apply plugins depending on the parser options. Many of the default plugins apply their parser plugins only if a property in the parser options is not set or true.

**Examples** (parser options by the default plugins):

``` js-with-links
parser: {
  amd: false, // disable AMD
  commonjs: false, // disable CommonJS
  system: false, // disable SystemJS
  harmony: false, // disable ES2015 Harmony import/export
  requireInclude: false, // disable require.include
  requireEnsure: false, // disable require.ensure
  requireContext: false, // disable require.context
  browserify: false, // disable special handling of Browserify bundles
  requireJs: false, // disable requirejs.*
  node: false, // disable __dirname, __filename, module, require.extensions, require.main, etc.
  node: {...} // reconfigure [node](/configuration/node) layer on module level
}
```


## `Rule.resource`

A [`Condition`](#condition) matched with the resource. See details in [`Rule` conditions](#rule-conditions).

## `Rule.resourceQuery`

A [`Condition`](#condition) matched with the resource query. The condition matches against a string that starts with a question mark (`"?exampleQuery"`). See details in [`Rule` conditions](#rule-conditions).

## `Rule.rules`

An array of [`Rules`](#rule) that is also used when the Rule matches.

## `Rule.test`

`Rule.test` is a shortcut to `Rule.resource.test`. See [`Rule.resource`](#rule-resource) and [`Condition.test`](#condition) for details.


## `Rule.use`

A list of [UseEntries](#useentry) which are applied to modules. Each entry specifies a loader to be used.

Passing a string (i.e. `use: [ "style-loader" ]`) is a shortcut to the loader property (i.e. `use: [ { loader: "style-loader "} ]`).

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

See [UseEntry](#useentry) for details.


## `Condition`

Conditions can be one of these:

* A string: To match the input must start with the provided string. I. e. an absolute directory path, or absolute path to the file.
* A RegExp: It's tested with the input.
* A function: It's called with the input and must return a truthy value to match.
* An array of Conditions: At least one of the Condition must match.
* A object: All properties must match. Each property has a defined behavior.

`{ test: Condition }`: The Condition must match. The convention is the provide a RegExp or array of RegExps here, but it's not enforced.

`{ include: Condition }`: The Condition must match. The convention is the provide a string or array of strings here, but it's not enforced.

`{ exclude: Condition }`: The Condition must NOT match. The convention is the provide a string or array of strings here, but it's not enforced.

`{ and: [Condition] }`: All Conditions must match.

`{ or: [Condition] }`: Any Condition must match.

`{ not: Condition }`: The Condition must NOT match.

**Example:**

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

It must have a `loader` property being a string. It is resolved relative to the configuration [`context`](/configuration/entry-context#context) with the loader resolving options ([resolveLoader](/configuration/resolve#resolveloader)).

It can have a `options` property being a string or object. This value is passed to the loader, which should interpret it as loader options.

For compatibility a `query` property is also possible, which is an alias for the `options` property. Use the `options` property instead.

**Example:**

``` js
{
  loader: "css-loader",
  options: {
    modules: true
  }
}
```

Note that webpack need to generate an unique module identifier from resource and all loaders including options. It tries to do this with a `JSON.stringify` of the options object. This is fine in 99.9%, but may be not unique if you apply the same loaders with different options to the same resource and the options have some stringified values. It also breaks if the options object cannot be stringified (i. e. circular JSON). Because of this you can have a `ident` property in the options object which is used as unique identifier.


## Module Contexts

(Deprecated)

These options describe the default settings for the context created when a dynamic dependency is encountered.

Example for an `unknown` dynamic dependency: `require`.

Example for an `expr` dynamic dependency: `require(expr)`.

Example for an `wrapped` dynamic dependency: `require("./templates/" + expr)`.

Here are the available options with their defaults:

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
}
```

Note: You can use the `ContextReplacementPlugin` to modify these values for individual dependencies. This also removes the warning.

A few use cases:

* Warn for dynamic dependencies: `wrappedContextCritical: true`.
* `require(expr)` should include the whole directory: `exprContextRegExp: /^\.\//`
* `require("./templates/" + expr)` should not include subdirectories by default: `wrappedContextRecursive: false`

