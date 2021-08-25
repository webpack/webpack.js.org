<div align="center">
  <a href="https://github.com/webpack/webpack">
    <img width="200" height="200" src="https://webpack.js.org/assets/icon-square-big.svg" />
  </a>
  <h1>webpack.js.org</h1>

[![Build Status][build-status]][build-status-url]
[![Standard Version][release]][release-url]
[![chat on gitter][chat]][chat-url]

指南、文档以及 webpack 的一切

</div>

## 📝 如何参与贡献

目前 webpack 中文文档处于稳定维护状态。

**工作流介绍：** 我们会每天拉取 [英文版文档](https://github.com/webpack/webpack/tree/main) 内容的更新，并由印记中文 bot 自动发起 PR，我们会根据该 PR 解决 Git 冲突并翻译内容。

贡献指南敬请点击 [这里](https://github.com/docschina/webpack.js.org/issues/749)。

## 📥 如何开始编辑

```bash
# 克隆本仓库
$ git clone https://github.com/docschina/webpack.js.org.git

# 安装依赖
$ yarn

<<<<<<< HEAD
# 启动开发服务器
$ yarn start
```
=======
Since webpack 4 we have created a subdomain-based archive for older states of documentation
matching older webpack version. Webpack 4's documentation is available at
[https://v4.webpack.js.org/](https://v4.webpack.js.org/) and is deployed from [`gh-pages` branch of v4.webpack.js.org repository](https://github.com/webpack/v4.webpack.js.org/tree/gh-pages)

There are various known issues that need fixing ([#3366](https://github.com/webpack/webpack.js.org/issues/3366)).

## Contributing

Read through the [writer's guide][writer-guide-url] if you're interested in editing the
content on this site. See the [contributors page][contributing-url] to learn how to set up and
start working on the site locally.
>>>>>>> 4db15f6f03f5ff286192bc41da319b0171baea4e

## License

内容在 [Creative Commons BY 4.0](https://creativecommons.org/licenses/by/4.0/) 许可下可用。

[webpack5-milestone-url]: https://github.com/webpack/webpack.js.org/issues?q=is%3Aopen+is%3Aissue+milestone%3A%22webpack+5%22
[build-status]: https://github.com/webpack/webpack.js.org/workflows/Deploy/badge.svg
[build-status-url]: https://github.com/webpack/webpack.js.org/actions
[chat]: https://badges.gitter.im/webpack/webpack.svg
[chat-url]: https://gitter.im/webpack/webpack
[release]: https://img.shields.io/badge/release-standard%20version-brightgreen.svg
[release-url]: https://github.com/conventional-changelog/standard-version
