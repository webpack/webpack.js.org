---
title: Package exports
sort: 25
contributors:
  - sokra
related:
  - title: Package entry points in Node.js
    url: https://nodejs.org/api/packages.html#packages_package_entry_points
---

The `exports` field in the `package.json` of a package allows to declare
which module should be used when using module requests like `import "package"` or `import "package/sub/path"`.
It replaces the default implementation that returns `main` field resp. `index.js` files for `"package"` and
the file system lookup for `"package/sub/path"`.

When the `exports` field is specified, only these module requests are available.
Any other requests will lead to a ModuleNotFound Error.

## General syntax

In general the `exports` field should contain an object
where each properties specifies a sub path of the module request.
For the examples above the following properties could be used:
`"."` for `import "package"` and `"./sub/path"` for `import "package/sub/path"`.
Properties ending with a `/` will forward a request with this prefix to the old file system lookup algorithm.
For properties ending with `*`, `*` may take any value and any `*` in the property value is replaced with the taken value.

An example:

```json
{
  "exports": {
    ".": "./main.js",
    "./sub/path": "./secondary.js",
    "./prefix/": "./directory/",
    "./prefix/deep/": "./other-directory/",
    "./other-prefix/*": "./yet-another/*/*.js"
  }
}
```

| Module request                      | Result                                           |
| ----------------------------------- | ------------------------------------------------ |
| `package`                           | `.../package/main.js`                            |
| `package/sub/path`                  | `.../package/secondary.js`                       |
| `package/prefix/some/file.js`       | `.../package/directory/some/file.js`             |
| `package/prefix/deep/file.js`       | `.../package/other-directory/file.js`            |
| `package/other-prefix/deep/file.js` | `.../package/yet-another/deep/file/deep/file.js` |
| `package/main.js`                   | Error                                            |

## Alternatives

Instead of providing a single result, the package author may provide a list of results.
In such a scenario this list is tried in order and the first valid result will be used.

Note: Only the first valid result will be used, not all valid results.

Example:

```json
{
  "exports": {
    "./things/": ["./good-things/", "./bad-things/"]
  }
}
```

Here `package/things/apple` might be found in `.../package/good-things/apple` or in `.../package/bad-things/apple`.

## Conditional syntax

Instead of providing results directly in the `exports` field,
the package author may let the module system choose one based on conditions about the environment.

In this case an object mapping conditions to results should be used.
Conditions are tried in object order.
Conditions that contain invalid results are skipped.
Conditions might be nested to create a logical AND.
The last condition in the object might be the special `"default"` condition,
which is always matched.

Example:

```json
{
  "exports": {
    ".": {
      "red": "./stop.js",
      "yellow": "./stop.js",
      "green": {
        "free": "./drive.js",
        "default": "./wait.js"
      },
      "default": "./drive-carefully.js"
    }
  }
}
```

This translates to something like:

```js
if (red && valid('./stop.js')) return './stop.js';
if (yellow && valid('./stop.js')) return './stop.js';
if (green) {
  if (free && valid('./drive.js')) return './drive.js';
  if (valid('./wait.js')) return './wait.js';
}
if (valid('./drive-carefully.js')) return './drive-carefully.js';
throw new ModuleNotFoundError();
```

The available conditions vary depending on the module system and tool used.

## Abbreviation

When only a single entry (`"."`) into the package should be supported the `{ ".": ... }` object nesting can be omitted:

```json
{
  "exports": "./index.mjs"
}
```

```json
{
  "exports": {
    "red": "./stop.js",
    "green": "./drive.js"
  }
}
```

## Notes about ordering

In an object where each key is a condition, order of properties is significant. Conditions are handled in the order they are specified.

Example: `{ "red": "./stop.js", "green": "./drive.js" }` != `{ "green": "./drive.js", "red": "./stop.js" }` (when both `red` and `green` conditions are set, first property will be used)

In an object where each key is a subpath, order of properties (subpaths) is not significant. More specific paths are preferred over less specific ones.

Example: `{ "./a/": "./x/", "./a/b/": "./y/", "./a/b/c": "./z" }` == `{ "./a/b/c": "./z", "./a/b/": "./y/", "./a/": "./x/" }` (order will always be: `./a/b/c` > `./a/b/` > `./a/`)

`exports` field is preferred over other package entry fields like `main`, `module`, `browser` or custom ones.

## Support

| Feature                                | Supported by                                                                       |
| -------------------------------------- | ---------------------------------------------------------------------------------- |
| `"."` property                         | Node.js, webpack, rollup, esinstall, wmr                                           |
| normal property                        | Node.js, webpack, rollup, esinstall, wmr                                           |
| property ending with `/`               | Node.js<sup>(1)</sup>, webpack, rollup, esinstall<sup>(2)</sup>, wmr<sup>(3)</sup> |
| property ending with `*`               | Node.js, webpack, rollup, esinstall                                                |
| Alternatives                           | Node.js, webpack, rollup, <strike>esinstall</strike><sup>(4)</sup>                 |
| Abbreviation only path                 | Node.js, webpack, rollup, esinstall, wmr                                           |
| Abbreviation only conditions           | Node.js, webpack, rollup, esinstall, wmr                                           |
| Conditional syntax                     | Node.js, webpack, rollup, esinstall, wmr                                           |
| Nested conditional syntax              | Node.js, webpack, rollup, wmr<sup>(5)</sup>                                        |
| Conditions Order                       | Node.js, webpack, rollup, wmr<sup>(6)</sup>                                        |
| `"default"` condition                  | Node.js, webpack, rollup, esinstall, wmr                                           |
| Path Order                             | Node.js, webpack, rollup                                                           |
| Error when not mapped                  | Node.js, webpack, rollup, esinstall, wmr<sup>(7)</sup>                             |
| Error when mixing conditions and paths | Node.js, webpack, rollup                                                           |

(1) deprecated in Node.js, `*` should be preferred.

(2) `"./"` is intentionally ignored as key.

(3) The property value is ignored and property key is used as target. Effectively only allowing mappings with key and value are identical.

(4) The syntax is supported, but always the first entry is used, which makes it unusable for any practical use case.

(5) Fallback to alternative sibling parent conditions is handling incorrectly.

(6) For the `require` condition object order is handled incorrectly. This is intentionally as wmr doesn't differ between referencing syntax.

(7) When using `"exports": "./file.js"` abbreviation, any request e. g. `package/not-existing` will resolve to that. When not using the abbreviation, direct file access e. g. `package/file.js` will not lead to an error.

## Conditions

### Reference syntax

One of these conditions is set depending on the syntax used to reference the module:

| Condition | Description                                                       | Supported by                                                         |
| --------- | ----------------------------------------------------------------- | -------------------------------------------------------------------- |
| `import`  | Request is issued from ESM syntax or similar.                     | Node.js, webpack, rollup, esinstall<sup>(1)</sup>, wmr<sup>(1)</sup> |
| `require` | Request is issued from CommonJs/AMD syntax or similar.            | Node.js, webpack, rollup, esinstall<sup>(1)</sup>, wmr<sup>(1)</sup> |
| `style`   | Request is issued from a stylesheet reference.                    |
| `sass`    | Request is issued from a sass stylesheet reference.               |
| `asset`   | Request is issued from a asset reference.                         |
| `script`  | Request is issued from a normal script tag without module system. |

These conditions might also be set additionally:

| Condition   | Description                                                                                                       | Supported by         |
| ----------- | ----------------------------------------------------------------------------------------------------------------- | -------------------- |
| `module`    | All module syntax that allows to reference javascript supports ESM.<br>(only combined with `import` or `require`) | webpack, rollup, wmr |
| `esmodules` | Always set by supported tools.                                                                                    | wmr                  |
| `types`     | Request is issued from typescript that is interested in type declarations.                                        |

(1) `import` and `require` are both set independent of referencing syntax. `require` has always lower priority.

#### `import`

The following syntax will set the `import` condition:

- ESM `import` declarations in ESM
- JS `import()` expression
- HTML `<script type="module">` in HTML
- HTML `<link rel="preload/prefetch">` in HTML
- JS `new Worker(..., { type: "module" })`
- WASM `import` section
- ESM HMR (webpack) `import.hot.accept/decline([...])`
- JS `Worklet.addModule`
- Using javascript as entrypoint

