---
title: webpack 合入，标签和发布流程
contributors:
  - d3viant0ne
---

webpack 使用标准的自动版本生成（Automatic versioning）和 CHANGELOG 管理，使用 GitHub 的新压缩合并按扭和 `conventional-changelog` 以及其 [推荐的工作流](https://github.com/conventional-changelog/conventional-changelog-cli#recommended-workflow)。


## Pull 请求到 `master`

1. 当你提交到你的 `master` 分支上时，选择 _Squash and Merge_ 选项。
2. 遵循 [conventional-changelog-standard conventions](https://github.com/bcoe/conventional-changelog-standard/blob/master/convention.md) 添加一个标题和描述。
3. 搞定！


## 生成一个标准发布

```sh
# npm run script
npm run release
# 或者全局的 bin
standard-version
```

_这样将基于最后一个标签的历史提交来递增包版本号，更新相应的 changelog，提交变更并生成一个**本地标签**_。


### 当对本地标签满意时，push 到 master 分支

```sh
# 命令行
git push --follow-tags origin master
```

## 生成一个预发布

使用参数 `--prerelease` 来生成预发布：

_例如：当前的最后一个包版本是 `1.0.0`，你的代码被作为 `semver: patch` 级别的改动提交..._

```bash
# npm run script ( name === alpha, beta, rc )
npm run release -- --prerelease <name>
```

_这样将生成 `1.0.1-alpha.0` 的版本标签_

## 命令式的生成一个目标版本的发布，例如 `npm version`

如果要放弃自动版本生成，结合 `major`，`minor` 或 `patch` 参数使用 `--release-as` ：

假如你的最后版本是 `1.0.0`，你只加入了 `fix:` 的提交，但是你想要下一个发布是 `minor` 的，只要简单地下面这样操作：

```bash
# npm run script
npm run release -- --release-as minor
```

_你将得到版本 `1.1.0` 而不再是自动生成的版本 `1.0.1`._

> **注意：** 你可以结合 `--release-as` 和 `--prerelease` 来生成一个发布。这在发布实验性的特性时是很有用的。

## 提交和标签签名

如果你有设置你的 GPG，可以在执行 `standard-version` 命令时添加 `--sign` or `-s` 参数。
