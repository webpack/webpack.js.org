---
title: 发布流程
sort: 6
contributors:
  - d3viant0ne
  - sokra
---

部署 webpack 的发布流程实际上非常简单。请阅读以下步骤，以便清楚了解这些是如何完成的。


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
