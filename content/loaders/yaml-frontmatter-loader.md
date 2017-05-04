---
title: yaml-frontmatter-loader
source: https://raw.githubusercontent.com/webpack-contrib/yaml-frontmatter-loader/master/README.md
edit: https://github.com/webpack-contrib/yaml-frontmatter-loader/edit/master/README.md
---
## Install

`npm install yaml-frontmatter-loader`

## <a href="https://webpack.js.org/concepts/loaders/">Usage</a>

```js
var json = require("json-loader!yaml-frontmatter-loader!./file.md");
// => returns file.md as javascript object
```

### Configuration

**webpack.config.js**
```js
module.exports = {
  module: {
    rules: [
      {
         test: /\.md$/,
         use: [ 'json-loader', 'yaml-fontmatter-loader' ]
      }
    ]
  }
}
```

[npm]: https://img.shields.io/npm/v/yaml-fontmatter-loader.svg
[npm-url]: https://npmjs.com/package/yaml-fontmatter-loader

[node]: https://img.shields.io/node/v/yaml-fontmatter-loader.svg
[node-url]: https://nodejs.org

[deps]: https://david-dm.org/webpack-contrib/yaml-fontmatter-loader.svg
[deps-url]: https://david-dm.org/webpack-contrib/yaml-fontmatter-loader

[tests]: http://img.shields.io/travis/webpack-contrib/yaml-fontmatter-loader.svg
[tests-url]: https://travis-ci.org/webpack-contrib/yaml-fontmatter-loader

[cover]: https://codecov.io/gh/webpack-contrib/yaml-fontmatter-loader/branch/master/graph/badge.svg
[cover-url]: https://codecov.io/gh/webpack-contrib/yaml-fontmatter-loader

[chat]: https://badges.gitter.im/webpack/webpack.svg
[chat-url]: https://gitter.im/webpack/webpack
