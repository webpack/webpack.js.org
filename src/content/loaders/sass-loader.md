---
title: sass-loader
source: https://raw.githubusercontent.com/webpack-contrib/sass-loader/master/README.md
edit: https://github.com/webpack-contrib/sass-loader/edit/master/README.md
repo: https://github.com/webpack-contrib/sass-loader
---
Loads a SASS/SCSS file and compiles it to CSS.

Use the [css-loader](/loaders/css-loader/) or the [raw-loader](/loaders/raw-loader/) to turn it into a JS module and the [ExtractTextPlugin](/plugins/extract-text-webpack-plugin/) to extract it into a separate file.
Looking for the webpack 1 loader? Check out the [archive/webpack-1 branch](https://github.com/webpack-contrib/sass-loader/tree/archive/webpack-1).

## 安装

```bash
npm install sass-loader node-sass webpack --save-dev
```

[node-sass](https://github.com/sass/node-sass) 和 [webpack](https://github.com/webpack) 是 sass-loader 的 [`peerDependency`](https://docs.npmjs.com/files/package.json#peerdependencies)，因此能够精确控制它们的版本。

## 示例

通过将 [style-loader](https://github.com/webpack-contrib/style-loader) 和 [css-loader](https://github.com/webpack-contrib/css-loader) 与 sass-loader 链式调用，可以立刻将样式作用在 DOM 元素。

```js
// webpack.config.js
module.exports = {
  ...
  module: {
    rules: [{
      test: /\.scss$/,
      use: [{
          loader: "style-loader" // 将 JS 字符串生成为 style 节点
      }, {
          loader: "css-loader" // 将 CSS 转化成 CommonJS 模块
      }, {
          loader: "sass-loader" // 将 Sass 编译成 CSS
      }]
    }]
  }
};
```

也可以通过指定 `options` 参数，向 [node-sass](https://github.com/andrew/node-sass) 传递选项参数。例如：

```js
// webpack.config.js
module.exports = {
  ...
  module: {
    rules: [{
      test: /\.scss$/,
      use: [{
        loader: "style-loader"
      }, {
        loader: "css-loader"
      }, {
        loader: "sass-loader",
        options: {
          includePaths: ["absolute/path/a", "absolute/path/b"]
        }
      }]
    }]
  }
};
```

Sass 的更多选项参见 [node-sass](https://github.com/andrew/node-sass)。

##

通常，生产环境下比较推荐的做法是，使用 [ExtractTextPlugin](https://github.com/webpack-contrib/extract-text-webpack-plugin) 将样式表抽离成专门的单独文件。这样，样式表将不再依赖于 JavaScript：

```js
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const extractSass = new ExtractTextPlugin({
    filename: "[name].[contenthash].css",
    disable: process.env.NODE_ENV === "development"
});

module.exports = {
    ...
    module: {
        rules: [{
            test: /\.scss$/,
            use: extractSass.extract({
                use: [{
                    loader: "css-loader"
                }, {
                    loader: "sass-loader"
                }],
                // 在开发环境使用 style-loader
                fallback: "style-loader"
            })
        }]
    },
    plugins: [
        extractSass
    ]
};
```

## 使用

### 导入(Import)

webpack 提供一种[解析文件的高级的机制](https://webpack.js.org/concepts/module-resolution/)。sass-loader 使用 node-sass 的 custom importer 特性，将所有的 query 传递给 webpack 的解析引擎(resolving engine)。只要它们前面加上 `~`，告诉 webpack 它不是一个相对路径，这样就可以 import 导入 `node_modules` 目录里面的 sass 模块：

```css
@import "~bootstrap/dist/css/bootstrap";
```

重要的是，只在前面加上 `~`，因为 `~/` 会解析到主目录(home directory)。webpack 需要区分 `bootstrap` 和 `~bootstrap`，因为 CSS 和 Sass 文件没有用于导入相关文件的特殊语法。`@import "file"` 与 `@import "./file";` 这两种写法是相同的

### `url(...)` 的问题

由于 Sass/[libsass](https://github.com/sass/libsass) 并没有提供[url rewriting](https://github.com/sass/libsass/issues/532) 的功能，所以所有的链接资源都是相对输出文件(output)而言。

- 如果生成的 CSS 没有传递给 css-loader，它相对于网站的根目录。
- 如果生成的 CSS 传递给了 css-loader，则所有的 url 都相对于入口文件（例如：`main.scss`）。

第二种情况可能会带来一些问题。正常情况下我们期望相对路径的引用是相对于 `.scss` 去解析（如同在 `.css` 文件一样）。幸运的是，有2个方法可以解决这个问题：

- 将 [resolve-url-loader](https://github.com/bholloway/resolve-url-loader) 设置于 loader 链中的 sass-loader 之后，就可以重写 url。
- Library 作者一般都会提供变量，用来设置资源路径，如 [bootstrap-sass](https://github.com/twbs/bootstrap-sass) 可以通过 `$icon-font-path` 来设置。参见[this working bootstrap example](https://github.com/webpack-contrib/sass-loader/tree/master/test/bootstrapSass)。

### 提取样式表

使用 webpack 打包 CSS 有许多优点，在开发环境，可以通过 hashed urls 或 [模块热替换(HMR)](https://webpack.js.org/concepts/hot-module-replacement/) 引用图片和字体资源。而在线上环境，使样式依赖 JS 执行环境并不是一个好的实践。渲染会被推迟，甚至会出现 [FOUC](https://en.wikipedia.org/wiki/Flash_of_unstyled_content)，因此在最终线上环境构建时，最好还是能够将 CSS 放在单独的文件中。

从 bundle 中提取样式表，有2种可用的方法：

- [extract-loader](https://github.com/peerigon/extract-loader) （简单，专门针对 css-loader 的输出）
- [extract-text-webpack-plugin](https://github.com/webpack-contrib/extract-text-webpack-plugin) (复杂，但能够处理足够多的场景)

### Source maps

要启用 CSS source map，需要将 `sourceMap` 选项作为参数，传递给 *sass-loader* 和 *css-loader*。此时`webpack.config.js` 如下：

```javascript
module.exports = {
    ...
    devtool: "source-map", // any "source-map"-like devtool is possible
    module: {
        rules: [{
            test: /\.scss$/,
            use: [{
                loader: "style-loader"
            }, {
                loader: "css-loader", options: {
                    sourceMap: true
                }
            }, {
                loader: "sass-loader", options: {
                    sourceMap: true
                }
            }]
        }]
    }
};
```

如果你要在 Chrome 中编辑原始的 Sass 文件，建议阅读[这篇不错的博客文章](https://medium.com/@toolmantim/getting-started-with-css-sourcemaps-and-in-browser-sass-editing-b4daab987fb0)。具体示例参考 [test/sourceMap](https://github.com/webpack-contrib/sass-loader/tree/master/test)。

### 环境变量

如果你要将 Sass 代码放在实际的入口文件(entry file)之前，可以设置 `data` 选项。此时 sass-loader 不会覆盖 `data` 选项，只会将它拼接在入口文件的内容之前。当 Sass 变量依赖于环境时，这一点尤其有用。

```javascript
{
    loader: "sass-loader",
    options: {
        data: "$env: " + process.env.NODE_ENV + ";"
    }
}
```

**注意：**由于代码注入, 会破坏整个入口文件的 source map。通常一个简单的解决方案是，多个 Sass 文件入口。

## 维护人员

<table>
    <tr>
      <td align="center">
        <a href="https://github.com/jhnns"><img width="150" height="150" src="https://avatars0.githubusercontent.com/u/781746?v=3"></a><br>
        <a href="https://github.com/jhnns">Johannes Ewald</a>
      </td>
      <td align="center">
        <a href="https://github.com/webpack-contrib"><img width="150" height="150" src="https://avatars1.githubusercontent.com/u/1243901?v=3&s=460"></a><br>
        <a href="https://github.com/webpack-contrib">Jorik Tangelder</a>
      </td>
      <td align="center">
        <a href="https://github.com/akiran"><img width="150" height="150" src="https://avatars1.githubusercontent.com/u/3403295?v=3"></a><br>
        <a href="https://github.com/akiran">Kiran</a>
      </td>
    <tr>
</table>


## License

[MIT](http://www.opensource.org/licenses/mit-license.php)

[npm]: https://img.shields.io/npm/v/sass-loader.svg
[npm-stats]: https://img.shields.io/npm/dm/sass-loader.svg
[npm-url]: https://npmjs.com/package/sass-loader

[node]: https://img.shields.io/node/v/sass-loader.svg
[node-url]: https://nodejs.org

[deps]: https://david-dm.org/webpack-contrib/sass-loader.svg
[deps-url]: https://david-dm.org/webpack-contrib/sass-loader

[travis]: http://img.shields.io/travis/webpack-contrib/sass-loader.svg
[travis-url]: https://travis-ci.org/webpack-contrib/sass-loader

[appveyor-url]: https://ci.appveyor.com/project/webpack-contrib/sass-loader/branch/master
[appveyor]: https://ci.appveyor.com/api/projects/status/rqpy1vaovh20ttxs/branch/master?svg=true

[cover]: https://codecov.io/gh/webpack-contrib/sass-loader/branch/master/graph/badge.svg
[cover-url]: https://codecov.io/gh/webpack-contrib/sass-loader

[chat]: https://badges.gitter.im/webpack/webpack.svg
[chat-url]: https://gitter.im/webpack/webpack

***

> 原文：https://webpack.js.org/loaders/sass-loader/
