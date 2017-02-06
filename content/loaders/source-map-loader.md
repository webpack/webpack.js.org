---
title: source-map-loader
source: https://raw.githubusercontent.com/webpack-contrib/source-map-loader/master/README.md
edit: https://github.com/webpack-contrib/source-map-loader/edit/master/README.md
---
# source map loader for webpack

Extracts SourceMaps for source files that as added as `sourceMappingURL` comment.

## Usage

[Documentation: Using loaders](https://webpack.js.org/concepts/#loaders)


### Example webpack config

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

## License

MIT (http://www.opensource.org/licenses/mit-license.php)
