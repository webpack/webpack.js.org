---
title: source-map-loader
source: https://raw.githubusercontent.com/webpack/source-map-loader/master/README.md
edit: https://github.com/webpack/source-map-loader/edit/master/README.md
---
# webpack的source map loader

为原文件提取SourceMaps作为 `sourceMappingURL` 的注释。

## Usage

[文档：使用loaders](https://webpack.js.org/concepts/#loaders)

### webpack配置示例

``` javascript
module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        use: ["source-map-loader"],
        enforce: "pre"
      }
    ]
  }
};
```

这将从所有文件中提取所有SourceMaps。这不是那么的性能，所以你可能只想应用加载器到相关的文件。

## License

MIT (http://www.opensource.org/licenses/mit-license.php)

***

> 原文：https://webpack.js.org/loaders/source-map-loader/
