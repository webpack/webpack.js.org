---
title: mocha-loader
source: https://raw.githubusercontent.com/webpack/mocha-loader/master/README.md
edit: https://github.com/webpack/mocha-loader/edit/master/README.md
---
# webpack的mocha-loader
## 用法

### 命令行

*提示*: 当需要在命令行输入"！"时， 你需要在其前面插入 `\` 将其转义。

``` text
webpack-dev-server 'mocha!./my-client-tests.js' --options webpackOptions.js
```

``` text
enhanced-require 'mocha!./my-server-tests.js'
```
### 配置
#### webpack.config.js

```js

module.exports = {
    entry: './entry-file.js',
    output: {
        path: __dirname,
        filename: 'bundle.js'
    }
}
```

#### entry-file.js
```js
/*与其他loader配合需要的额外配置 (polyfills, ...)*/
const context = require.context(/*directory*/'mocha-loader!./tests', /*recursive*/true, /*match files*//_test.js$/);
context.keys().forEach(context);
```

## License

MIT (http://www.opensource.org/licenses/mit-license.php)

***

> 原文：https://webpack.js.org/loaders/mocha-loader/