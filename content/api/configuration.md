---
title: Configuration
---

> configuration file
> possible extensions, i. e. .babel.js
> exporting a function and --env
> returning a Promise
> exporting multiple configurations

> see also [[Using the Cli]]

## Basic configuration options

``` js-with-links
{ // click on the name of the option to get more details

  [entry](#entry): "./app/entry", // string | object | array
  // Here the application starts executing
  // and webpack starts bundling

  [output](#output): {
    // options related how webpack emits results

    [path](#output-path): __dirname, // string
    // the target directory for all output files
    // must be an absolute path

    [filename](#output-filename): "[name].js", // string
    // the filename template for [entry chunks](chunks)

    [chunkFilename](#output-chunkFilename): "[id].js",
    // the filename template for additional chunks

    [library](#output-library): "MyLibrary", // string,
    // the name of the exported library

    [libraryTarget](#output-libraryTarget): "commonjs" | "amd" | "umd"

    // [...](#Advanced-configuration-options)

  },

  context: __dirname, // string
  // The home directory for webpack
  // The [entry](#entry) option is resolved relative to this directory

}
```




### `entry`

### `output`

### `output.path`

### `output.filename`

### `output.chunkFilename`

### `output.library`

### `output.libraryTarget`


## Advanced configuration options

``` js-with-links
{ // click on the name of the option to get more details

  externals: string | array | function | RegExp

}
```