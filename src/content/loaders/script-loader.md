---
title: script-loader
source: https://raw.githubusercontent.com/webpack-contrib/script-loader/master/README.md
edit: https://github.com/webpack-contrib/script-loader/edit/master/README.md
repo: https://github.com/webpack-contrib/script-loader
---


## 安装

```bash
npm install --save-dev script-loader
```

## 用法

在全局上下文(global context)执行一次 JS 脚本。

> :警告: 在 node.js 中不会运行

##

```js
import exec from 'script.exec.js';
```

**webpack.config.js**
```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.exec\.js$/,
        use: [ 'script-loader' ]
      }
    ]
  }
}
```

### 内联

```js
import exec from 'script-loader!./script.js';
```

## 维护人员

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


[npm]: https://img.shields.io/npm/v/script-loader.svg
[npm-url]: https://npmjs.com/package/script-loader

[node]: https://img.shields.io/node/v/script-loader.svg
[node-url]: https://nodejs.org

[deps]: https://david-dm.org/webpack/script-loader.svg
[deps-url]: https://david-dm.org/webpack/script-loader

[chat]: https://badges.gitter.im/webpack/webpack.svg
[chat-url]: https://gitter.im/webpack/webpack

***

> 原文：https://webpack.js.org/loaders/script-loader/
