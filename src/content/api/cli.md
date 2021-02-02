---
title: Command Line Interface
sort: 1
contributors:
  - anshumanv
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
  - title: Analyzing & optimizing your webpack bundle
    url: https://medium.com/@ahmedelgabri/analyzing-optimizing-your-webpack-bundle-8590818af4df#.hce4vdjs9
  - title: Analysing and minimising the size of client-side bundle with webpack and source-map-explorer
    url: https://medium.com/@nimgrg/analysing-and-minimising-the-size-of-client-side-bundle-with-webpack-and-source-map-explorer-41096559beca#.c3t2srr8x
---

For proper usage and easy distribution of this configuration, webpack can be configured with `webpack.config.js`. Any parameters sent to the CLI will map to a corresponding parameter in the configuration file.

Read the [installation guide](/guides/installation) if you don't already have webpack and CLI installed.

## Commands

webpack-cli offers a variety of commands to make working with webpack easy. By default webpack ships with
 
| Command      | Usage                                     | Description                                                                     |
| ------------ | ----------------------------------------- | ------------------------------------------------------------------------------- |
| `build`      | `build\|bundle\|b [entries...] [options]` | Run webpack (default command, can be omitted).                                  |
| `configtest` | `configtest\|t [config-path]`             | Validate a webpack configuration.                                               |
| `help`       | `help\|h [command] [option]`              | Display help for commands and options.                                          |
| `info`       | `info\|i [options]`                       | Outputs information about your system.                                          |
| `init`       | `init\|c [scaffold...] [options]`         | Initialize a new webpack configuration.                                         |
| `loader`     | `loader\|l [output-path]`                 | Scaffold a loader.                                                              |
| `plugin`     | `plugin\|p [output-path]`                 | Scaffold a plugin.                                                              |
| `serve`      | `serve\|s [options]`                      | Run the `webpack-dev-server`.                                                   |
| `version`    | `version\|v [commands...]`                | Output the version number of `webpack`, `webpack-cli` and `webpack-dev-server`. |
| `watch`      | `watch\|w [entries...] [options]`         | Run webpack and watch for files changes.                                        |

## Flags

By default webpack ships with the following flags:
| Flag / Alias        | Type            | Description                                                                                                    |
| ------------------- | --------------- | -------------------------------------------------------------------------------------------------------------- |
| `--entry`           | string[]        | The entry point(s) of your application e.g. `./src/main.js`                                                    |
| `--config, -c`      | string[]        | Provide path to a webpack configuration file e.g. `./webpack.config.js`                                        |
| `--config-name`     | string[]        | Name of the configuration to use                                                                               |
| `--name`            | string          | Name of the configuration. Used when loading multiple configurations                                           |
| `--color`           | boolean         | Enable colors on console                                                                                       |
| `--merge, -m`       | boolean         | Merge two or more configurations using webpack-merge e.g. `-c ./webpack.config.js -c ./webpack.test.config.js` |
| `--env`             | string[]        | Environment passed to the configuration when it is a function                                                  |
| `--progress`        | boolean, string | Print compilation progress during build                                                                        |
| `--help`            | boolean         | Outputs list of supported flags and commands                                                                   |
| `--output-path, -o` | string          | Output location of the file generated by webpack e.g. `./dist`                                                 |
| `--target, -t`      | string[]        | Sets the build target                                                                                          |
| `--watch, -w`       | boolean         | Watch for file changes                                                                                         |
| `--watch-options-stdin` | boolean     | Stop watching when stdin stream has ended                                                                      |
| `--hot, -h`         | boolean         | Enables Hot Module Replacement                                                                                 |
| `--devtool, -d`     | string          | Controls if and how source maps are generated.                                                                 |
| `--prefetch`        | string          | Prefetch this request                                                                                          |
| `--json, -j`        | boolean, string | Prints result as JSON or store it in a file                                                                    |
| `--mode`            | string          | Defines the mode to pass to webpack                                                                            |
| `--version, -v`     | boolean         | Get current version                                                                                            |
| `--stats`           | boolean, string | It instructs webpack on how to treat the stats                                                                 |
| `--analyze`         | boolean         | It invokes `webpack-bundle-analyzer` plugin to get bundle information                                          |

### Negated Flags

| Flag                       | Description                                                    |
| -------------------------- | -------------------------------------------------------------- |
| `--no-color`               | Disables any color on the console                              |
| `--no-hot`                 | Disables hot reloading if you have it enabled via your config  |
| `--no-stats`               | Disables any compilation stats emitted by webpack              |
| `--no-watch`               | Do not watch for file changes                                  |
| `--no-devtool`             | Do not generate source maps                                    |
| `--no-watch-options-stdin` | Do not stop watching when stdin stream has ended               |

