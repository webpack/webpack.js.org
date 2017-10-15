---
title: 发布流程(Release Process)
sort: 5
contributors:
  - d3viant0ne
  - sokra
---

部署 webpack 的发布流程实际上是无痛苦的。阅读以下步骤，你可以清楚了解其完成情况。


## 创建一个 pull requests

当将 pull requests 合并到 `master` 分支中时，选择 _Create Merge Commit_ 选项。


## 创建一个发布

```sh
npm version patch && git push --follow-tags && npm publish
npm version minor && git push --follow-tags && npm publish
npm version major && git push --follow-tags && npm publish
```

_这样将递增包版本号，提交变更，然后创建一个**本地标签**，并推送到 github 和 npm package。_

之后就可以到 github 的[发布页面](https://github.com/webpack/webpack/releases)上为新的标签编写 Changelog。

***

> 原文：https://webpack.js.org/development/release-process/
