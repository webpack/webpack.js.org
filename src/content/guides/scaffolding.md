---
title: Scaffolding
sort: 14
contributors:
  - evenstensberg
  - pranshuchittora
  - EugeneHlushko
  - jamesgeorge007
---

It can be hard to set up a complex webpack configuration for the first time. Writing advanced configurations to optimize performance could be even more difficult. The `init` feature allows creating a webpack configuration by using customizable third-party initialization packages.

## Creating a scaffold

Before writing a `webpack-cli` scaffold, think about what you're trying to achieve and who is going to use it:

- Do you want a generic scaffold that could be used by a wide variety of applications and projects?
- Do you want something specific, like a scaffold that writes both your `webpack.config.js` and your framework code?
- Who are the potential users and what user experience will look like for the users of your scaffold?

`webpack-cli` offers an interactive experience to customize the output accordingly. For example asking questions like: "What is your entry point?".

### Writing a scaffold

There are various resources where you can learn how to write a scaffold, you can start by reading [Writing a Scaffold](/contribute/writing-a-scaffold/) tutorial.

`webpack-scaffold` is a utility suite for creating scaffolds. It contains functions that could be used to create a scaffold.

### Running a scaffold

A scaffold can be executed using `webpack-cli init`:

```bash
webpack-cli init <your-scaffold>
```

#### Running a scaffold locally

When the scaffold package is in your local file system you should point `init` to its path:

```bash
webpack-cli init path/to/your/scaffold
```

Or you can create a global module and symlink to the local one:

- Using npm

```bash
cd path/to/my-scaffold
npm link
webpack-cli init my-scaffold
```

- Using yarn

```bash
cd path/to/my-scaffold
yarn link
webpack-cli init my-scaffold
```

#### Running a scaffold from npm

If the package is available from npm, its name must begin with `webpack-scaffold` and can be used by running:

```bash
webpack-cli init webpack-scaffold-yourpackage
```

## API

To create a `scaffold`, you must create a [`yeoman-generator`](http://yeoman.io/authoring/). Thanks to it, you can optionally extend your generator to include methods from the [Yeoman API](http://yeoman.io/learning/). It's worth noting that we support all the properties of a regular webpack configuration. In order for us to do this, there's a thing you need to remember:

W> Objects are made using strings, while strings are made using double strings. This means that in order for you to create a string, you have to wrap it inside another string for us to validate it correctly.

### Required

- [`opts.env.configuration`(required)](#optsenvconfigurationrequired)
- [`opts.env.configuration.myObj` (required)](#optsenvconfigurationmyobj-required)
- [`myObj.webpackOptions` (required)](#myobjwebpackoptions-required)
- [`writing` (required)](#writing-required)

### Optional

- [myObj.merge](#myobjmerge-optional)
- [myObj.topScope](#myobjtopscopeoptional)
- [myObj.configName](#myobjconfignameoptional)

### `opts.env.configuration`(required)

`object`

This is the entry point your configuration, initialize it inside the constructor of your generator in order for the CLI to work:

```js
class MyScaffold extends Generator {
  constructor(args, opts) {
    super(args, opts);
    opts.env.configuration = {};
  }
}
```

### `opts.env.configuration.myObj` (required)

`object`

This is your scaffold, you add the options that the CLI will transform into a webpack configuration here. You can have many different scaffolds named as you prefer, representing different configurations like `dev.config` or `prod.config`:

```js
class MyScaffold extends Generator {
  constructor(args, opts) {
    super(args, opts);
    opts.env.configuration = {
      dev: {},
      prod: {},
    };
  }
}
```

### `myObj.webpackOptions` (required)

`object`

This object has the same format as a regular webpack [configuration](/configuration/). Declare the properties that you want to scaffold here, e.g. `entry`, `output` and `context`. You can initialize this inside a yeoman method:

```js
this.options.env.configuration.dev.webpackOptions = {
  entry: 'app.js',
  output: {},
};
```

### `writing` (required)

`function`

For the scaffolding instance to run, you need to write your configuration to a `.yo-rc.json` file. This could be done using one of the lifecycles in the yeoman generator, such as the `writing` method:

```js
class MyScaffold extends Generator {
  writing() {
    this.config.set('configuration', myObj);
  }
}
```

### `myObj.merge` (optional)

`string`

If you want to use [`webpack-merge`](https://github.com/survivejs/webpack-merge), you can set the `merge` property of `myObj` to the name of the configuration you want to merge it with:

```js
this.options.env.configuration.dev.merge = 'myConfig';
```

### `myObj.topScope`(optional)

`[string]`

The `topScope` property is where you write all the code needed by your configuration, like module imports and functions/variables declarations:

```js
this.options.env.configuration.dev.topScope = [
  'const webpack = require("webpack");',
  'const path = require("path");',
];
```

### `myObj.configName`(optional)

`string`

`configName` allows you to customize the name of your configuration file. For example you can name it `webpack.base.js` instead of the default `webpack.config.js`:

```js
this.options.env.configuration.dev.configName = 'base';
```
