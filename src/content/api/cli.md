---
title: Command Line Interface
sort: 1
contributors:
  - anshumanv
  - rishabh3112
  - snitin315
  - evenstensberg
  - simon04
  - tbroadley
  - chenxsan
  - rencire
  - madhavarshney
  - EugeneHlushko
  - byzyk
  - wizardofhogwarts
  - EslamHiko
  - smelukov
  - anikethsaha
  - jamesgeorge007
related:
  - title: Analyzing Build Statistics
    url: https://survivejs.com/webpack/optimizing-build/analyzing-build-statistics/
  - title: Three simple ways to inspect a webpack bundle
    url: https://medium.com/@joeclever/three-simple-ways-to-inspect-a-webpack-bundle-7f6a8fe7195d#.7d2i06mjx
  - title: Optimising your application bundle size with webpack
    url: https://hackernoon.com/optimising-your-application-bundle-size-with-webpack-e85b00bab579#.5w5ko08pq
  - title: Analysing and minimising the size of client-side bundle with webpack and source-map-explorer
    url: https://medium.com/@nimgrg/analysing-and-minimising-the-size-of-client-side-bundle-with-webpack-and-source-map-explorer-41096559beca#.c3t2srr8x
---

For proper usage and easy distribution of this configuration, webpack can be configured with `webpack.config.js`. Any parameters sent to the CLI will map to a corresponding parameter in the configuration file.

Read the [installation guide](/guides/installation) if you don't already have webpack and CLI installed.

## Commands

webpack-cli offers a variety of commands to make working with webpack easy. By default webpack ships with

