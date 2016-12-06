---
title: 代码分割 - CSS
sort: 3
contributors:
  - pksjce
  - xie qianyue
---

如果你使用 css-loader，并且在 JavaScript 文件里导入了 CSS，webpack 会把 CSS 代码和 JavaScript 代码一块打包。
这样做的坏处是，浏览器不能异步或并行加载你的 CSS 代码。也就是说，浏览器在加载整个 JavaScript 打包文件后，才能开始渲染 CSS。
webpack 能很好地解决这个问题，通过使用 [extract-text-webpack-plugin](https://github.com/webpack/extract-text-webpack-plugin) 和 [css-loader](https://github.com/webpack/css-loader)，来把 CSS 打包文件分离开来。

## 使用 `css-loader`

你可以使用 [css-loader](https://github.com/webpack/css-loader) 来向你的 JavaScript 代码导入 CSS [模块](concept/modules)。
`css-loader` 在 webpack 中的配置可以参考下面的代码：

```javascript
//webpack.config.js

modules.exports = function(env){
    entry: '..',
    ...
    module: {
        loaders: [{
            test: /\.css$/,
            exclude: /node_modules/,
            loader: 'css-loader'
        }]
    }
    ...
}
```

## 使用 `extract-text-webpack-plugin` - ExtractTextPlugin

使用下面的命令来安装插件：

```
npm i --save-dev extract-text-webpack-plugin
```

为了使用 `ExtractTextPlugin` 插件, 我们需要在 `webpack.config.js` 中的两个地方作出配置.

### 在 loader 中

Adapting from the previous example with the `css-loader`, we should add `ExtractTextPlugin` as follows

```javascript
...
loader: ExtractTextPlugin.extract('css-loader?sourceMap') //Can be used without sourcemaps too.
...
```

### In the plugin

```javascript
new ExtractTextPlugin({ filename: 'bundle.css', disable: false, allChunks: true })
```

With above two steps, you can generate a new bundle specifically for all the CSS modules and add them as a separate tag in the `index.html`
For more info on how to use the api please go to [`ExtractTextPlugin` api](https://github.com/webpack/extract-text-webpack-plugin#api).

The full config for splitting css with `ExtractTextPlugin` is as follows

```javascript
var ExtractTextPlugin = require('extract-text-webpack-plugin');
module.exports = function () {
    return {
        entry: './main.js',
        output: {
            path: './dist',
            filename: 'bundle.js'
        },
        module: {
            loaders: [{
                test: /\.css$/,
                exclude: /node_modules/,
                loader: Extract.extract({
                    loader: 'css-loader?sourceMap'
                })
            }]
        },
        devtool: 'source-map',
        plugins: [
            new ExtractTextPlugin({ filename: 'bundle.css', disable: false, allChunks: true })
        ]
    }
}
```
