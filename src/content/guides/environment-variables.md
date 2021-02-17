---
title: Environment Variables
sort: 8
contributors:
  - simon04
  - grisanu
  - tbroadley
  - legalcodes
  - byzyk
  - jceipek
related:
  - title: The Fine Art of the webpack 3 Config
    url: https://blog.flennik.com/the-fine-art-of-the-webpack-2-config-dc4d19d7f172#d60a
---

To disambiguate in your `webpack.config.js` between [development](/guides/development) and [production builds](/guides/production) you may use environment variables.

T> webpack's environment variables are different from the [environment variables](https://en.wikipedia.org/wiki/Environment_variable) of operating system shells like `bash` and `CMD.exe`

The webpack command line [environment option](/api/cli/#environment-options) `--env` allows you to pass in as many environment variables as you like. Environment variables will be made accessible in your `webpack.config.js`. For example, `--env production` or `--env NODE_ENV=local` (`NODE_ENV` is conventionally used to define the environment type, see [here](https://dzone.com/articles/what-you-should-know-about-node-env).)

```bash
npx webpack --env NODE_ENV=local --env production --progress
```

T> Setting up your `env` variable without assignment, `--env production` sets `env.production` to `true` by default. There are also other syntaxes that you can use. See the [webpack CLI](/api/cli/#environment-options) documentation for more information.

There is one change that you will have to make to your webpack config. Typically, `module.exports` points to the configuration object. To use the `env` variable, you must convert `module.exports` to a function:

**webpack.config.js**

```js
const path = require('path');

module.exports = (env) => {
  // Use env.<YOUR VARIABLE> here:
  console.log('NODE_ENV: ', env.NODE_ENV); // 'local'
  console.log('Production: ', env.production); // true

  return {
    entry: './src/index.js',
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
  };
};
```

T> webpack CLI offers some built-in environment variables which you can access inside a wbpack configuration. Know more about them [here](/api/cli/#environment-variables)
