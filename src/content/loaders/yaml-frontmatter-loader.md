---
title: yaml-frontmatter-loader
source: https://raw.githubusercontent.com/webpack-contrib/yaml-frontmatter-loader/master/README.md
edit: https://github.com/webpack-contrib/yaml-frontmatter-loader/edit/master/README.md
repo: https://github.com/webpack-contrib/yaml-frontmatter-loader
---


YAML Frontmatter loader for [webpack](https://webpack.js.org/). Converts YAML in files to JSON. You should chain it with [json-loader](/loaders/json-loader/).

## 安装

`npm install yaml-frontmatter-loader`

## <a href="https://webpack.js.org/concepts/loaders/">用法</a>

```js
var json = require("json-loader!yaml-frontmatter-loader!./file.md");
// => 将 file.md 作为一个 javascript 对象返回
```

##

**webpack.config.js**
```js
module.exports = {
  module: {
    rules: [
      {
         test: /\.md$/,
         use: [ 'json-loader', 'yaml-frontmatter-loader' ]
      }
    ]
  }
}
```

[npm]: https://img.shields.io/npm/v/yaml-frontmatter-loader.svg
[npm-url]: https://npmjs.com/package/yaml-frontmatter-loader

[node]: https://img.shields.io/node/v/yaml-frontmatter-loader.svg
[node-url]: https://nodejs.org

[deps]: https://david-dm.org/webpack-contrib/yaml-frontmatter-loader.svg
[deps-url]: https://david-dm.org/webpack-contrib/yaml-frontmatter-loader

[tests]: http://img.shields.io/travis/webpack-contrib/yaml-frontmatter-loader.svg
[tests-url]: https://travis-ci.org/webpack-contrib/yaml-frontmatter-loader

[cover]: https://codecov.io/gh/webpack-contrib/yaml-frontmatter-loader/branch/master/graph/badge.svg
[cover-url]: https://codecov.io/gh/webpack-contrib/yaml-frontmatter-loader

[chat]: https://badges.gitter.im/webpack/webpack.svg
[chat-url]: https://gitter.im/webpack/webpack

***

> 原文：https://webpack.js.org/loaders/yaml-frontmatter-loader/
