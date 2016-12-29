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
When we do have multiple configurations in mind for different environments, the easiest way is to write seperate js files for 
each environment. For example:
##config/dev.js
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
##config/prod.js
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
Have our webpack.config.js has the following snippet:
```js
return require('./config/' + env + '.js')({ env: env })
```
And from our package.json, where we build our application using webpack, the command goes like this:
```js
 "build:dev": "webpack --env=dev --progress --profile --colors",
 "build:dist": "webpack --env=qa --progress --profile --colors",
```

You could see that we passed the environment variable to our webpack.config.js file. From there we used a simple
switch-case to build for the environment we passed by simply loading the right js file.

An advanced approach would be to have a base configuration file, put in all common functionalities,
and then have environment specific files and simply use 'webpack-merge' to merge them. This would help to avoid code repetitions.

To manage different variables for different environments, the approach is to use 'Define plugin':
Create global constants. Have their values decided in the environment specific files.
