---
title: source-map-loader
source: https://raw.githubusercontent.com/webpack/source-map-loader/master/README.md
edit: https://github.com/webpack/source-map-loader/edit/master/README.md
---
# webpack的source map loader

Extracts SourceMaps for source files that as added as `sourceMappingURL` comment.
为源文件提取SourceMaps作为sourceMappingURL注释。

## 使用

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

This extracts all SourceMaps from all files. That's not so performance-wise so you may only want to apply the loader to relevant files.
这将从所有文件中提取所有SourceMaps。这不是那么的性能，所以你可能只想把loader应用到相关的文件中去。

## License

MIT (http://www.opensource.org/licenses/mit-license.php)

***

> 原文：https://webpack.js.org/loaders/source-map-loader/
