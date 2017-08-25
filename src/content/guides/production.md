---
title: Production
sort: 7
contributors:
  - henriquea
  - rajagopal4890
  - markerikson
  - simon04
  - kisnows
  - chrisVillanueva
  - swapnilmishra
  - bring2dip
  - redian
  - skipjack
  - xgqfrms
---

The following article describes the best practices and tools to use when using webpack to build a production version of a site or application.


## The Automatic Way

Running `webpack -p` (or equivalently `webpack --optimize-minimize --define process.env.NODE_ENV="'production'"`). This performs the following steps:

- Minification using `UglifyJsPlugin`
- Runs the `LoaderOptionsPlugin` (see its [documentation](/plugins/loader-options-plugin))
- Sets the NodeJS environment variable triggering certain packages to compile differently


### Minification

webpack comes with `UglifyJsPlugin`, which runs [UglifyJS](http://lisperator.net/uglifyjs/) in order to minimize the output. The plugin supports all of the [UglifyJS options](https://github.com/mishoo/UglifyJS2#usage). Specifying `--optimize-minimize` on the command line, the following plugin configuration is added:

```js
// webpack.config.js
const webpack = require('webpack');

module.exports = {
  /*...*/
  plugins:[
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: options.devtool && (options.devtool.indexOf("sourcemap") >= 0 || options.devtool.indexOf("source-map") >= 0)
    })
  ]
};
```

Thus, depending on the [devtool options](/configuration/devtool), Source Maps are generated.


### Source Maps

We encourage you to have source maps enabled in production, as they are useful for debugging as well as running benchmark tests. webpack can generate inline source maps within bundles or as separate files.

In your configuration, use the `devtool` object to set the Source Map type. We currently support seven types of source maps. You can find more information about them in our [configuration](/configuration/devtool) documentation page (`cheap-module-source-map` is one of the simpler options, using a single mapping per line).


### Node Environment Variable

Running `webpack -p` (or `--define process.env.NODE_ENV="'production'"`) invokes the [`DefinePlugin`](/plugins/define-plugin) in the following way:

```js
// webpack.config.js
const webpack = require('webpack');

module.exports = {
  /*...*/
  plugins:[
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    })
  ]
};
```

The `DefinePlugin` performs search-and-replace operations on the original source code. Any occurrence of `process.env.NODE_ENV` in the imported code is replaced by `"production"`. Thus, checks like `if (process.env.NODE_ENV !== 'production') console.log('...')` are evaluated to `if (false) console.log('...')` and finally minified away using `UglifyJS`.

T> Technically, `NODE_ENV` is a system environment variable that Node.js exposes into running scripts. It is used by convention to determine development-vs-production behavior by server tools, build scripts, and client-side libraries. Contrary to expectations, `process.env.NODE_ENV` is not set to `"production"` __within__ the build script `webpack.config.js`, see [#2537](https://github.com/webpack/webpack/issues/2537). Thus, conditionals like `process.env.NODE_ENV === 'production' ? '[name].[hash].bundle.js' : '[name].bundle.js'` do not work as expected. See how to use [environment variables](/guides/environment-variables).


## The Manual Way

When we do have multiple configurations in mind for different environments, the easiest approach is to write separate webpack configurations for each environment.


### Simple Approach

The simplest way to do this is just to define two fully independent configuration files, like so:

__webpack.dev.js__

```js
module.exports = {
  devtool: 'cheap-module-source-map',

  output: {
    path: path.join(__dirname, '/../dist/assets'),
    filename: '[name].bundle.js',
    publicPath: publicPath,
    sourceMapFilename: '[name].map'
  },

  devServer: {
    port: 7777,
    host: 'localhost',
    historyApiFallback: true,
    noInfo: false,
    stats: 'minimal',
    publicPath: publicPath
  }
}
```

__webpack.prod.js__

```js
module.exports = {
  output: {
    path: path.join(__dirname, '/../dist/assets'),
    filename: '[name].bundle.js',
    publicPath: publicPath,
    sourceMapFilename: '[name].map'
  },

  plugins: [
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false
    }),
    new webpack.optimize.UglifyJsPlugin({
      beautify: false,
      mangle: {
        screw_ie8: true,
        keep_fnames: true
      },
      compress: {
        screw_ie8: true
      },
      comments: false
    })
  ]
}
```

Then, by tweaking the `scripts` in your `package.json`, like so:

__package.json__

```js
"scripts": {
  ...
  "build:dev": "webpack --env=dev --progress --profile --colors",
  "build:dist": "webpack --env=prod --progress --profile --colors"
}
```

you can now toggle between the two configurations by turning our base configuration into a function and accepting the `env` parameter (set via `--env`):

__webpack.config.js__

```js
module.exports = function(env) {
  return require(`./webpack.${env}.js`)
}
```

See the CLI's [common options section](/api/cli#common-options) for more details on how to use the `env` flag.


### Advanced Approach

A more complex approach would be to have a base configuration file, containing the configuration common to both environments, and then merge that with environment specific configurations. This would yield the full configuration for each environment and prevent repetition for the common bits.

The tool used to perform this "merge" is simply called [webpack-merge](https://github.com/survivejs/webpack-merge) and provides a variety of merging options, though we are only going to use the simplest version of it below.

We'll start by adding our base configuration:

__webpack.common.js__

```js
module.exports = {
  entry: {
    'polyfills': './src/polyfills.ts',
    'vendor': './src/vendor.ts',
    'main': './src/main.ts'
  },

  output: {
    path: path.join(__dirname, '/../dist/assets'),
    filename: '[name].bundle.js',
    publicPath: publicPath,
    sourceMapFilename: '[name].map'
  },

  resolve: {
    extensions: ['.ts', '.js', '.json'],
    modules: [path.join(__dirname, 'src'), 'node_modules']
  },

  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: [/\.(spec|e2e)\.ts$/],
        use: [
          'awesome-typescript-loader',
          'angular2-template-loader'
        ]
      },
      {
        test: /\.css$/,
        use: ['to-string-loader', 'css-loader']
      },
      {
        test: /\.(jpg|png|gif)$/,
        use: 'file-loader'
      },
      {
        test: /\.(woff|woff2|eot|ttf|svg)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 100000
          }
        }
      }
    ]
  },

  plugins: [
    new ForkCheckerPlugin(),

    new webpack.optimize.CommonsChunkPlugin({
      name: ['polyfills', 'vendor'].reverse()
    }),

    new HtmlWebpackPlugin({
      template: 'src/index.html',
      chunksSortMode: 'dependency'
    })
  ]
}
```

And then merge this common configuration with an environment specific configuration file using `webpack-merge`. Let's look at an example where we merge our production file:

__webpack.prod.js__

```js
const Merge = require('webpack-merge');
const CommonConfig = require('./webpack.common.js');

module.exports = Merge(CommonConfig, {
  plugins: [
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false
    }),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      beautify: false,
      mangle: {
        screw_ie8: true,
        keep_fnames: true
      },
      compress: {
        screw_ie8: true
      },
      comments: false
    })
  ]
})
```

You will notice three major updates to our 'webpack.prod.js' file:

- Use `webpack-merge` to combine it with the 'webpack.common.js'.
- We moved the `output` property to `webpack.common.js` as it is common to all environments.
- We defined `'process.env.NODE_ENV'` as `'production'` using the `DefinePlugin` only in `webpack.prod.js`.

The example above only demonstrates a few typical configuration options used in each (or both) environments. Now that you know how to split up configurations, the choice of what options go where is up to you.
