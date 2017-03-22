---
title: Building for Production
sort: 40
contributors:
  - henriquea
  - rajagopal4890
  - markerikson
  - simon04
  - kisnows
  - chrisVillanueva
  - swapnilmishra
  - bring2dip
---

This page explains how to generate production builds with webpack.

## The automatic way

Running `webpack -p` (or equivalently `webpack --optimize-minimize --define process.env.NODE_ENV="'production'"`). This performs the following steps:

- Minification using `UglifyJsPlugin`
- Runs the `LoaderOptionsPlugin`, see its [documentation](/plugins/loader-options-plugin)
- Sets the Node environment variable

### Minification

webpack comes with `UglifyJsPlugin`, which runs [UglifyJS](http://lisperator.net/uglifyjs/) in order to minimize the output. The plugin supports all of [UglifyJS options](https://github.com/mishoo/UglifyJS2#usage). Specifying `--optimize-minimize` on the command line, the following plugin configuration is added:

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

We encourage you to have Source Maps enabled in production. They are useful for debugging and to run benchmark tests. webpack can generate inline Source Maps included in the bundles or separated files.

In your configuration, use the `devtool` object to set the Source Map type. We currently support seven types of Source Maps. You can find more information about them in our [configuration](/configuration/devtool) documentation page.

One of the good options to go is using `cheap-module-source-map` which simplifies the Source Maps to a single mapping per line.

### Node environment variable

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

T> Technically, `NODE_ENV` is a system environment variable that Node.js exposes into running scripts. It is used by convention to determine development-vs-production behavior, by both server tools, build scripts, and client-side libraries. Contrary to expectations, `process.env.NODE_ENV` is not set to `"production"` __within__ the build script `webpack.config.js`, see [#2537](https://github.com/webpack/webpack/issues/2537). Thus, conditionals like `process.env.NODE_ENV === 'production' ? '[name].[hash].bundle.js' : '[name].bundle.js'` do not work as expected. See how to use [environment variables](/guides/environment-variables).

## The manual way: Configuring webpack for multiple environments

When we do have multiple configurations in mind for different environments, the easiest way is to write separate js files for
each environment. For example:

** dev.js **
```js
module.exports = function (env) {
  return {
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
}
```

** prod.js **
```js
module.exports = function (env) {
  return {
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
}
```
Have the following snippet in your webpack.config.js:
```js
function buildConfig(env) {
  return require('./config/' + env + '.js')(env)
}

module.exports = buildConfig;
```
And from our package.json, where we build our application using webpack, the command goes like this:
```js
 "build:dev": "webpack --env=dev --progress --profile --colors",
 "build:dist": "webpack --env=prod --progress --profile --colors",
```

You could see that we passed the environment variable to our webpack.config.js file. From there we used a simple
switch-case to build for the environment we passed by simply loading the right js file.

An advanced approach would be to have a base configuration file, put in all common functionalities,
and then have environment specific files and simply use 'webpack-merge' to merge them. This would help to avoid code repetitions.
For example, you could have all your base configurations like resolving your js, ts, png, jpeg, json and so on.. in a common base file as follows:

** base.js **
```js
module.exports = function() {
    return {
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
            rules: [{
                test: /\.ts$/,
                use: [
                    'awesome-typescript-loader',
                    'angular2-template-loader'
                ],
                exclude: [/\.(spec|e2e)\.ts$/]
            }, {
                test: /\.css$/,
                use: ['to-string-loader', 'css-loader']
            }, {
                test: /\.(jpg|png|gif)$/,
                use: 'file-loader'
            }, {
                test: /\.(woff|woff2|eot|ttf|svg)$/,
                use: {
                  loader: 'url-loader',
                  options: {
                    limit: 100000
                  }
                }
            }],
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
        ],
    };
}
```
And then merge this base config with an environment specific configuration file using 'webpack-merge'.
Let us look at an example where we merge our prod file, mentioned above, with this base config file using 'webpack-merge':

** prod.js (updated) **
```js
const webpackMerge = require('webpack-merge');

const commonConfig = require('./base.js');

module.exports = function(env) {
    return webpackMerge(commonConfig(), {
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
}
```
You will notice three major updates to our 'prod.js' file.
* 'webpack-merge' with the 'base.js'.
* We have move 'output' property to 'base.js'. Just to stress on that point that our output property, here, is common across all our environments and that we refactored our 'prod.js' and moved it to our 'base.js', the common configuration file.
* We have defined the 'process.env.NODE_ENV' to be 'production' using the 'DefinePlugin'. Now across the application 'process.env.NODE_ENV' would have the value, 'production', when we build our application for production environment. Likewise we can manage various variables of our choice, specific to environments this way.

The choice of what is going to be common across all your environments is up to you, however. We have just demonstrated a few that could typically be common across environments when we build our application.
