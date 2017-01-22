---
title: mocha-loader
source: https://raw.githubusercontent.com/webpack/mocha-loader/master/README.md
edit: https://github.com/webpack/mocha-loader/edit/master/README.md
---
# mocha loader for webpack

## Usage

### Command Line

*Hint*: when using `!` in the bash command line, you must escape it by prepending a `\`

``` text
webpack-dev-server 'mocha!./my-client-tests.js' --options webpackOptions.js
```

``` text
enhanced-require 'mocha!./my-server-tests.js'
```
### Config
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
/*additional setup with other loaders (polyfills, ...)*/
const context = require.context(/*directory*/'mocha-loader!./tests', /*recursive*/true, /*match files*//_test.js$/);
context.keys().forEach(context);
```

## License

MIT (http://www.opensource.org/licenses/mit-license.php)

***

> 原文：https://webpack.js.org/loaders/mocha-loader/