---
title: Building for Production
sort: 13
contributors:
  - henriquea
---

Generating production builds with webpack is straight-forward. There are three things to keep in mind:

- Source Maps
- Node environment
- Minification

## Source Maps

We encourage you to have Source Maps enabled in production. They are useful for debugging and to run benchmark tests. Webpack can generate inline Source Maps included in the bundles or separated files.

In your configuration, use the `devtools` object to set the Source Map type. We currently support seven types of Source Maps. You can find more information about them in our [configuration](/configuration/devtool) documentation page.

One of the good options to go is using `cheap-module-source-map` which simplifies the Source Maps to a single mapping per line.

## Node environment variable

The second step is to tell webpack to generate a production build by setting the Node.js environment variable to `production`. webpack will not include any extra useful code, warnings and checks used in development.

The `DefinePlugin` creates **compile** time constants. Useful for injecting your Node.js environment as seen below.

?> TODO: Add a link to the `ProvidePlugin` documentation

```js
// webpack.config.js
const webpack = require('webpack');

module.exports = {
  /*...*/
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    })
  ]
  /*...*/
};
```

T> Spoiler: Setting the env var only won't make your bundle smaller. This take us to the last step:

## Minification

webpack comes with UglifyJS plugin which minimize the output. You can pass an object containing [UglifyJS options](https://webpack.github.io/docs/list-of-plugins.html#uglifyjsplugin).

```js
// webpack.config.js
const webpack = require('webpack');

module.exports = {
  /*...*/
  plugins:[
    new webpack.DefinePlugin({
      'process.env':{
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress:{
        warnings: true
      }
    })
  ]
  /*...*/
};
```
## Configuring webpack for multiple environments

When we do have multiple configurations in mind for different environments, the easiest way is to write seperate js files for 
each environment. For example:
#### config/dev.js
```js
module.exports = function (env) {
    debug: true,
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
#### config/prod.js
```js
module.exports = function (env) {
    debug: false,
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
        new UglifyJsPlugin({
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
Have the following snippet in our webpack.config.js:
```js
function buildConfig(env) {
  return require('./config/' + env + '.js')({ env: env })
}

module.exports = buildConfig(env);
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

#### base.js
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
            extensions: ['', '.ts', '.js', '.json'],
            modules: [path.join(__dirname, 'src'), 'node_modules']

        },
        module: {
            loaders: [{
                test: /\.ts$/,
                loaders: [
                    'awesome-typescript-loader',
                    'angular2-template-loader'
                ],
                exclude: [/\.(spec|e2e)\.ts$/]
            }, {
                test: /\.css$/,
                loaders: ['to-string-loader', 'css-loader']
            }, {
                test: /\.(jpg|png|gif)$/,
                loader: 'file'
            }, {
                test: /\.(woff|woff2|eot|ttf|svg)$/,
                loader: 'url-loader?limit=100000'
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

#### prod.js (updated)
```js
const webpackMerge = require('webpack-merge');

const commonConfig = require('./base.js');

module.exports = function(env) {
    return webpackMerge(commonConfig(), {
        debug: false,
        plugins: [
            new webpack.LoaderOptionsPlugin({
                minimize: true,
                debug: false
            }),
            new webpack.DefinePlugin({
                'process.env': {
                    'NODE_ENV': JSON.stringify('prod')
                }
            }),
            new webpack.optimize.UglifyJsPlugin(), ({
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
* We have move 'output' property to 'base.js'. Just to stress on that point that our output property, here, is common across all our environments and that we refactored our 'prod.js' and moved it to our 'base.js', the common configuartion file. 
* We have defined the 'process.env.NODE_ENV' to be 'prod' using the 'DefinePlugin'. Now across the application 'process.env.NODE_ENV' would have the value, 'prod', when we build our application for production environment. Likewise we can manage various variables of our choice, specific to environments this way.

The choice of what is going to be common across all your environments is upto you, however. We have just demonstrated a few that could typically be common across environments when we build our application. 

You just saw, how powerful 'webpack-merge' is, that, it just saved us from a lot of code repetitions.
