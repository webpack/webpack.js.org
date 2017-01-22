---
title: i18n-webpack-plugin
source: https://raw.githubusercontent.com/webpack/i18n-webpack-plugin/master/README.md
edit: https://github.com/webpack/i18n-webpack-plugin/edit/master/README.md
---
# i18n plugin for webpack

## Usage

see [webpack/webpack/examples/i18n](https://github.com/webpack/webpack/tree/master/examples/i18n).

## Options

```
plugins: [
  ...
  new I18nPlugin(languageConfig, optionsObj)
],
```
 - `optionsObj.functionName`: the default value is `__`, you can change it to other function name.
 - `optionsObj.failOnMissing`: the default value is `false`, which will show a warning message, if the mapping text cannot be found. If set to `true`, the message will be an error message.
 - `optionsObj.hideMessage`: the default value is `false`, which will show the warning/error message. If set to `true`, the message will be hide.

## License

MIT (http://www.opensource.org/licenses/mit-license.php)

***

> 原文：https://webpack.js.org/plugins/i18n-webpack-plugin/