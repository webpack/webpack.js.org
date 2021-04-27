---
title: I18nWebpackPlugin
source: https://raw.githubusercontent.com/webpack-contrib/i18n-webpack-plugin/master/README.md
edit: https://github.com/webpack-contrib/i18n-webpack-plugin/edit/master/README.md
repo: https://github.com/webpack-contrib/i18n-webpack-plugin
translators:
  - NealST
---
webpack 的 i18n（本地化）插件

## 安装 {#install}

```bash
npm i -D i18n-webpack-plugin
```

## 使用 {#usage}

该插件会在 bundle 的生成过程中进行文案翻译，因此你可以直接将翻译后的 bundle 交付给用户。

具体示例可见 [webpack/webpack/examples/i18n](https://github.com/webpack/webpack/tree/master/examples/i18n).

## 插件配置 {#options}

```
plugins: [
  ...
  new I18nPlugin(languageConfig, optionsObj)
],
```
 - `optionsObj.functionName`: 默认值为 `__`，你可以将其修改为其他函数名。
 - `optionsObj.failOnMissing`：默认值为 `false`，如果要翻译的文本缺失，插件会展示警告信息。若设置为 `true`，在上述情况下插件将会抛出错误信息。
 - `optionsObj.hideMessage`：默认值为 `false`，插件可以展示警告/报错信息. 若设置为 `true`，插件将会隐藏相关的警告或报错信息。
 - `optionsObj.nested`：默认值为 `false`。如果设置为 `true`，`languageConfig` 中键值的编写可以嵌套。该选项当且仅当参数 `languageConfig` 的类型不是一个函数时才能生效.

## 维护者 {#maintainers}

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
