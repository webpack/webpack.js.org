---
title: 代码分离 - CSS
sort: 31
contributors:
  - pksjce
  - jonwheeler
  - johnstew
  - simon04
  - shinxi
---

为了用 webpack 对 CSS 文件进行打包，你可以像[其它模块](/concepts/modules)一样将 CSS 引入到你的 JavaScript 代码中，同时用 `css-loader` (像 JS 模块一样输出 CSS)，也可以选择使用 `ExtractTextWebpackPlugin` (将打好包的 CSS 提出出来并输出成 CSS 文件)。

## 引入 CSS

像 JavaScript 模块一样引入 CSS 文件，例如在 `vendor.js` 中:

```javascript
import 'bootstrap/dist/css/bootstrap.css';
```

## 使用 `css-loader`

在 `webpack.config.js` 中，配置[`css-loader`](/loaders/css-loader)，例子如下:

```javascript
module.exports = {
    module: {
        rules: [{
            test: /\.css$/,
            use: 'css-loader'
        }]
    }
}
```

这样，CSS 会跟你的 JavaScript 打包在一起。

这里有一个缺点就是，你无法使用浏览器的能力，去异步且并行去加载 CSS。取而代之的是，你的页面需要等待整个 JavaScript 文件加载完，才能进行样式渲染。

webpack 能够用 `ExtractTextWebpackPlugin` 帮助你将 CSS 单独打包，以解决以上问题。

## 使用 `ExtractTextWebpackPlugin`

安装 [`ExtractTextWebpackPlugin`](/plugins/extract-text-webpack-plugin)
```
npm i --save-dev extract-text-webpack-plugin@beta
```

为了使用这个插件，它需要通过2步被配置到 `webpack.config.js` 文件中。

```diff
module.exports = {
    module: {
         rules: [{
             test: /\.css$/,
-            use: 'css-loader'
+            use: ExtractTextPlugin.extract({
+                use: 'css-loader'
+            })
         }]
     },
+    plugins: [
+        new ExtractTextPlugin('styles.css'),
+    ]
}
```

通过以上两步，你可以将所有的 CSS 模块生成一个新的文件，同时你可以将它作为一个单独标签添加到 `index.html`中。

***

> 原文：https://webpack.js.org/guides/code-splitting-css/