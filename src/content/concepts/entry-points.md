---
title: Entry Points
sort: 2
contributors:
  - TheLarkInn
  - chrisVillanueva
---

As mentioned in [Getting Started](/guides/getting-started/#using-a-configuration), there are multiple ways to define the `entry` property in your webpack configuration. We will show you the ways you **can** configure the `entry` property, in addition to explaining why it may be useful to you.

In Webpack 4 you don't add vendor scripts as entry points anymore, how it used to be done back in webpack 3 in conjunction with the `CommonsChunkPlugin`.
Webpack 4 will build a dependency graph out of your entry scripts and generate optimized bundles for your app by default.
Nevertheless you can tweak the resulting bundles by configuring the `optimization:splitChunks` section in your webpack.config.js.
Read more about fine-tuning your output bundles [here](https://webpack.js.org/plugins/split-chunks-plugin/).

## Single Entry (Shorthand) Syntax

Usage: `entry: string|Array<string>`

**webpack.config.js**

```javascript
const config = {
  entry: './path/to/my/entry/file.js'
};

module.exports = config;
```

The single entry syntax for the `entry` property is a shorthand for:

```javascript
const config = {
  entry: {
    main: './path/to/my/entry/file.js'
  }
};
```

T> **What happens when you pass an array to `entry`?** Passing an array of file paths to the `entry` property creates what is known as a **"multi-main entry"**. This is useful when you would like to inject multiple dependent files together and graph their dependencies into one "chunk".

This is a great choice when you are looking to quickly setup a webpack configuration for an application or tool with one entry point (IE: a library). However, there is not much flexibility in extending or scaling your configuration with this syntax.


## Object Syntax

Usage: `entry: {[entryChunkName: string]: string|Array<string>}`

**webpack.config.js**

```javascript
const config = {
  entry: {
    app: './src/app.js'
  }
};
```

The object syntax is more verbose. However, this is the most scalable way of defining entry/entries in your application.

T> **"Scalable webpack configurations"** are ones that can be reused and combined with other partial configurations. This is a popular technique used to separate concerns by environment, build target and runtime. They are then merged using specialized tools like [webpack-merge](https://github.com/survivejs/webpack-merge).


## Scenarios

Below is a list of entry configurations and their real-world use cases:


### Single Page Application

**webpack.config.js**

```javascript
const config = {
  entry: {
    entry: './src/entry.js'
  }
};
```

### Multi Page Application

**webpack.config.js**

```javascript
const config = {
  entry: {
    pageOne: './src/pageOne/index.js',
    pageTwo: './src/pageTwo/index.js',
    pageThree: './src/pageThree/index.js'
  }
};
```

**What does this do?** We are telling webpack that we would like 3 separate dependency graphs (like the above example).

**Why?** In a multi-page application, the server is going to fetch a new HTML document for you. The page reloads this new document and assets are redownloaded.
T> As a rule of thumb: each HTML document uses exactly one entry point.
