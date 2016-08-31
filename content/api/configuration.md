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

?> configuration file

?> possible extensions, i. e. .babel.js

?> exporting a function and --env

?> returning a Promise

?> exporting multiple configurations

?> see also [[Using the Cli]]
