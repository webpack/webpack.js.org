---
title: webpack 合并、标记和发布流程(webpack merge, tag and release process)
contributors:
  - d3viant0ne
  - sokra
---

## Pull 请求到 `master`

 当你提交到你的 `master` 分支上时，选择 _Create Merge-Commit_ 选项。

## 创建一个发布

```sh
npm version patch && git push --follow-tags && npm publish
npm version minor && git push --follow-tags && npm publish
npm version major && git push --follow-tags && npm publish
```

_这样将递增包版本号，提交变更，然后创建一个**本地标签**，并推送到 github 和 npm package。_

之后就可以到 github 的发布页面上为新的标签编写 Changelog。

***

> 原文：https://webpack.js.org/development/release-process/
