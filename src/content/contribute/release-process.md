---
title: 发布流程
sort: 6
contributors:
  - d3viant0ne
  - sokra
---

The release process for deploying webpack is actually quite painless. Read through the following steps, so you have a clear understanding of how it's done.


## Pull Request

当你向 `master` 分支上提交 pull request 时，选择 _Create Merge-Commit_ 选项。


## 发布

```sh
npm version patch && git push --follow-tags && npm publish
npm version minor && git push --follow-tags && npm publish
npm version major && git push --follow-tags && npm publish
```

_这样将递增包版本号，提交变更，然后创建一个**本地 tag 标签**，并推送到 github 和发布到 npm package。_

之后就可以到 github 的[发布页面](https://github.com/webpack/webpack/releases)上为新的标签编写 Changelog。

***

> 原文：https://webpack.js.org/contribute/plugin-patterns/