| Command                               | Usage                                     | Description                                                                     |
| ------------------------------------- | ----------------------------------------- | ------------------------------------------------------------------------------- |
| `build`                               | `build\|bundle\|b [entries...] [options]` | Run webpack (default command, can be omitted).                                  |
| [`configtest`](#configtest)           | `configtest\|t [config-path]`             | Validate a webpack configuration.                                               |
| [`help`](#help)                       | `help\|h [command] [option]`              | Display help for commands and options.                                          |
| [`info`](#info)                       | `info\|i [options]`                       | Outputs information about your system.                                          |
| [`init`](#init)                       | `init\|c [generation-path] [options]`     | Initialize a new webpack project.                                               |
| `loader`                              | `loader\|l [output-path]`                 | Scaffold a loader.                                                              |
| `plugin`                              | `plugin\|p [output-path]`                 | Scaffold a plugin.                                                              |
| [`serve`](/configuration/dev-server/) | `serve\|s [options]`                      | Run the `webpack-dev-server`.                                                   |
| [`version`](#version)                 | `version\|v [commands...]`                | Output the version number of `webpack`, `webpack-cli` and `webpack-dev-server`. |
| `watch`                               | `watch\|w [entries...] [options]`         | Run webpack and watch for files changes.                                        |

### Init

Used to initialize a new webpack project.

```bash
npx webpack init [generation-path] [options]
```

**example**

```bash
npx webpack init ./my-app --force --template=default
```

#### Generation Path

Location of where to generate the configuration. Defaults to `process.cwd()`.

#### Options

**`--template`**

`string = 'default'`

Name of template to generate.

**`--force`**

`boolean`

To generate a project without questions. When enabled, default answer for each question will be used.

### Info

Outputs information about your system.

```bash
npx webpack info [options]
```

**example**

```bash
npx webpack info --output=json
```

#### Options for info

**`--output`**

`string : 'json' | 'markdown'`

To get the output in a specified format.

### Configtest

Validate a webpack configuration.

```bash
npx webpack configtest [config-path]
```

**example**

```bash
npx webpack configtest ./webpack.config.js
```

#### Config Path

Path to your webpack configuration file. Defaults to `./webpack.config.js`.

## Flags

By default webpack ships with the following flags:

| Flag / Alias                        | Type            | Description                                                             |
| ----------------------------------- | --------------- | ----------------------------------------------------------------------- |
| [`--entry`](#entry)                 | string[]        | The entry point(s) of your application e.g. `./src/main.js`             |
| [`--config, -c`](#config)           | string[]        | Provide path to a webpack configuration file e.g. `./webpack.config.js` |
| [`--config-name`](#config-name)     | string[]        | Name of the configuration to use                                        |
| `--name`                            | string          | Name of the configuration. Used when loading multiple configurations    |
| `--color`                           | boolean         | Enable colors on console                                                |
| [`--merge, -m`](#merge)             | boolean         | Merge two or more configurations using `webpack-merge`                  |
| [`--env`](#env)                     | string[]        | Environment passed to the configuration when it is a function           |
| [`--node-env`](#node-env)           | string          | Set `process.env.NODE_ENV` to the specified value                       |
| [`--progress`](#progress)           | boolean, string | Print compilation progress during build                                 |
| [`--help`](#help)                   | boolean         | Outputs list of supported flags and commands                            |
| [`--output-path, -o`](#output-path) | string          | Output location of the file generated by webpack e.g. `./dist`          |
| `--target, -t`                      | string[]        | Sets the build target                                                   |
| `--watch, -w`                       | boolean         | Watch for file changes                                                  |
| `--watch-options-stdin`             | boolean         | Stop watching when stdin stream has ended                               |
| `--hot, -h`                         | boolean         | Enables Hot Module Replacement                                          |
| `--devtool, -d`                     | string          | Controls if and how source maps are generated.                          |
| `--prefetch`                        | string          | Prefetch this request                                                   |
| [`--json, -j`](#json)               | boolean, string | Prints result as JSON or store it in a file                             |
| `--mode`                            | string          | Defines the mode to pass to webpack                                     |
| [`--version, -v`](#version)         | boolean         | Get current version                                                     |
| `--stats`                           | boolean, string | It instructs webpack on how to treat the stats                          |
| [`--analyze`](#analyzing-bundle)    | boolean         | It invokes `webpack-bundle-analyzer` plugin to get bundle information   |

### Negated Flags

| Flag                       | Description                                                   |
| -------------------------- | ------------------------------------------------------------- |
| `--no-color`               | Disables any color on the console                             |
| `--no-hot`                 | Disables hot reloading if you have it enabled via your config |
| `--no-stats`               | Disables any compilation stats emitted by webpack             |
| `--no-watch`               | Do not watch for file changes                                 |
| `--no-devtool`             | Do not generate source maps                                   |
| `--no-watch-options-stdin` | Do not stop watching when stdin stream has ended              |

### Core Flags

Starting CLI v4 and webpack v5, CLI imports the entire configuration schema from webpack core to allow tuning almost every configuration option from the command line.

**Here's the list of all the core flags supported by webpack v5 with CLI v4 - [link](https://github.com/webpack/webpack-cli/blob/master/OPTIONS.md)**

For example if you want to enable performance hints in your project you'd use [this](https://webpack.js.org/configuration/performance/#performancehints) option in configuration, with core flags you can do -

```bash
npx webpack --performance-hints warning
```

## Usage

### With configuration file

```bash
npx webpack [--config webpack.config.js]
```

See [configuration](/configuration) for the options in the configuration file.

### Without configuration file

```bash
npx webpack --entry <entry> --output-path <output-path>
```

**example**

```bash
npx webpack --entry ./first.js --entry ./second.js --output-path /build
```

#### entry

A filename or a set of named filenames which act as the entry point to build your project. You can pass multiple entries (every entry is loaded on startup).
Following are the multiple ways of specifying entry file(s) via CLI -

```bash
npx webpack ./first-entry.js
```

```bash
npx webpack --entry ./first-entry.js
```

```bash
npx webpack ./first-entry.js ./other-entry.js
```

```bash
npx webpack --entry ./first-entry.js ./other-entry.js
```

T> Use `webpack [command] [entries...] [option]` syntax because some options can accept multiple values so `webpack --target node ./entry.js` means `target: ['node', './entry.js']`

#### output-path

A path for the bundled file to be saved in. It will be mapped to the configuration options `output.path`.

**Example**

If your project structure is as follows -

```bash
.
├── dist
├── index.html
└── src
    ├── index.js
    ├── index2.js
    └── others.js
```

```bash
npx webpack ./src/index.js --output-path dist
```

This will bundle your source code with entry as `index.js`, and the output bundle file will have a path of `dist`.

```bash
asset main.js 142 bytes [compared for emit] [minimized] (name: main)
./src/index.js 30 bytes [built] [code generated]
./src/others.js 1 bytes [built] [code generated]
webpack 5.1.0 compiled successfully in 187 ms
```

```bash
npx webpack ./src/index.js ./src/others2.js --output-path dist/
```

This will form the bundle with both the files as separate entry points.

```bash
asset main.js 142 bytes [compared for emit] [minimized] (name: main)
./src/index.js 30 bytes [built] [code generated]
./src/others2.js 1 bytes [built] [code generated]
./src/others.js 1 bytes [built] [code generated]
webpack 5.1.0 compiled successfully in 198 ms
```

## Default Configurations

CLI will look for some default configurations in the path of your project, here are the config files picked up by CLI.

This is the lookup priority in increasing order

> example - config file lookup will be in order of .webpack/webpackfile > .webpack/webpack.config.js > webpack.config.js

```txt
'webpack.config',
'.webpack/webpack.config',
'.webpack/webpackfile',
```

## Common Options

W> Note that Command Line Interface has a higher precedence for the arguments you use it with than your configuration file. For instance, if you pass [`--mode="production"`](/configuration/mode/#usage) to webpack CLI and your configuration file uses `development`, `production` will be used.

### help

**List basic commands and flags available on the cli**

Both `webpack help [command] [option]` and `webpack [command] --help` are valid to get help:

```bash
npx webpack --help

# or

npx webpack help
```

**List all supported commands and flags by cli**

```bash
npx webpack --help=verbose
```

**See help for a specific command or option**

```bash
npx webpack help --mode
```

### version

**Show version of installed packages and sub-packages**

To inspect the version of `webpack` and `webpack-cli` you are using just run command:

```bash
npx webpack --version

# or

npx webpack version
```

This will output the following result:

```bash
webpack 5.31.2
webpack-cli 4.6.0
```

It will output the version of `webpack-dev-server` as well if you have it installed:

```bash
webpack 5.31.2
webpack-cli 4.6.0
webpack-dev-server 3.11.2
```

To inspect the version of any `webpack-cli` sub-package (like `@webpack-cli/info`) just run command similar to the following:

```bash
npx webpack info --version
```

This will output the following result:

```bash
@webpack-cli/info 1.2.3
webpack 5.31.2
webpack-cli 4.6.0
webpack-dev-server 3.11.2
```

### config

**Build source using a configuration file**

Specify a different [configuration](/configuration) file other than `webpack.config.js`, which is one of the defaults.

```bash
npx webpack --config example.config.js
```

### config-name

In case your configuration file exports multiple configurations, you can use `--config-name` to specify which configuration to run.

Consider the following `webpack.config.js`:

```js
module.exports = [
  {
    output: {
      filename: './dist-first.js',
    },
    name: 'first',
    entry: './src/first.js',
    mode: 'development',
  },
  {
    output: {
      filename: './dist-second.js',
    },
    name: 'second',
    entry: './src/second.js',
    mode: 'development',
  },
  {
    output: {
      filename: './dist-third.js',
    },
    name: 'third',
    entry: './src/third.js',
    mode: 'none',
    stats: 'verbose',
  },
];
```

To run only the `second` configuration:

```bash
npx webpack --config-name second
```

You can also pass multiple values:

```bash
npx webpack --config-name first --config-name second
```

### merge

You can merge two or more different webpack configurations with the help of `--merge`:

```bash
npx webpack --config ./first.js --config ./second.js --merge
```

### json

**Print result of webpack as JSON**

```bash
npx webpack --json
```

**If you want to store stats as json instead of printing it, you can use -**

```bash
npx webpack --json stats.json
```

In every other case, webpack prints out a set of stats showing bundle, chunk and timing details. Using this option, the output can be a JSON object. This response is accepted by webpack's [analyse tool](https://webpack.github.io/analyse/), or chrisbateman's [webpack-visualizer](https://chrisbateman.github.io/webpack-visualizer/), or th0r's [webpack-bundle-analyzer](https://github.com/webpack-contrib/webpack-bundle-analyzer). The analyse tool will take in the JSON and provide all the details of the build in graphical form.

T> See the [stats data api](/api/stats) to read more about the stats generated here.

## Environment Options

When the webpack configuration [exports a function](/configuration/configuration-types/#exporting-a-function), an "environment" may be passed to it.

### env

```bash
npx webpack --env production    # env.production = true
```

The `--env` argument accepts multiple values:

| Invocation                                                       | Resulting environment                          |
| ---------------------------------------------------------------- | ---------------------------------------------- |
| `npx webpack --env prod`                                         | `{ prod: true }`                               |
| `npx webpack --env prod --env min`                               | `{ prod: true, min: true }`                    |
| `npx webpack --env platform=app --env production`                | `{ platform: "app", production: true }`        |
| `npx webpack --env foo=bar=app`                                  | `{ foo: "bar=app"}`                            |
| `npx webpack --env app.platform="staging" --env app.name="test"` | `{ app: { platform: "staging", name: "test" }` |

T> See the [environment variables](/guides/environment-variables/) guide for more information on its usage.

In addition to the customized `env` showed above, there are some built-in ones under `env` to be used inside your webpack configuration:

| Environment Variable | Description                                  |
| -------------------- | -------------------------------------------- |
| `WEBPACK_SERVE`      | `true` if `serve\|s` is being used.          |
| `WEBPACK_BUILD`      | `true` if `build\|bundle\|b` is being used.  |
| `WEBPACK_WATCH`      | `true` if `--watch\|watch\|w` is being used. |

```javascript
module.exports = (env, argv) => {
  return {
    mode: env.WEBPACK_SERVE ? 'development' : 'production',
  };
};
```

### node-env

You can use `--node-env` option to set `process.env.NODE_ENV`:

```bash
npx webpack --node-env production   # process.env.NODE_ENV = 'production'
```

T> The `mode` option would respect the `--node-env` option if you don't set it explicitly, i.e. `--node-env production` would set both `process.env.NODE_ENV` and `mode` to `'production'`

W> You can not access these environment variables inside bundled code.

## Configuration Options

| Parameter       | Explanation                                                    | Input type | Default                                             |
| --------------- | -------------------------------------------------------------- | ---------- | --------------------------------------------------- |
| `--config`      | Path to the configuration file                                 | string[]   | [Default Configs](/api/cli/#default-configurations) |
| `--config-name` | Name of the configuration to use                               | string[]   |                                                     |
| `--env`         | Environment passed to the configuration, when it is a function | string[]   |                                                     |

## Analyzing Bundle

You can also use `webpack-bundle-analyzer` to analyze your output bundles emitted by webpack. You can use `--analyze` flag to invoke it via CLI.

```bash
npx webpack --analyze
```

W> Make sure you have `webpack-bundle-analyzer` installed in your project else CLI will prompt you to install it.

## Progress

To check the progress of any webpack compilation you can use the `--progress` flag.

```bash
npx webpack --progress
```

To collect profile data for progress steps you can pass `profile` as value to `--progress` flag.

```bash
npx webpack --progress=profile
```

## Pass CLI arguments to Node.js

To pass arguments directly to Node.js process, you can use the `NODE_OPTIONS` option.

For example, to increase the memory limit of Node.js process to 4 GB

```bash
NODE_OPTIONS="--max-old-space-size=4096" webpack
```

Also, you can pass multiple options to Node.js process

```bash
NODE_OPTIONS="--max-old-space-size=4096 -r /path/to/preload/file.js" webpack
```

## Exit codes and their meanings

| Exit Code | Description                                        |
| --------- | -------------------------------------------------- |
| `0`       | Success                                            |
| `1`       | Errors from webpack                                |
| `2`       | Configuration/options problem or an internal error |

## CLI Environment Variables

| Environment Variable                  | Description                                                         |
| ------------------------------------- | ------------------------------------------------------------------- |
| `WEBPACK_CLI_SKIP_IMPORT_LOCAL`       | when `true` it will skip using the local instance of `webpack-cli`. |
| `WEBPACK_CLI_FORCE_LOAD_ESM_CONFIG`   | when `true` it will force load the ESM config.                      |
| [`WEBPACK_PACKAGE`](#webpack_package) | Use a custom webpack version in CLI.                                |

```bash
WEBPACK_CLI_FORCE_LOAD_ESM_CONFIG=true npx webpack --config ./webpack.config.esm
```

### WEBPACK_PACKAGE

Use a custom webpack version in CLI. Considering the following content in your `package.json`:

```json
{
  "webpack": "^4.0.0",
  "webpack-5": "npm:webpack@^5.32.0",
  "webpack-cli": "^4.5.0"
}
```

To use `webpack v4.0.0`:

```bash
npx webpack
```

To use `webpack v5.32.0`:

```bash
WEBPACK_PACKAGE=webpack-5 npx webpack
```