#### `require`

The following syntax will set the `require` condition:

- CommonJs `require(...)`
- AMD `define()`
- AMD `require([...])`
- CommonJs `require.resolve()`
- CommonJs (webpack) `require.ensure([...])`
- CommonJs (webpack) `require.context`
- CommonJs HMR (webpack) `module.hot.accept/decline([...])`
- HTML `<script src="...">`

#### `style`

The following syntax will set the `style` condition:

- CSS `@import`
- HTML `<link rel="stylesheet">`

#### `asset`

The following syntax will set the `asset` condition:

- CSS `url()`
- ESM `new URL(..., import.meta.url)`
- HTML `<img src="...">`

#### `script`

The following syntax will set the `script` condition:

- HTML `<script src="...">`

`script` should only be set when no module system is supported.
When the script is preprocessed by a system supporting CommonJs
it should set `require` instead.

This condition should be used when looking for a javascript file that can be injected
as script tag in a HTML page without additional preprocessing.

### Optimizations

The following conditions are set for various optimizations:

| Condition     | Description                                                       | Supported by |
| ------------- | ----------------------------------------------------------------- | ------------ |
| `production`  | In a production environment.<br>No devtooling should be included. | webpack      |
| `development` | In a development environment.<br>Devtooling should be included.   | webpack      |

Note: Since `production` and `development` is not supported by everyone, no assumption should be made when none of these is set.

### Target environment

The following conditions are set depending on the target environment:

| Condition      | Description                                   | Supported by                        |
| -------------- | --------------------------------------------- | ----------------------------------- |
| `browser`      | Code will run in a browser.                   | webpack, esinstall, wmr             |
| `electron`     | Code will run in electron.<sup>(1)</sup>      | webpack                             |
| `worker`       | Code will run in a (Web)Worker.<sup>(1)</sup> | webpack                             |
| `worklet`      | Code will run in a Worklet.<sup>(1)</sup>     |                                     |
| `node`         | Code will run in Node.js.                     | Node.js, webpack, wmr<sup>(2)</sup> |
| `deno`         | Code will run in Deno.                        |                                     |
| `react-native` | Code will run in react-native.                |                                     |

(1) `electron`, `worker` and `worklet` comes combined with either `node` or `browser`, depending on the context.

(2) This is set for browser target environment.

Since there are multiple versions of each environment the following guidelines apply:

- `node`: See `engines` field for compatibility.
- `browser`: Compatible with current Spec and stage 4 proposals at time of publishing the package. Polyfilling resp. transpiling must be handled on consumer side.
  - Features that are not possible to polyfill or transpile should be used carefully as it limits the possible usage.
- `deno`: TBD
- `react-native`: TBD

### Conditions: Preprocessor and runtimes

The following conditions are set depending on which tool preprocesses the source code.

| Condition | Description           | Supported by |
| --------- | --------------------- | ------------ |
| `webpack` | Processed by webpack. | webpack      |

Sadly there is no `node-js` condition for Node.js as runtime.
This would simplify creating exceptions for Node.js.

### Conditions: Custom

The following tools support custom conditions:

