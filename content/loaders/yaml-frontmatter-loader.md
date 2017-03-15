---
title: yaml-frontmatter-loader
source: https://raw.githubusercontent.com/webpack-contrib/yaml-frontmatter-loader/master/README.md
edit: https://github.com/webpack-contrib/yaml-frontmatter-loader/edit/master/README.md
---
## yaml-frontmatter-loader for webpack

YAML Frontmatter loader for [webpack](http://webpack.github.io/). YAML转换为JSON格式。 你应该使用[json-loader](https://github.com/webpack/json-loader)控制它的格式。

## 安装

`npm install yaml-frontmatter-loader`

## 使用

[文档: 使用加载器](http://webpack.github.io/docs/using-loaders.html)

``` javascript

var json = require("json!yaml-frontmatter-loader!./file.md");
// => returns file.md as javascript object
```

## 许可证

MIT (http://www.opensource.org/licenses/mit-license.php)
