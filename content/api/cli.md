---
title: Command Line Interface (CLI)
sort: 2
contributors:
    - ev1stensberg
---

webpack provides a Command Line Interface (CLI) to configure and interact with your build. This is mostly useful in case of early prototyping, profiling, writing npm scripts or personal customization of the build.

For proper usage and easy distribution of this configuration, webpack can be configured with `webpack.config.js`. Any parameters sent to the CLI will map to a corresponding parameter in the config file.

## Installation

Have a look at [this page](/guides/installation)

?> The new CLI for webpack is under development. New features are being added such as the `--init` flag. [Check it out!](https://github.com/webpack/webpack-cli)

### Common Usage

```bash
webpack <entry> [<entry>] <output>
```

| Parameter | Configuration Mapping         | Explanation                                                                                                                                                             |
|-----------|-------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| entry     | entry                         | A filename or a set of named filenames which act as the entry point to build your project. If you pass a pair in the form of `=` you can create an additional entry point. |
| output    | output.path + output.filename | A path and filename for the bundled file to be saved in. |

#### Examples

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
webpack src/index.js dist/bundle.js
	This will bundle your source code with entry as `index.js` and the output bundle file will have a path of `dist` and the filename will be `bundle.js`

	| Asset     | Size    | Chunks      | Chunk Names |
	|-----------|---------|-------------|-------------|
	| bundle.js | 1.54 kB | 0 [emitted] | index       |
	[0] ./src/index.js 51 bytes {0} [built]
	[1] ./src/others.js 29 bytes {0} [built]
```

```bash
webpack index=./src/index.js entry2=./src/index2.js dist/bundle.js
	This will form the bundle with both the files as separate entry points.

	| Asset     | Size    | Chunks        | Chunk Names   |
	|-----------|---------|---------------|---------------|
	| bundle.js | 1.55 kB | 0,1 [emitted] | index, entry2 |
	[0] ./src/index.js 51 bytes {0} [built]
	[0] ./src/index2.js 54 bytes {1} [built]
	[1] ./src/others.js 29 bytes {0} {1} [built]
```

### Common Options

**List all of the options available on the cli**

```bash
webpack --help , webpack -h
```

**Build source using a config file**

Specifies a different configuration file to pick up. Use this if you want to specify something different than `webpack.config.js`, which is the default.

```bash
webpack --config example.config.js
```

**Send environment variable to be used in webpack config file**

```bash
webpack --env=DEVELOPMENT
```

**Print result of webpack as a JSON**

In every other case, webpack prints out a set of stats showing bundle, chunk and timing details. Using this option the output can be a JSON object.This response is accepted by webpack's [analyse tool](https://webpack.github.com/analyse).
The analyse tool will take in the JSON and provide all the details of the build in graphical form.

?> (TODO: Link to webpack analyse article)

```bash
webpack --json , webpack -j, webpack -j > stats.json
```

### Output Options

This set of options allows you to manipulate certain output parameters of your build.

| Parameter                    | Explanation                                                     | Input type | Default value                                         |
|------------------------------|-----------------------------------------------------------------|------------|-------------------------------------------------------|
| --output-chunk-filename      | The output filename for additional chunks                       | string     | filename with [id] instead of [name] or [id] prefixed |
| --output-filename            | The output filename of the bundle                               | string     | [name].js                                             |
| --output-jsonp-function      | The name of the JSONP function used for chunk loading           | string     | webpackJsonp                                          |
| --output-library             | Expose the exports of the entry point as library                | string     |                                                       |
| --output-library-target      | The type for exposing the exports of the entry,point as library | string     | var                                                   |
| --output-path                | The output path for compilation assets                          | string     | Current directory                                     |
| --output-pathinfo            | Include a comment with the request for every dependency         | boolean    | false                                                 |
| --output-public-path         | The public path for the assets                                  | string     | /                                                     |
| --output-source-map-filename | The output filename for the SourceMap                           | string     | [name].map or [outputFilename].map                    |

#### Example Usage

```bash
webpack index=./src/index.js index2=./src/index2.js --output-path='./dist' --output-filename='[name][hash].bundle.js'

| Asset                                | Size    | Chunks      | Chunk Names   |
|--------------------------------------|---------|-------------|---------------|
| index2740fdca26e9348bedbec.bundle.js |  2.6 kB | 0 [emitted] | index2        |
| index740fdca26e9348bedbec.bundle.js  | 2.59 kB | 1 [emitted] | index         |
	[0] ./src/others.js 29 bytes {0} {1} [built]
	[1] ./src/index.js 51 bytes {1} [built]
	[2] ./src/index2.js 54 bytes {0} [built]
```

```bash
webpack.js index=./src/index.js index2=./src/index2.js --output-path='./dist' --output-filename='[name][hash].bundle.js' --devtool source-map --output-source-map-filename='[name]123.map'

| Asset                                | Size    | Chunks      | Chunk Names   |
|--------------------------------------|---------|-------------|---------------|
| index2740fdca26e9348bedbec.bundle.js | 2.76 kB | 0 [emitted] | index2        |
|  index740fdca26e9348bedbec.bundle.js | 2.74 kB | 1 [emitted] | index         |
|                        index2123.map | 2.95 kB | 0 [emitted] | index2        |
|                         index123.map | 2.95 kB | 1 [emitted] | index         |
	[0] ./src/others.js 29 bytes {0} {1} [built]
	[1] ./src/index.js 51 bytes {1} [built]
	[2] ./src/index2.js 54 bytes {0} [built]
```

### Debug Options

This set of options allows you to better debug the application containing assets compiled with webpack

| Parameter  | Explanation                                      | Input type | Default value |
|------------|--------------------------------------------------|------------|---------------|
| --debug    | Switch loaders to debug mode                     | boolean    | false         |
| --devtool  | Define source map type for the bundled resources | string     | -             |
| --progress | Print compilation progress in percentage         | boolean    | false         |

### Module Options

These options allow you to bind modules as allowed by webpack

| Parameter          | Explanation                        | Usage                       |
|--------------------|------------------------------------|-----------------------------|
| --module-bind      | Bind an extension to a loader      | --module-bind /\.js$/=babel |
| --module-bind-post | Bind an extension to a post loader |                             |
| --module-bind-pre  | Bind an extension to a pre loader  |                             |

### Watch Options

These options makes the build watch for changes in files of the dependency graph and perform the build again.

| Parameter                 | Explanation                                             |
|---------------------------|---------------------------------------------------------|
| --watch, -w               | Watch the filesystem for changes                        |
| --save, -s                | Recompiles on save regardless of changes                |
| --watch-aggregate-timeout | Timeout for gathering changes while watching            |
| --watch-poll              | The polling interval for watching (also enable polling) |
| --watch-stdin, --stdin    | Exit the process when stdin is closed                   |

### Optimize Options

These options allow you to manipulate optimisations for a production build using webpack

| Parameter                 | Explanation                                            | Plugin used                          |
|---------------------------|--------------------------------------------------------|--------------------------------------|
| --optimize-max-chunks     | Try to keep the chunk count below a limit              | LimitChunkCountPlugin                |
| --optimize-min-chunk-size | Try to keep the chunk size above a limit               | MinChunkSizePlugin                   |
| --optimize-minimize       | Minimize javascript and switches loaders to minimizing | UglifyJsPlugin & LoaderOptionsPlugin |

### Resolve Options

These allow you to configure the webpack resolver with aliases and extensions.

| Parameter              | Explanation                                             | Example                                     |
|------------------------|---------------------------------------------------------|---------------------------------------------|
| --resolve-alias        | Setup a module alias for resolving                      | --resolve-alias jquery-plugin=jquery.plugin |
| --resolve-extensions   | Setup extensions that should be used to resolve,modules | --resolve-extensions .es6 .js .ts           |
| --resolve-loader-alias | Minimize javascript and switches loaders to minimizing  |                                             |

### Stats Options

These options allow webpack to display various stats and style them differently in the console output.

| Parameter               | Explanation                                                        | Type    |
|-------------------------|--------------------------------------------------------------------|---------|
| --color, --colors       | Enables/Disables colors on the console [default: (supports-color)] | boolean |
| --display-cached        | Display also cached modules in the output                          | boolean |
| --display-cached-assets | Display also cached assets in the output                           | boolean |
| --display-chunks        | Display chunks in the output                                       | boolean |
| --display-entrypoints   | Display entry points in the output                                 | boolean |
| --display-error-details | Display details about errors                                       | boolean |
| --display-exclude       | Exclude modules in the output                                      | boolean |
| --display-modules       | Display even excluded modules in the output                        | boolean |
| --display-origins       | Display origins of chunks in the output                            | boolean |
| --display-reasons       | Display reasons about module inclusion in the output               | boolean |
| --display-used-exports  | Display information about used exports in modules (Tree Shaking)   | boolean |
| --hide-modules          | Hides info about modules                                           | boolean |
| --sort-assets-by        | Sorts the assets list by property in asset                         | string  |
| --sort-chunks-by        | Sorts the chunks list by property in chunk                         | string  |
| --sort-modules-by       | Sorts the modules list by property in module                       | string  |
| --verbose, -v           | Show more details                                                  | boolean |

### Advanced Options

| Parameter             | Explanation                                                      | Usage                                       |
|-----------------------|------------------------------------------------------------------|---------------------------------------------|
| --bail                | Abort the compilation on first error                             |                                             |
| --cache               | Enable in memory caching [Enabled by default for watch]          | --cache=false                               |
| --define              | Define any free var in the bundle                                | --define process.env.NODE_ENV='development' |
| --hot                 | Enables Hot Module Replacement [Uses HotModuleReplacementPlugin] | --hot=true                                  |
| --labeled-modules     | Enables labeled modules [Uses LabeledModulesPlugin]              |                                             |
| --plugin              | Load this plugin                                                 |                                             |
| --prefetch            | Prefetch the particular file                                     | --prefetch=./files.js                       |
| --provide             | Provide these modules as free vars in all modules                | --provide jQuery=jquery                     |
| --records-input-path  | Path to the records file (reading)                               |                                             |
| --records-output-path | Path to the records file (writing)                               |                                             |
| --records-path        | Path to the records file                                         |                                             |
| --target              | The targeted execution environment                                | --target='node'                             |

### Shortcuts

| Shortcut | Replaces                                                         |
|----------|------------------------------------------------------------------|
| -d       | --debug --devtool eval-cheap-module-source-map --output-pathinfo |
| -p       | --optimize-minimize --define process.env.NODE_ENV="production"   |

### Profiling

This option profiles the compilation and includes this information in the stats output. It gives you an in depth idea of which step in the compilation is taking how long. This can help you optimise your build in a more informed manner.

```bash
webpack --profile

30ms building modules
1ms sealing
1ms optimizing
0ms basic module optimization
1ms module optimization
1ms advanced module optimization
0ms basic chunk optimization
0ms chunk optimization
1ms advanced chunk optimization
0ms module and chunk tree optimization
1ms module reviving
0ms module order optimization
1ms module id optimization
1ms chunk reviving
0ms chunk order optimization
1ms chunk id optimization
10ms hashing
0ms module assets processing
13ms chunk assets processing
1ms additional chunk assets processing
0ms recording
0ms additional asset processing
26ms chunk asset optimization
1ms asset optimization
6ms emitting
```