| Tool      | Supported | Notes                                                                                                    |
| --------- | --------- | -------------------------------------------------------------------------------------------------------- |
| Node.js   | yes       | Use [`--conditions`](https://nodejs.org/api/cli.html#cli_c_condition_conditions_condition) CLI argument. |
| webpack   | yes       | Use [`resolve.conditionNames`](/configuration/resolve/#resolveconditionnames) configuration option.      |
| rollup    | yes       | Use `exportConditions` option for `@rollup/plugin-node-resolve`                                          |
| esinstall | no        |
| wmr       | no        |

For custom conditions the following naming schema is recommended:

`<company-name>:<condition-name>`

Examples: `example-corp:beta`, `google:internal`.

## Common patterns

All patterns are explained with a single `"."` entry into the package, but they can be extended from multiple entries too, by repeating the pattern for each entry.

These pattern should be used as guide not as strict ruleset.
They can be adapted to the individual packages.

These pattern are based on the following list of goals/assumptions:

- Packages are rotting.
  - We assume at some point packages are no longer being maintained, but they are continued to be used.
  - `exports` should be written to use fallbacks for unknown future cases. `default` condition can be used for that.
  - As the future is unknown we assume an environment similar to browsers and module system similar to ESM.
- Not all conditions are supported by every tool.
  - Fallbacks should be used to handled these cases.
  - We assume the following fallback make sense in general:
    - ESM > CommonJs
    - Production > Development
    - Browser > node.js

Depending on the package intention maybe something else makes sense and in this case the patterns should be adopted to that. Example: For a command line tool a browser-like future and fallback doesn't make a lot of sense, and in this case node.js-like environments and fallbacks should be used instead.

For complex use cases multiple patterns need to be combined by nesting these conditions.

### Target environment independent packages

These patterns make sense for packages that do not use environment specific APIs.

#### Providing only an ESM version

```json
{
  "type": "module",
  "exports": "./index.js"
}
```

Note: Providing only a ESM comes with restrictions for node.js.
Such a package would only work in Node.js >= 14 and only when using `import`.
It won't work with `require()`.

#### Providing CommonJs and ESM version (stateless)

```json
{
  "type": "module",
  "exports": {
    "node": {
      "module": "./index.js",
      "require": "./index.cjs"
    },
    "default": "./index.js"
  }
}
```

Most tools get the ESM version.
Node.js is an exception here.
It gets a CommonJs version when using `require()`.
This will lead to two instances of these package when referencing it with `require()` and `import`, but that doesn't hurt as the package doesn't have state.

The `module` condition is used as optimization when preprocessing node-targeted code with a tool that supports ESM for `require()` (like a bundler, when bundling for Node.js).
For such a tool the exception is skipped.
This is technically optional, but bundlers would include the package source code twice otherwise.

You can also use the stateless pattern if you are able to isolate your package state in JSON files.
JSON is consumable from CommonJs and ESM without polluting the graph with the other module system.

Note that here stateless also means class instances are not tested with `instanceof` as there can be two different classes because of the double module instantiation.

#### Providing CommonJs and ESM version (stateful)

```json
{
  "type": "module",
  "exports": {
    "node": {
      "module": "./index.js",
      "import": "./wrapper.js",
      "require": "./index.cjs"
    },
    "default": "./index.js"
  }
}
```

```js
// wrapper.js
import cjs from './index.cjs';

export const A = cjs.A;
export const B = cjs.B;
```

In a stateful package we must ensure that the package is never instantiated twice.

This isn't a problem for most tools, but Node.js is again an exception here.
For Node.js we always use the CommonJs version and expose named exports in the ESM with a ESM wrapper.

We use the `module` condition as optimization again.

#### Providing only a CommonJs version

```json
{
  "type": "commonjs",
  "exports": "./index.js"
}
```

Providing `"type": "commonjs"` helps to statically detect CommonJs files.

#### Providing a bundled script version for direct browser consumption

```json
{
  "type": "module",
  "exports": {
    "script": "./dist-bundle.js",
    "default": "./index.js"
  }
}
```

Note that despite using `"type": "module"` and `.js` for `dist-bundle.js` this file is not in ESM format.
It should use globals to allow direct consumption as script tag.

### Providing devtools or production optimizations

These patterns make sense when a package contains two versions, one for development and one for production.
E. g. the development version could include additional code for better error message or additional warnings.

#### Without Node.js runtime detection

```json
{
  "type": "module",
  "exports": {
    "development": "./index-with-devtools.js",
    "default": "./index-optimized.js"
  }
}
```

When the `development` condition is supported we use the version enhanced for development.
Otherwise, in production or when mode is unknown, we use the optimized version.

#### With Node.js runtime detection

```json
{
  "type": "module",
  "exports": {
    "development": "./index-with-devtools.js",
    "production": "./index-optimized.js",
    "node": "./wrapper-process-env.cjs",
    "default": "./index-optimized.js"
  }
}
```

```js
// wrapper-process-env.cjs
if (process.env.NODE_ENV !== 'development') {
  module.exports = require('./index-optimized.cjs');
} else {
  module.exports = require('./index-with-devtools.cjs');
}
```

We prefer static detection of production/development mode via the `production` or `development` condition.

Node.js allows to detection production/development mode at runtime via `process.env.NODE_ENV`, so we use that as fallback in Node.js. Sync conditional importing ESM is not possible and we don't want to load the package twice, so we have to use CommonJs for the runtime detection.

When it's not possible to detect mode we fallback to the production version.

### Providing different versions depending on target environment

A fallback environment should be chosen that makes sense for the package to support future environments.
In general a browser-like environment should be assumed.

#### Providing Node.js, WebWorker and browser versions

```json
{
  "type": "module",
  "exports": {
    "node": "./index-node.js",
    "worker": "./index-worker.js",
    "default": "./index.js"
  }
}
```

#### Providing Node.js, browser and electron versions

```json
{
  "type": "module",
  "exports": {
    "electron": {
      "node": "./index-electron-node.js",
      "default": "./index-electron.js"
    },
    "node": "./index-node.js",
    "default": "./index.js"
  }
}
```

### Combining patterns

#### Example 1

This is an example for a package that has optimizations for production and development usage with runtime detection for `process.env` and also ships a CommonJs and ESM version

```json
{
  "type": "module",
  "exports": {
    "node": {
      "development": {
        "module": "./index-with-devtools.js",
        "import": "./wrapper-with-devtools.js",
        "require": "./index-with-devtools.cjs"
      },
      "production": {
        "module": "./index-optimized.js",
        "import": "./wrapper-optimized.js",
        "require": "./index-optimized.cjs"
      },
      "default": "./wrapper-process-env.cjs"
    },
    "development": "./index-with-devtools.js",
    "production": "./index-optimized.js",
    "default": "./index-optimized.js"
  }
}
```

#### Example 2

This is an example for a package that supports Node.js, browser and electron, has optimizations for production and development usage with runtime detection for `process.env` and also ships a CommonJs and ESM version.

```json
{
  "type": "module",
  "exports": {
    "electron": {
      "node": {
        "development": {
          "module": "./index-electron-node-with-devtools.js",
          "import": "./wrapper-electron-node-with-devtools.js",
          "require": "./index-electron-node-with-devtools.cjs"
        },
        "production": {
          "module": "./index-electron-node-optimized.js",
          "import": "./wrapper-electron-node-optimized.js",
          "require": "./index-electron-node-optimized.cjs"
        },
        "default": "./wrapper-electron-node-process-env.cjs"
      },
      "development": "./index-electron-with-devtools.js",
      "production": "./index-electron-optimized.js",
      "default": "./index-electron-optimized.js"
    },
    "node": {
      "development": {
        "module": "./index-node-with-devtools.js",
        "import": "./wrapper-node-with-devtools.js",
        "require": "./index-node-with-devtools.cjs"
      },
      "production": {
        "module": "./index-node-optimized.js",
        "import": "./wrapper-node-optimized.js",
        "require": "./index-node-optimized.cjs"
      },
      "default": "./wrapper-node-process-env.cjs"
    },
    "development": "./index-with-devtools.js",
    "production": "./index-optimized.js",
    "default": "./index-optimized.js"
  }
}
```

Looks complex, yes. We were already able to reduce some complexity due to a assumption we can make: Only `node` need a CommonJs version and can detect production/development with `process.env`.

## Guidelines

- Avoid the `default` export. It's handled differently between tooling. Only use named exports.
- Never provide different APIs or semantics for different conditions.
- Write your source code as ESM and transpile to CJS via babel, typescript or similar tools.
- Either use `.cjs` or `type: "commonjs"` in package.json to clearly mark source code as CommonJs. This makes it statically detectable for tools if CommonJs or ESM is used. This is important for tools that only support ESM and no CommonJs.
- ESM used in packages support the following types of requests:
  - module requests are supported, pointing to other packages with a package.json.
  - relative requests are supported, pointing to other files within the package.
    - They must not point to files outside of the package.
  - `data:` url requests are supported.
  - other absolute or server-relative requests are not supported by default, but they might be supported by some tools or environments.
