---
title: Configuration
---

Webpack is fed a configuration object. It is passed in one of two ways depending on how you are using Webpack: through the Command Line (CLI) or via Node. Either method also allows an array of configuration objects, which are processed in parallel. This is more efficient than calling Webpack multiple times. All the available configuration options are specified below...

#### Context

The base directory, an absolute path, for resolving entry points.

```javascript
context: __dirname + ‘/src’
```

#### Entry Points

The point or points to enter the application. This value can be a string, array, or object:

```javascript
entry: {
  home: ‘./home.js’,
  about: ‘./about.js’,
  contact: ‘./contact.js’
}
```

#### Output

A set of options instructing Webpack on how and where it should output your bundles, assets and anything else you bundle up or load with Webpack. Below is a simple example followed by descriptions of each individual `output` option.

```javascript
output: {
  filename: ‘[name].bundle.js’,
  path: __dirname + ‘/dist/assets’,
  publicPath: ‘/assets/’
}
```

#### Output.filename

This option determines the name of each output bundle. For a single `entry` point with no children, this can be a static name. However, when creating multiple bundles via more than one entry point, [code splitting](), or various [plugins](), you should use one of the following substitutions to give each bundle a unique name...

Using entry/chunk names:
```javascript
filename: [name].bundle.js
```

Using the unique hash generated for every build:
```javascript 
filename: [name].[hash].bundle.js
```

Using hashes based on each chunks' content:
```javascript
filename: [chunkhash].bundle.js
```

#### Output.path

The output directory as an **absolute** path. Note that the `[hash]` subsitution may be used here as well.

```javascript
path: __dirname + '/dist/assets'
```

#### Output.publicPath

This option specifies the public address of the output files when referenced in a browser. For [loaders]() that embed `<script>` or `<link>` tags or reference assets like images, `publicPath` is used as the `href` or `url()` to the file when it’s different than their location on disk (as specified by `path`). This can be helpful when you want to host some or all output files on a different domain or CDN. As with `path` you can use the `[hash]` substitution for a better caching profile.

```javascript
publicPath: '/assets/'
```

A loader outputting HTML might emit something like this:

```html
<link href="/assets/spinner.gif" />
```

or when loading images in CSS:

```css
background-image: url(/assets/spinner.gif);
```

[Webpack Dev Server]() also takes a hint from `publicPath`, using it to determine where to serve the output files from. 

#### Output.chunkFilename

?> TODO: Is this just an option for child chunks and loader generated chunks?

#### Output.sourceMapFilename

Configure how source maps are named. The substitutions allowed here are `[id]` for chunk ID, `[file]` for the name of file being mapped, and `[hash]` (same as above).

#### Output.devtoolModuleFilenameTemplate



?> TODO: possible extensions, i. e. .babel.js

?> TODO: exporting a function and --env

?> TODO: returning a Promise

?> TODO: exporting multiple configurations

?> TODO: make sure everything links to the necessary areas for further reading
