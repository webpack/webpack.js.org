---
title: i18n-webpack-plugin
source: https://raw.githubusercontent.com/webpack/i18n-webpack-plugin/master/README.md
edit: https://github.com/webpack/i18n-webpack-plugin/edit/master/README.md
---
# i18n plugin for webpack

## 用法

参考 [webpack/webpack/examples/i18n](https://github.com/webpack/webpack/tree/master/examples/i18n)。

## 配置

```
plugins: [
  ...
  new I18nPlugin(languageConfig, optionsObj)
],
```
 - `optionsObj.functionName`：默认值为 `__`, 你可以更改为其他函数名。
 - `optionsObj.failOnMissing`：默认值为 `false`，找不到映射文本（mapping text）时会给出一个警告信息，如果设置为 `true`，则会给出一个错误信息。
 - `optionsObj.hideMessage`：默认值为 `false`，将会显示警告/错误信息。如果设置为 `true`，警告/错误信息将会被隐藏。

## License

MIT (http://www.opensource.org/licenses/mit-license.php)

***

> 原文：https://webpack.js.org/plugins/i18n-webpack-plugin/
