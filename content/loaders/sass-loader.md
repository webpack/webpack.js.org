---
title: sass-loader
source: https://raw.githubusercontent.com/webpack-contrib/sass-loader/master/README.md
edit: https://github.com/webpack-contrib/sass-loader/edit/master/README.md
---
## 安装

```bash
npm install sass-loader node-sass webpack --save-dev
```
sass-loader的[`peerDependency`](https://docs.npmjs.com/files/package.json#peerdependencies)有[node-sass](https://github.com/sass/node-sass) 和 [webpack](https://github.comwebpack)，因此能够精确控制它们的版本。

## 例子
sass-loader与[css-loader](https://github.com/webpack-contrib/css-loader)和[style-loader](https://github.com/webpack-contrib/style-loader)链式调用，可以将所有的样式应用于DOM元素。

```js
// webpack.config.js
module.exports = {
	...
    module: {
        rules: [{
            test: /\.scss$/,
            use: [{
                loader: "style-loader" // 从JS字符串生成样式节点
            }, {
                loader: "css-loader" // 将CSS转化成CommonJS
            }, {
                loader: "sass-loader" // 将Sass编译成CSS
            }]
        }]
    }
};
```
也可以通过指定`options`参数，向[node-sass](https://github.com/andrew/node-sass)传递选项参数。比如：

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

Sass的更多参数见[node-sass](https://github.com/andrew/node-sass)。

### 生产环境
通常，生产环境下比较推荐的做法是使用[ExtractTextPlugin](https://github.com/webpack-contrib/extract-text-webpack-plugin)，将样式表抽离成独立文件。这样，样式表将不依赖于JS：

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
                // use style-loader in development
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

### 导入
webpack提供一种高级的机制来解析(？)文件，（sass-loader就使用了这种机制）。sass-loader使用node-sass的自定义导入特性（？），将所有的query传递给解析器。因此你可以导入node_modules里面的sass模块。只要你在它们前面加上`~`，告诉webpack它不是一个相对路径。
webpack provides an [advanced mechanism to resolve files](http://webpack.github.io/docs/resolving.html). The sass-loader uses node-sass' custom importer feature to pass all queries to the webpack resolving engine. Thus you can import your Sass modules from `node_modules`. Just prepend them with a `~` to tell webpack that this is not a relative import:

```css
@import "~bootstrap/css/bootstrap";
```
注意：必须以`~`开头，因为`~/`会解析成home目录。webpack需要区分`bootstrap`和`~bootstrap`。因为webpack没有特殊语法来区分是否是相对路径，`@import "file"`就等同于`@import "./file"`；

### `url(...)`的问题

因为Sass/[libsass](https://github.com/sass/libsass)并没有提供[url rewriting](https://github.com/sass/libsass/issues/532)，所有的链接资源都与output（？）相关。
- 如果生成的css没有传递给css-loader，它相对于网站的根目录。
- 如果生成的csss是传递给css-loader，它相对于入口文件（比如:`main.scss`）。

第二种情况可能会带来一些问题。正常情况下我们期望相对路径是相对于`.scss`，如同在`.css`文件一样。幸运的是，有2个方法可以解决这个问题：
- 用[resolve-url-loader](https://github.com/bholloway/resolve-url-loader)重写省略的url路径，将它设置于`sass-loader`之后(loader数组中)。
- 库的作者一般都会提供变量用来设置资源路径，如[bootstrap-sass](https://github.com/twbs/bootstrap-sass)可以通过`$icon-font-path`来设置。见[this working bootstrap example](https://github.com/webpack-contrib/sass-loader/tree/master/test/bootstrapSass)。

### 提取样式表
使用webpack打包CSS有许多优点，在开发环境可以通过hashed urls（？）引用图片和字体资源，[hot module replacement](https://webpack.js.org/concepts/hot-module-replacement/)。而在线上环境，使样式依赖JS执行环境并不是一个好的实践。渲染会被推迟，甚至会出现[FOUC](https://en.wikipedia.org/wiki/Flash_of_unstyled_content),因此线上环境最好能够将CSS放在单独的文件中。
有2种方法提取样式表：
- [extract-loader](https://github.com/peerigon/extract-loader) (简单，专门针对css-loader的输出)
- [extract-text-webpack-plugin](https://github.com/webpack-contrib/extract-text-webpack-plugin) (复杂，但能够处理足够多的场景)
### Source maps
要启用CSSsource maps，需要将`sourceMap`选项作为参数，传递给sass-loader*和*css-loader。此时`webpack.config.js`如下：

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
如果你要再Chrome中编辑原始的Sass文件，可以阅读这篇文章[there's a good blog post](https://medium.com/@toolmantim/getting-started-with-css-sourcemaps-and-in-browser-sass-editing-b4daab987fb0). [test/sourceMap](https://github.com/webpack-contrib/sass-loader/tree/master/test)是一个运行的示例。

### 环境变量

If you want to prepend Sass code before the actual entry file, you can set the `data` option. In this case, the sass-loader will not override the `data` option but just append the entry's content. This is especially useful when some of your Sass variables depend on the environment:
如果你要将Sass代码放在实际的入口文件之前，可以设置`data`选项。这时sass-loader不会覆盖`data`选项，只会将它在入口文件的内容之前。当sass变量依赖于环境时，这一点尤其有用。
```javascript
{
    loader: "sass-loader",
    options: {
        data: "$env: " + process.env.NODE_ENV + ";"
    }
}
```

**注意:** 由于注入代码, 会破坏整个文件的sourcemap. 通常一个简单的解决方案就是多Sass文件入口。

## Maintainers

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

[appveyor-url]: https://ci.appveyor.com/project/jhnns/sass-loader/branch/master
[appveyor]: https://ci.appveyor.com/api/projects/status/github/webpack-contrib/sass-loader?svg=true

[cover]: https://coveralls.io/repos/github/webpack-contrib/sass-loader/badge.svg
[cover-url]: https://coveralls.io/github/webpack-contrib/sass-loader

[chat]: https://badges.gitter.im/webpack-contrib/webpack.svg
[chat-url]: https://gitter.im/webpack-contrib/webpack

> 原文：https://webpack.js.org/***/
