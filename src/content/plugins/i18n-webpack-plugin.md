---
title: I18nWebpackPlugin
source: https://raw.githubusercontent.com/webpack-contrib/i18n-webpack-plugin/master/README.md
edit: https://github.com/webpack-contrib/i18n-webpack-plugin/edit/master/README.md
repo: https://github.com/webpack-contrib/i18n-webpack-plugin
---
i18n (localization) plugin for Webpack.

## 安装

```bash
npm i -D i18n-webpack-plugin
```

## 用法

此插件会创建包含译文的 bundle。所以您可以将翻译后的 bundle 提供给客户端。

参考 [webpack/webpack/examples/i18n](https://github.com/webpack/webpack/tree/master/examples/i18n)。

## 配置

```
plugins: [
  ...
  new I18nPlugin(languageConfig, optionsObj)
],
```
 - `optionsObj.functionName`：默认值为 `__`, 你可以更改为其他函数名。
 - `optionsObj.failOnMissing`：默认值为 `false`，找不到映射文本(mapping text)时会给出一个警告信息，如果设置为 `true`，则会给出一个错误信息。
 - `optionsObj.hideMessage`：默认值为 `false`，将会显示警告/错误信息。如果设置为 `true`，警告/错误信息将会被隐藏。

## Maintainers

<table>
  <tbody>
    <tr>
      <td align="center">
        <img width="150" height="150"
        src="https://avatars3.githubusercontent.com/u/166921?v=3&s=150">
        </br>
        <a href="https://github.com/bebraw">Juho Vepsäläinen</a>
      </td>
      <td align="center">
        <img width="150" height="150"
        src="https://avatars2.githubusercontent.com/u/8420490?v=3&s=150">
        </br>
        <a href="https://github.com/d3viant0ne">Joshua Wiens</a>
      </td>
      <td align="center">
        <img width="150" height="150"
        src="https://avatars3.githubusercontent.com/u/533616?v=3&s=150">
        </br>
        <a href="https://github.com/SpaceK33z">Kees Kluskens</a>
      </td>
      <td align="center">
        <img width="150" height="150"
        src="https://avatars3.githubusercontent.com/u/3408176?v=3&s=150">
        </br>
        <a href="https://github.com/TheLarkInn">Sean Larkin</a>
      </td>
    </tr>
  <tbody>
</table>

[npm]: https://img.shields.io/npm/v/i18n-webpack-plugin.svg
[npm-url]: https://npmjs.com/package/i18n-webpack-plugin

[deps]: https://david-dm.org/webpack-contrib/i18n-webpack-plugin.svg
[deps-url]: https://david-dm.org/webpack-contrib/i18n-webpack-plugin

[chat]: https://img.shields.io/badge/gitter-webpack%2Fwebpack-brightgreen.svg
[chat-url]: https://gitter.im/webpack/webpack

[test]: http://img.shields.io/travis/webpack-contrib/i18n-webpack-plugin.svg
[test-url]: https://travis-ci.org/webpack-contrib/i18n-webpack-plugin

[cover]: https://codecov.io/gh/webpack-contrib/i18n-webpack-plugin/branch/master/graph/badge.svg
[cover-url]: https://codecov.io/gh/webpack-contrib/i18n-webpack-plugin

***

> 原文：https://webpack.js.org/plugins/i18n-webpack-plugin/
