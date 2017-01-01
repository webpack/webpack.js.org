---
title: 生产环境构建
sort: 13
contributors:
  - henriquea
  - xie-qianyue
---

使用 webpack 来构建生产版本 (production build) 并不困难。只需要记住下面三点：

- Source Maps
- Node 环境
- Minification

## Source Maps

我们鼓励你在生产环境中也使用 Source Maps。它有助于你进行调试和基准测试 (benchmark test)。Webpack 能够在打包文件 (bundle) 中嵌入 inline Source Maps，或者生成 Source Maps 到新的文件中。

在配置文件中使用 `devtools` 对象来设置 Source Maps 的类别。现阶段我们支持七种类别。你可以在[配置](configuration/devtool)页面里找到关于类别的更多信息。

`cheap-module-source-map` 是诸多实用选项之一，它能够简化 Source Maps，使其只包含对应的行信息。

## Node 环境变量

第二步便是设置 Node.js 环境变量为 `production`，以便 webpack 生成生产构建。Webpack 此时将不会生成或执行开发环境的额外代码，warning 和检查。

`DefinePlugin` 属性能够配置**编译**时常量。这对配置 Node.js 的环境变量非常有用，看下面的例子。

?> TODO: 加上 `ProvidePlugin` 属性的文档链接

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

T> 小提示: 配置环境变量并不能够使打包文件变小。Minification 将会在下一步也是最后一步谈到：

## Minification

Webpack 使用 UglifyJS 插件来缩小打包文件。你可以在初始化时传入一个包含 [UglifyJS 选项](https://webpack.github.io/docs/list-of-plugins.html#uglifyjsplugin) 的对象。

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
##Configuring webpack for multiple environments

When we do have multiple configurations in mind for different environments, the easiest way is to write seperate js files for
each environment. For example:
####config/dev.js
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
####config/prod.js
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

####base.js
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

####prod.js (updated)
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
