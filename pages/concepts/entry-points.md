---
title: Entry Points
sort: 0
---

Like we mentioned in the [introduction]('./'), there are multiple ways to define the `entry` property in your webpack configuration. We will show you the ways you **can** configure the property, in addition to explaining why it may be useful to you.

## Single Entry (Shorthand) Syntax

Usage: `entry: string|Array<string>`

**webpack.config.js**

```javascript
module.exports = config;

const config = {
  entry: './path/to/my/entry/file.js'
};
```

The single entry syntax for the `entry` property is a short hand for:

```javascript
module.exports = config;

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
module.exports = config;

const config = {
  entry: {
    app: './src/app.js',
    vendors: './src/vendors.js'
  }
};
```

The object syntax is a more verbose, however scalable way of defining entry/entries in your application.

T> **"scalable webpack configurations"** are ones that can be reused and combined with other partial configurations. This is a popular technique used to separate concerns by environment, build target, and runtime. They are then merged together using specialized tools like [webpack-merge](https://github.com/survivejs/webpack-merge).

## Scenarios

Below is a list of entry configurations and their real-world use cases:

#### Separate App and Vendor Entries

**webpack.config.js**

```javascript
module.exports = config;

const config = {
  entry: {
    app: './src/app.js',
    vendors: './src/vendors.js'
  }
};
```

**What does this do?** At face value this tells webpack to create dependency graphs starting at both `app.js` and `vendors.js`. These graphs are completely separate and independant of eachother. (AKA there will be a webpack bootstrap in each bundle). This is commonly seen with single page applications which have only one entry point (excluding vendors).

**Why?** This setup allows you to leverage [`CommonsChunkPlugin`](../api/plugins/commonschunkplugin) and extract any vendor references from your app bundle into your vendor bundle, replacing them with `__webpack_require__()` calls. If there is no vendor code in your application bundle, then you can achieve a common pattern in webpack known as [long-term vendor-caching.](../how-to/cache).

#### Multi Page Application

**webpack.config.js**

```javascript
module.exports = config;

const config = {
  entry: {
    pageOne: './src/pageOne/index.js',
    pageTwo: './src/pageTwo/index.js',
    pageThree: './src/pageThree/index.js',
    vendors: './src/vendors.js'
  }
};
```

**What does this do?** We are telling webpack that we would like 4 separate dependency graphs (like the above example).

**Why?** In a multi-page application, the server is going to fetch a new html document for you, and the page reloads this new document and assets are redownloaded. However this gives us the unique opportunity to do multiple things:

- Use [`CommonsChunkPlugin`](../api/plugins/commonschunkplugin) to create bundles of shared application code between each page. Multi-page applications that reuse a lot of code/modules between entry points can greatly benefit from these techniques, as the amount of entry points increase.

- Set up [long-term vendor-caching.](../how-to/cache) with the same plugin and techniques seen in the first example.
