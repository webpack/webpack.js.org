# webpack 中文文档

[![Travis](https://img.shields.io/travis/webpack-china/webpack.js.org.svg)](https://travis-ci.org/webpack-china/webpack.js.org)

> https://doc.webpack-china.org webpack 中文文档  
> https://webpack-china.org webpack 中文社区


### 中文站点
[英文站点](https://webpack.js.org/)是由 CI 自动构建并部署到 gh-pages  分支。  
[中文站点](https://doc.webpack-china.org/)是由 CI 自动构建并部署到 gh-pages  分支。

### 仓库一共有三个（以下全部简称为英文仓库、中文仓库、我的仓库）：
[英文仓库(webpack/webpack.js.org)](https://github.com/webpack/webpack.js.org)  
[中文仓库(webpack-china/webpack.js.org - fork webpack/webpack.js.org)](https://github.com/webpack-china/webpack.js.org)  
[我的仓库(dear-lizhihua/webpack.js.org - fork webpack-china/webpack.js.org)](https://github.com/dear-lizhihua/webpack.js.org)

### 合并上游更新的方案说明
```
以下说明有助于理清分支之间的关系，阅者可绕道忽略
分为三个仓库：英文仓库、中文仓库、我的仓库
1. 第一步：英文仓库 master 分支向中文仓库 master 分支合并以及提交(merge & push)。
2. 第二步：中文仓库 master 分支向我的仓库 master 分支合并以及提交(merge & push)。
3. 第三步：我的仓库 master 分支向我的仓库 cn 分支合并以及提交(merge & push)。
4. 第四步：我的仓库 cn 分支向中文仓库 cn 分支提交 pr。
5. 第五步：中文仓库 cn 分支合并(merge) 我的仓库 cn 分支的 pr。
```



- [webpack 2 校对+审校任务认领说明 - 入口目录](https://github.com/webpack-china/webpack.js.org/issues/169)

- [webpack 2 翻译任务认领说明 - 入口目录](https://github.com/webpack-china/webpack.js.org/issues/17)

- [翻译人员名单](https://doc.webpack-china.org/about/)中如未收录你的名字，请[访问此处](https://github.com/webpack-china/webpack.js.org/issues/180)留下你的大名(^_^)

- Thanks



If you want to fetch the documentation on additional loaders/plugins hosted in [separate repositories](https://github.com/webpack), run `npm run fetch`. The script will help you download those documentations and put them under `content/loaders` or `content/plugins` folder.

For more information see the [contributors page](https://github.com/webpack/webpack.js.org/blob/master/.github/CONTRIBUTING.md)

## Translation Guide

* Fork `translation` branch and create a new branch, for example, `cn`, `german`, etc.
* Translate documentation.
* If you have permission to access `translation` branch, run `npm run fetch` to update `loaders` and `plugins` documentation regularly.
* Regularly merge from `translation` branch to your own `translation` branch in order to get the updated documentation (especially plugin and loader documentation). Then you can compare the new and the old content.
* Use [travis-ci](https://travis-ci.org) and github webhook to deploy the documentation automatically. Please refer to this article, [Deploy Using Travis-CI And Github Webhook](https://medium.com/@lcxfs1991/deploy-using-travis-ci-and-github-webhook-eba67b3ab6ac)
* Any questions, please open and issue and @lcxfs1991 or @dear-lizhihua.

## Content Progress

Check out the [MVP Milestone](https://github.com/webpack/webpack.js.org/milestones) for the current status.

## Translation

If you hope to localize this documentation please transit to [translate branch](https://github.com/webpack/webpack.js.org/tree/translation).

## License

The content is available under [Creative Commons BY 4.0](https://creativecommons.org/licenses/by/4.0/) license.
