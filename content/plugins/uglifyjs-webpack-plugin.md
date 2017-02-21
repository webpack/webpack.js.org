---
title: UglifyjsWebpackPlugin
source: https://raw.githubusercontent.com/webpack-contrib/uglifyjs-webpack-plugin/master/README.md
edit: https://github.com/webpack-contrib/uglifyjs-webpack-plugin/edit/master/README.md
---
[![build status](https://secure.travis-ci.org/webpack-contrib/uglifyjs-webpack-plugin.svg)](http://travis-ci.org/webpack-contrib/uglifyjs-webpack-plugin) [![bitHound Score](https://www.bithound.io/github/webpack-contrib/uglifyjs-webpack-plugin/badges/score.svg)](https://www.bithound.io/github/webpack-contrib/uglifyjs-webpack-plugin) [![codecov](https://codecov.io/gh/webpack-contrib/uglifyjs-webpack-plugin/branch/master/graph/badge.svg)](https://codecov.io/gh/webpack-contrib/uglifyjs-webpack-plugin)

# UglifyJS Webpack Plugin

这个插件使用 [UglifyJS](https://github.com/mishoo/UglifyJS2) 去压缩你的JavaScript代码。除了它从 webpack 中解耦之外，它和 webpack 核心插件 (`webpack.optimize.UglifyJSPlugin`) 是同一个插件。这允许你控制你正在使用的 UglifyJS 的版本。

> 注意，webpack 在 `webpack.optimize.UglifyJsPlugin` 下包含相同的插件。对于那些想控制 UglifyJS 版本的开发者来说，这是一个独立的版本。除了这种情况下的安装说明，文档是有效的。

## 使用

首先，安装这个插件:

```bash
yarn add uglifyjs-webpack-plugin --dev
```

..或者你坚持使用npm，而不是更先进的 [Yarn](https://yarnpkg.com):

```bash
npm install uglifyjs-webpack-plugin --save-dev
```

**十分重要!** 这个插件这个插件依赖 uglify-js，所以为了使用这个插件，也要安装 uglify-js。然而，目前 (2017/1/25) 可用的 uglify-js npm 包，不支持压缩 ES6 代码。为了支持 ES6，必须提供一个具有压缩 ES6 能力的版本，又称之为 _harmony_ 版本。

如果你的压缩目标是 ES6:

```bash
yarn add git://github.com/mishoo/UglifyJS2#harmony --dev
```

如果你的压缩目标是 ES5:

```bash
yarn add uglify-js --dev
```

然后配置如下:

```javascript
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  entry: {...},
  output: {...},
  module: {...},
  plugins: [
    new UglifyJSPlugin()
  ]
};
```

就是这样了!

## 选项

这个插件支持 UglifyJS 的功能，如下所述:

| 属性 | 类型 | 默认值 | 描述 |
| --- | --- | --- | --- |
| compress | boolean, object | true | 见 [UglifyJS 文档](http://lisperator.net/uglifyjs/compress)。 |
| mangle | boolean, object | true | 见下节. |
| beautify | boolean | false | 美化输出。 |
| output | 一个提供 UglifyJS [OutputStream](https://github.com/mishoo/UglifyJS2/blob/master/lib/output.js) 选项的对象 | | 更底层地访问 UglifyJS 输出。 |
| comments | boolean, RegExp, function(astNode, comment) -> boolean | 默认保存包含 `/*!`, `/**!`, `@preserve` or `@license` 的注释 | 注释相关的配置 |
| sourceMap | boolean | false | 使用 SourceMaps 将错误信息的位置映射到模块。这会减慢编译的速度。 |
| test | RegExp, Array<RegExp> | <code>/\.js($&#124;\?)/i</code> | 测试匹配的文件 |
| include | RegExp, Array<RegExp> | | 只测试包含的文件。 |
| exclude | RegExp, Array<RegExp> | | 要从测试中排除的文件。 |

## Mangling

`mangle.props (boolean|object)` - 传递 true 或者一个对象可以启用并提供 UglifyJS mangling 属性选项 - 参考有关 mangleProperties 选项的 [UglifyJS 文档](https://github.com/mishoo/UglifyJS2#mangleproperties-options)。

> 注意：UglifyJS 警告，[如果你使用 mangling 属性，你可能会破坏你的 source](https://github.com/mishoo/UglifyJS2#mangling-property-names---mangle-props)，所以如果你不确定你为什么需要这个特性，你最好不要使用它！你可以按如下方式调整行为：

```javascript
new UglifyJsPlugin({
  mangle: {
    // 跳过这些
    except: ['$super', '$', 'exports', 'require']
  }
})
```

## License

MIT.
