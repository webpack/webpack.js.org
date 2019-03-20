---
title: Writing a Scaffold
sort: 3
contributors:
  - pranshuchittora
---

Welcome to the demonstration of the new `webpack init` command! To view what we are building today, run `webpack init webpack-scaffold-demo`. This demo will show you how to build your own webpack scaffold. Let's start by creating a file named `generator.js`.




## Create a basic structure

First, we have to define our skeleton. In order for the CLI to find our options, we've got to define some properties in the constructor first.

__generator.js__

```js
const Generator = require('yeoman-generator');

module.exports = class WebpackGenerator extends Generator {
  constructor(args, opts) {
    super(args, opts);
    opts.env.configuration = {
      dev: {}
    };
  }
};
```

As you can see, the `configuration` object has to have one property you name, it can be anything. A good practise is to name the underlying property with the name you want to give your `webpack.config.js` file, to better indicate what values each file has.


## Make it interactive

In order for us to interact with the users, we make good use of the [`prompting`](http://yeoman.io/authoring/user-interactions.html) method yeoman has. In this method we can get various answers from the user, like asking for entry points or plugins. You can either manually create each object representing a question, or you can make good use of our utilities from [`webpack-scaffold`](https://github.com/webpack/webpack-cli/tree/master/packages/webpack-scaffold). I'm in a good mood today, so I'm going to build a configuration only if the user chooses `Pengwings`.


```js
const Generator = require('yeoman-generator');
const List = require('@webpack-cli/webpack-scaffold').List;

module.exports = class WebpackGenerator extends Generator {
  constructor(args, opts) {
    super(args, opts);
    opts.env.configuration = {
      dev: {}
    };
  }

  prompting() {
    return this.prompt([
      List('confirm', 'Welcome to the demo scaffold! Are you ready?', ['Yes', 'No', 'Pengwings'])
    ]).then (answer => {
      if(answer['confirm'] === 'Pengwings') {
        //
      }
    });
  }
};
```


## Configuring Webpack

So far, we've made an interaction with the user. If you were coding along, great! So how do we proceed from here? Let's try to build a simple webpack config that has an entry point, an output, and a context property. For this, we need to create a `webpackOptions` property on our `dev` object. This is where `entry`, `output` and `context` is gonna be hooked up, later resulting in a `webpack.config.js`.

T> Define the `webpackOptions` property in the constructor to make your scaffold as most clean as possible!

```js
const Generator = require('yeoman-generator');
const List = require('@webpack-cli/webpack-scaffold').List;

module.exports = class WebpackGenerator extends Generator {
  constructor(args, opts) {
    super(args, opts);
    opts.env.configuration = {
      dev: {
        webpackOptions: {}
      }
    };
  }

  prompting() {
    return this.prompt([
      List('confirm', 'Welcome to the demo scaffold! Are you ready?', ['Yes', 'No', 'Pengwings'])
    ]).then (answer => {
      if(answer['confirm'] === 'Pengwings') {
        //
      }
    });
  }
};
```


## Dev Configs

Congrats, you've now created the base of an `webpack-scaffold`! Let's add some stuff to our future configuration file!
I'm going to follow good convention, and extract my config into another file, named `dev-config.js`. As this is just regular JavaScript, we can make the module a function, and supply our entry as a parameter for us to build up a configuration file from.

__dev-config.js__

```js
module.exports = function createDevConfig(answer) {
  let devConfig = {};
};
```

__generator.js__

```js
const Generator = require('yeoman-generator');
const List = require('@webpack-cli/webpack-scaffold').List;
const createDevConfig = require('./dev-config');

module.exports = class WebpackGenerator extends Generator {
  constructor(args, opts) {
    super(args, opts);
    opts.env.configuration = {
      dev: {
        webpackOptions: {}
      }
    };
  }

  prompting() {
    return this.prompt([
      List('confirm', 'Welcome to the demo scaffold! Are you ready?', ['Yes', 'No', 'Pengwings'])
    ]).then (answer => {
      if(answer['confirm'] === 'Pengwings') {
        this.options.env.configuration.dev.webpackOptions = createDevConfig(answer);
      }
    });
  }
};
```

Sweet! We've now abstracted some part of the code that's probably gonna be really big. We can almost call ourselves engineers now! Let's go ahead and add another question, like asking for an entry point.

```js
const Generator = require('yeoman-generator');
const List = require('@webpack-cli/webpack-scaffold').List;
const Input = require('@webpack-cli/webpack-scaffold').Input;
const createDevConfig = require('./dev-config');

module.exports = class WebpackGenerator extends Generator {
  constructor(args, opts) {
    super(args, opts);
    opts.env.configuration = {
      dev: {
        webpackOptions: {}
      }
    };
  }

  prompting() {
    return this.prompt([
      List('confirm', 'Welcome to the demo scaffold! Are you ready?', ['Yes', 'No', 'Pengwings']),
      Input('entry', 'What is the entry point in your app?')
    ]).then (answer => {
      if(answer['confirm'] === 'Pengwings') {
        this.options.env.configuration.dev.webpackOptions = createDevConfig(answer);
      }
    });
  }
};
```

These answers aren't well known on their own for us, so let's go ahead and create our config.


## Some more configs

Let's start by looking at `dev-config.js`. We have some answers, now we want to use them to build up a config. How do we do that? Evidently, we should mount our values on the variable we've declared, with some properties we want to build up. We also want to use the answers for the entry prop. I've also taken the liberty to add an output property that has a `filename`.

T> With string values, you need to wrap your strings once again. This is because we can declare some other functionality, using only " ", while " 'Mystring' " resolves to a string.

__dev-config.js__

```js
module.exports = function createDevConfig(answer) {
  let entryProp = answer.entry ? ( '\'' + answer.entry + '\'') : '\'index.js\'';
  let devConfig = {
    entry: entryProp,
    output: {
      filename: '\'[name].js\''
    }
  };
  return devConfig;
};

```

Try running `webpack init webpack-scaffold-demo`, and now you're seeing your first scaffold!



## Basic Scaffold

Cool. Now we've got an initial scaffold. Let's add the rest of our options! For the context, let's say we've got a `path.join` we want to make use of. For this, you use a single quote string.

```js
module.exports = function createDevConfig(answer) {
  let entryProp = answer.entry ? ( '\'' + answer.entry + '\'') : '\'index.js\'';
  let devConfig = {
    entry: entryProp,
    output: {
      filename: '\'[name].js\''
    },
    context: 'path.join(__dirname, "src")'
  };
  return devConfig;
};
```



## Add more functionality

We're ready to add a plugin, as the last piece of the puzzle. For this, I'm going to create a utility for commonsChunk, based on the input from the user. I'll start by adding another question to our prompt.

```js
const Generator = require('yeoman-generator');
const List = require('@webpack-cli/webpack-scaffold').List;
const Input = require('@webpack-cli/webpack-scaffold').Input;
const createDevConfig = require('./dev-config');

module.exports = class WebpackGenerator extends Generator {
  constructor(args, opts) {
    super(args, opts);
    opts.env.configuration = {
      dev: {
        webpackOptions: {}
      }
    };
  }

  prompting() {
    return this.prompt([
      List('confirm', 'Welcome to the demo scaffold! Are you ready?', ['Yes', 'No', 'Pengwings']),
      Input('entry', 'What is the entry point in your app?'),
      Input('plugin', 'What do you want to name your commonsChunk?')
    ]).then (answer => {
      if(answer['confirm'] === 'Pengwings') {
        this.options.env.configuration.dev.webpackOptions = createDevConfig(answer);
      }
    });
  }
};
```



## Create string with chunks

Now, we've got to create a string with our chunk. This is how it looks.

```js
module.exports = function createCommonsChunkPlugin(chunk) {
  return (
    'new webpack.optimize.CommonsChunkPlugin({name:' + '\'' + chunk + '\'' +
		',filename:' + '\'' + chunk + '-[hash].min.js\'})'
  );
};
```

Sweet! We've now created a scaffold with `entry`, `output`, `context` and a `plugin`. If you're curious on the API, check the [API](/src/content/guides/scaffolding.md) for more info on how to scaffold with `regexps`, `module`, or other!



## Defining scopes

In order for webpack to compile correctly, we've got to import `path`. For this, we've got to define something called `topScope`. This is where our code before `module.exports` are going, where you can add everything from imports, variables, to functions. The syntax is the same as with the plugins, except that the `topScope` property expects an array. In `topScope` you can define whatever you want.

__generator.js__

```js
const Generator = require('yeoman-generator');
const List = require('@webpack-cli/webpack-scaffold').List;
const Input = require('@webpack-cli/webpack-scaffold').Input;
const createDevConfig = require('./dev-config');

module.exports = class WebpackGenerator extends Generator {
  constructor(args, opts) {
    super(args, opts);
    opts.env.configuration = {
      dev: {
        webpackOptions: {}
      }
    };
  }

  prompting() {
    return this.prompt([
      List('confirm', 'Welcome to the demo scaffold! Are you ready?', ['Yes', 'No', 'Pengwings']),
      Input('entry', 'What is the entry point in your app?'),
      Input('plugin', 'What do you want to name your commonsChunk?')
    ]).then (answer => {
      if(answer['confirm'] === 'Pengwings') {
        this.options.env.configuration.dev.webpackOptions = createDevConfig(answer);
        this.options.env.configuration.dev.topScope = [
          'const path = require("path")',
          'const webpack = require("webpack")'
        ];
      }
    });
  }
};
```



## Nomenclature of configs

You also might want to name your config file something you've got strong personal attachments to, like my love for penguins. To do so, you can do the following.


```js
const Generator = require('yeoman-generator');
const List = require('@webpack-cli/webpack-scaffold').List;
const Input = require('@webpack-cli/webpack-scaffold').Input;
const createDevConfig = require('./dev-config');

module.exports = class WebpackGenerator extends Generator {
  constructor(args, opts) {
    super(args, opts);
    opts.env.configuration = {
      dev: {
        webpackOptions: {}
      }
    };
  }

  prompting() {
    return this.prompt([
      List('confirm', 'Welcome to the demo scaffold! Are you ready?', ['Yes', 'No', 'Pengwings']),
      Input('entry', 'What is the entry point in your app?'),
      Input('plugin', 'What do you want to name your commonsChunk?')
    ]).then (answer => {
      if(answer['confirm'] === 'Pengwings') {
        this.options.env.configuration.dev.webpackOptions = createDevConfig(answer);
        this.options.env.configuration.dev.topScope = [
          'const path = require("path")',
          'const webpack = require("webpack")'
        ];
        this.options.env.configuration.dev.configName = 'pengwings';
      }
    });
  }
};
```

## Introducing .yo-rc.json

To write the actual configuration, webpack-cli creates a `.yo-rc.json` file for it to parse the ast. For the CLI to understand how to parse the configuration, we need to write to the `.yo-rc.json`. This is done using the `writing` lifecycle method built in by yeoman.


```js
const Generator = require('yeoman-generator');
const List = require('@webpack-cli/webpack-scaffold').List;
const Input = require('@webpack-cli/webpack-scaffold').Input;
const createDevConfig = require('./dev-config');

module.exports = class WebpackGenerator extends Generator {
  constructor(args, opts) {
    super(args, opts);
    opts.env.configuration = {
      dev: {
        webpackOptions: {}
      }
    };
  }

  prompting() {
    return this.prompt([
      List('confirm', 'Welcome to the demo scaffold! Are you ready?', ['Yes', 'No', 'Pengwings']),
      Input('entry', 'What is the entry point in your app?'),
      Input('plugin', 'What do you want to name your commonsChunk?')
    ]).then (answer => {
      if(answer['confirm'] === 'Pengwings') {
        this.options.env.configuration.dev.webpackOptions = createDevConfig(answer);
        this.options.env.configuration.dev.topScope = [
          'const path = require("path")',
          'const webpack = require("webpack")'
        ];
        this.options.env.configuration.dev.configName = 'pengwings';
      }
    });
  }
  writing() {
    this.config.set('configuration', this.options.env.configuration);
  }
};
```


Congrats on your first scaffold! If you need help, submit an [issue](https://github.com/ev1stensberg/webpack-scaffold-demo/issues), or reach out to me on [Twitter](https://twitter.com/evenstensberg)!
