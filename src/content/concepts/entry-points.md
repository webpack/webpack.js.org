---
title: Entry Points
sort: 1
contributors:
  - TheLarkInn
  - chrisVillanueva
  - byzyk
  - sokra
  - EugeneHlushko
  - Zearin
---

As mentioned in [Getting Started](/guides/getting-started/#using-a-configuration), there are multiple ways to define the `entry` property in your webpack configuration. We will show you the ways you __can__ configure the `entry` property, in addition to explaining why it may be useful to you.


## Single Entry (Shorthand) Syntax

Usage: `entry: string|Array<string>`

__webpack.config.js__

```javascript
module.exports = {
  entry: './path/to/my/entry/file.js'
};
```

The single entry syntax for the `entry` property is a shorthand for:

__webpack.config.js__

```javascript
module.exports = {
  entry: {
    main: './path/to/my/entry/file.js'
  }
};
```

T> __What happens when you pass an array to `entry`?__ Passing an array of file paths to the `entry` property creates what is known as a __"multi-main entry"__. This is useful when you would like to inject multiple dependent files together and graph their dependencies into one "chunk".

This is a great choice when you are looking to quickly setup a webpack configuration for an application or tool with one entry point (i.e. a library). However, there is not much flexibility in extending or scaling your configuration with this syntax.


## Object Syntax

Usage: `entry: {[entryChunkName: string]: string|Array<string>}`

__webpack.config.js__

```javascript
module.exports = {
  entry: {
    app: './src/app.js',
    adminApp: './src/adminApp.js'
  }
};
```

The object syntax is more verbose. However, this is the most scalable way of defining entry/entries in your application.

T> __"Scalable webpack configurations"__ are ones that can be reused and combined with other partial configurations. This is a popular technique used to separate concerns by environment, build target, and runtime. They are then merged using specialized tools like [webpack-merge](https://github.com/survivejs/webpack-merge).


## Scenarios

Below is a list of entry configurations and their real-world use cases:

### Separate App and Vendor Entries

T> In webpack version < 4 it was common to add vendors as a separate entry point to compile it as a separate file (in combination with the `CommonsChunkPlugin`). <br><br> This is discouraged in webpack 4. Instead, the `optimization.splitChunks` option takes care of separating vendors and app modules and creating a separate file. __Do not__ create an entry for vendors or other stuff that is not the starting point of execution.

### Multi Page Application

__webpack.config.js__

```javascript
module.exports = {
  entry: {
    pageOne: './src/pageOne/index.js',
    pageTwo: './src/pageTwo/index.js',
    pageThree: './src/pageThree/index.js'
  }
};
```

__What does this do?__ We are telling webpack that we would like 3 separate dependency graphs (like the above example).

__Why?__ In a multi-page application, the server is going to fetch a new HTML document for you. The page reloads this new document and assets are redownloaded. However, this gives us the unique opportunity to do multiple things:

- Use `optimization.splitChunks` to create bundles of shared application code between each page. Multi-page applications that reuse a lot of code/modules between entry points can greatly benefit from these techniques, as the number of entry points increases.

T> As a rule of thumb: Use exactly one entry point for each HTML document.
