---
title: Entry Points
---

Like we mentioned in our [Core Concepts]('./concepts'), there are multiple ways to define the `entry` property in your webpack configuration. We will show you the ways you **can** configure the property, in addition to explaining why it may be useful to you. 

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

T> A **"scalable webpack configurations"** are ones that can be reused and combined with other partial configurations. This is a popular technique used to separate concerns by environment, build target, and runtime. They are then merged together using specialized tools like [webpack-merge](https://github.com/survivejs/webpack-merge).

## Scenarios

Below is a list of entry configurations and their real-world use cases:





