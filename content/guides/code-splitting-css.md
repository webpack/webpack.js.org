---
title: 代码拆分 - CSS
sort: 31
contributors:
  - pksjce
  - jonwheeler
  - johnstew
---

如果你使用 `css-loader`，并且在 JavaScript 文件里导入了 CSS，webpack 会把 CSS 代码和 JavaScript 代码一块打包。
这样做的坏处是，浏览器不能异步或并行加载你的 CSS 代码。也就是说，浏览器在加载整个 JavaScript 打包文件后，才能开始渲染 CSS。
webpack 能很好地解决这个问题，通过使用 [extract-text-webpack-plugin](https://github.com/webpack/extract-text-webpack-plugin) 和 [`css-loader`](https://github.com/webpack/css-loader)，来把 CSS 打包文件分离开来。

## 使用 `css-loader`

你可以使用 [`css-loader`](https://github.com/webpack/css-loader) 来向你的 JavaScript 代码导入 CSS [模块](/concept/modules)。
`css-loader` 在 webpack 中的配置可以参考下面的代码：

```javascript
//webpack.config.js

module.exports = function(env){
    entry: '..',
    ...
    module: {
        rules: [{
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

### 在 loader 项中

在之前使用 `css-loader` 例子中，我们再加上 `ExtractTextPlugin` 插件：

```javascript
...
use: ExtractTextPlugin.extract({loader:'css-loader',options:{sourceMap:true}) //Can be used without sourcemaps too.
...
```

### 在 plugins 项中

```javascript
new ExtractTextPlugin({ filename: 'bundle.css', disable: false, allChunks: true })
```

通过上面的两步配置，我们生成了一个独立的 CSS 模块的打包文件，然后便可以在 `index.html` 中将它导入。
关于 `ExtractTextPlugin` 插件 API 的更多信息，请参考[这里](https://github.com/webpack/extract-text-webpack-plugin#api)。

下面是使用 `ExtractTextPlugin` 分割  CSS 的完整配置：

```javascript
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var path = require('path');

module.exports = function () {
    return {
        entry: './main.js',
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: 'bundle.js'
        },
        module: {
            rules: [{
                test: /\.css$/,
                exclude: /node_modules/,
                use: ExtractTextPlugin.extract({
                    loader: 'css-loader',
                    options: {
                      sourceMap: true
                    }
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

***

> 原文：https://webpack.js.org/guides/code-splitting-css/