### Core Flags

Starting CLI v4 and webpack v5, CLI imports the entire configuration schema from webpack core to allow tuning almost every configuration option from the command line.

__Here's the list of all the core flags supported by webpack v5 with CLI v4 - [link](https://github.com/webpack/webpack-cli/blob/master/OPTIONS.md)__

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
npx webpack --entry <entry> -o <output-path>
```

__example__

```bash
npx webpack --entry ./first.js --entry ./second.js --output-path /build
```

__`<entry>`__

A filename or a set of named filenames which act as the entry point to build your project. You can pass multiple entries (every entry is loaded on startup).

__`<output>`__

A path for the bundled file to be saved in. It will be mapped to the configuration options `output.path`.

__Example__

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
npx webpack ./src/index.js -o dist
```

This will bundle your source code with entry as `index.js`, and the output bundle file will have a path of `dist`.

```bash
asset main.js 142 bytes [compared for emit] [minimized] (name: main)
./src/index.js 30 bytes [built] [code generated]
./src/others.js 1 bytes [built] [code generated]
webpack 5.1.0 compiled successfully in 187 ms
```

```bash
npx webpack ./src/index.js ./src/others2.js -o dist/
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

__List basic commands and flags available on the cli__

```bash
npx webpack --help
```

__List all supported commands and flags by cli__

```bash
npx webpack --help=verbose
```

__Show version of installed packages and sub-packages__

To inspect the version of `webpack` and `webpack-cli` you are using just run command:

```bash
npx webpack --version
```

This will output the following result:

```bash
webpack 5.11.1
webpack-cli 4.3.1
```

It will output the version of `webpack-dev-server` as well if you have it installed:

```bash
webpack 5.11.1
webpack-cli 4.3.1
webpack-dev-server 3.11.1
```

To inspect the version of any `webpack-cli` sub-package (like `@webpack-cli/init`) just run command similar to the following:

```bash
npx webpack init --version
```

This will output the following result:

```bash
@webpack-cli/init 1.0.3
webpack-cli 4.2.0
webpack 5.4.0
```

__Build source using a configuration file__

Specify a different [configuration](/configuration) file other than `webpack.config.js`, which is one of the defaults.

```bash
npx webpack --config example.config.js
```

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

__Merge two or more different webpack configurations__

You can merge two or more different webpack configurations with the help of `--merge`: 

```bash
npx webpack --config ./first.js --config ./second.js --merge
```

__Print result of webpack as a JSON__

```bash
npx webpack --json
```

__If you want to store stats as json instead of printing it, you can use -__

```bash
npx webpack --json stats.json
```

In every other case, webpack prints out a set of stats showing bundle, chunk and timing details. Using this option, the output can be a JSON object. This response is accepted by webpack's [analyse tool](https://webpack.github.io/analyse/), or chrisbateman's [webpack-visualizer](https://chrisbateman.github.io/webpack-visualizer/), or th0r's [webpack-bundle-analyzer](https://github.com/webpack-contrib/webpack-bundle-analyzer). The analyse tool will take in the JSON and provide all the details of the build in graphical form.

T> See the [stats data api](/api/stats) to read more about the stats generated here.

## Environment Options

When the webpack configuration [exports a function](/configuration/configuration-types/#exporting-a-function), an "environment" may be passed to it.

```bash
npx webpack --env production    # sets env.production == true
```

The `--env` argument accepts multiple values:

| Invocation                                                   | Resulting environment                          |
| ------------------------------------------------------------ | ---------------------------------------------- |
| `npx webpack --env prod`                                         | `{ prod: true }`                               |
| `npx webpack --env prod --env min`                               | `{ prod: true, min: true }`                    |
| `npx webpack --env platform=app --env production`                | `{ platform: "app", production: true }`        |
| `npx webpack --env app.platform="staging" --env app.name="test"` | `{ app: { platform: "staging", name: "test" }` |

T> See the [environment variables](/guides/environment-variables/) guide for more information on its usage.

## Configuration Options

| Parameter       | Explanation                                                    | Input type | Default                                             |
| --------------- | -------------------------------------------------------------- | ---------- | --------------------------------------------------- |
| `--config`      | Path to the configuration file                                 | string     | [Default Configs](/api/cli/#default-configurations) |
| `--config-name` | Name of the configuration to use                               | string     |
| `--env`         | Environment passed to the configuration, when it is a function |            |

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
