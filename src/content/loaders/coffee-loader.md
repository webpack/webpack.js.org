---
title: coffee-loader
source: https://raw.githubusercontent.com/webpack-contrib/coffee-loader/master/README.md
edit: https://github.com/webpack-contrib/coffee-loader/edit/master/README.md
repo: https://github.com/webpack-contrib/coffee-loader
---


[![npm][npm]][npm-url]
[![node][node]][node-url]
[![deps][deps]][deps-url]
[![tests][tests]][tests-url]
[![coverage][cover]][cover-url]
[![chat][chat]][chat-url]
[![size][size]][size-url]



Compile [CoffeeScript](https://coffeescript.org/) to JavaScript.

## Getting Started

To begin, you'll need to install `coffeescript` and `coffee-loader`:

```console
npm install --save-dev coffeescript coffee-loader
```

Then add the plugin to your `webpack` config. For example:

**file.coffee**

```coffee
# Assignment:
number   = 42
opposite = true

# Conditions:
number = -42 if opposite

# Functions:
square = (x) -> x * x

# Arrays:
list = [1, 2, 3, 4, 5]

# Objects:
math =
  root:   Math.sqrt
  square: square
  cube:   (x) -> x * square x

# Splats:
race = (winner, runners...) ->
  print winner, runners

# Existence:
alert "I knew it!" if elvis?

# Array comprehensions:
cubes = (math.cube num for num in list)
```

**webpack.config.js**

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.coffee$/,
        loader: "coffee-loader",
      },
    ],
  },
};
```

Alternative usage:

```js
import coffee from "coffee-loader!./file.coffee";
```

And run `webpack` via your preferred method.

## Options

Type: `Object`
Default: `{ bare: true }`

Options for CoffeeScript. All possible options you can find [here](https://coffeescript.org/#nodejs-usage).

Documentation for the `transpile` option you can find [here](https://coffeescript.org/#transpilation).

> ℹ️ The `sourceMap` option takes a value from the `compiler.devtool` value by default.

> ℹ️ The `filename` option takes a value from webpack loader API. The option value will be ignored.

**webpack.config.js**

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.coffee$/,
        loader: "coffee-loader",
        options: {
          bare: false,
          transpile: {
            presets: ["@babel/env"],
          },
        },
      },
    ],
  },
};
```

## Examples

### CoffeeScript and Babel

From CoffeeScript 2 documentation:

> CoffeeScript 2 generates JavaScript that uses the latest, modern syntax.
> The runtime or browsers where you want your code to run might not support all of that syntax.
> In that case, we want to convert modern JavaScript into older JavaScript that will run in older versions of Node or older browsers; for example, { a } = obj into a = obj.a.
> This is done via transpilers like Babel, Bublé or Traceur Compiler.

You'll need to install `@babel/core` and `@babel/preset-env` and then create a configuration file:

```console
npm install --save-dev @babel/core @babel/preset-env
echo '{ "presets": ["@babel/env"] }' > .babelrc
```

**webpack.config.js**

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.coffee$/,
        loader: "coffee-loader",
        options: {
          transpile: {
            presets: ["@babel/env"],
          },
        },
      },
    ],
  },
};
```

### Literate CoffeeScript

For using Literate CoffeeScript you should setup:

**webpack.config.js**

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.coffee$/,
        loader: "coffee-loader",
        options: {
          literate: true,
        },
      },
    ],
  },
};
```

## Contributing

Please take a moment to read our contributing guidelines if you haven't yet done so.

[CONTRIBUTING](https://github.com/webpack-contrib/coffee-loader/blob/master/.github/CONTRIBUTING.md)

## License

[MIT](https://github.com/webpack-contrib/coffee-loader/blob/master/LICENSE)

[npm]: https://img.shields.io/npm/v/coffee-loader.svg
[npm-url]: https://npmjs.com/package/coffee-loader
[node]: https://img.shields.io/node/v/coffee-loader.svg
[node-url]: https://nodejs.org
[deps]: https://david-dm.org/webpack-contrib/coffee-loader.svg
[deps-url]: https://david-dm.org/webpack-contrib/coffee-loader
[tests]: https://github.com/webpack-contrib/coffee-loader/workflows/coffee-loader/badge.svg
[tests-url]: https://github.com/webpack-contrib/coffee-loader/actions
[cover]: https://codecov.io/gh/webpack-contrib/coffee-loader/branch/master/graph/badge.svg
[cover-url]: https://codecov.io/gh/webpack-contrib/coffee-loader
[chat]: https://badges.gitter.im/webpack/webpack.svg
[chat-url]: https://gitter.im/webpack/webpack
[size]: https://packagephobia.now.sh/badge?p=coffee-loader
[size-url]: https://packagephobia.now.sh/result?p=coffee-loader
