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



# webpack.js.org

[![build status](https://secure.travis-ci.org/webpack/webpack.js.org.svg)](http://travis-ci.org/webpack/webpack.js.org)
[![Standard Version](https://img.shields.io/badge/release-standard%20version-brightgreen.svg)](https://github.com/conventional-changelog/standard-version)

Guides, documentation, and all things webpack.


## Content Progress

Now that we've covered much of the backlog of _missing documentation_, we are starting
to heavily review each section of the site's content to sort and structure it appropriately.
The following issues should provide a pretty good idea of where things are, and where
they are going:

- [Guides - Review and Simplify][1]
- [Concepts - Review, Organize, Define Clear Goals][2]

We haven't created issues for the other sections yet, but they will be coming soon. For
dev-related work please see [General - Current Longterm Plan][3], which will soon be
replaced by a more dev-specific issue.


## Translation

If you hope to localize this documentation please jump to the [translate branch][4].


## Contributing

Read through the [writer's guide][7] if you're interested in editing the content on this
site. See the [contributors page][5] to learn how to set up and start working on the site
locally.


## License

The content is available under the [Creative Commons BY 4.0][6] license.


[1]: https://github.com/webpack/webpack.js.org/issues/1258
[2]: https://github.com/webpack/webpack.js.org/issues/1386
[3]: https://github.com/webpack/webpack.js.org/issues/1380
[4]: https://github.com/webpack/webpack.js.org/tree/translation
[5]: https://github.com/webpack/webpack.js.org/blob/master/.github/CONTRIBUTING.md
[6]: https://creativecommons.org/licenses/by/4.0/
[7]: https://webpack.js.org/writers-guide
