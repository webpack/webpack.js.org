# webpack 中文文档

[![Travis](https://img.shields.io/travis/webpack-china/webpack.js.org.svg)](https://travis-ci.org/webpack-china/webpack.js.org)

> https://doc.webpack-china.org webpack 中文文档
> https://webpack-china.org webpack 中文社区

- [webpack 2 校对+审校任务认领说明 - 入口目录](https://github.com/webpack-china/webpack.js.org/issues/169)

- [webpack 2 翻译任务认领说明 - 入口目录](https://github.com/webpack-china/webpack.js.org/issues/17)

- [翻译人员名单](https://doc.webpack-china.org/about/)中如未收录你的名字，请[访问此处](https://github.com/webpack-china/webpack.js.org/issues/180)留下你的大名(^_^)

- Thanks
If you want to fetch the documentation on additional loaders/plugins hosted in [separate repositories](https://github.com/webpack), run `npm run fetch`. The script will help you download those documentations and put them under `content/loaders` or `content/plugins` folder.

For more information see the [contributors page](https://github.com/webpack/webpack.js.org/blob/master/CONTRIBUTING.md)

## Translation Guide

* Fork `translation` branch and create a new branch, for example, `cn`, `german`, etc.
* Translate documentation.
* If you have permission to access `translation` branch, run `npm run fetch` to update `loaders` and `plugins` documentation regularly.
* Regularly merge from `translation` branch to your own `translation` branch in order to get the updated documentation (especially plugin and loader documentation). Then you can compare the new and the old content.
* Use [travis-ci](https://travis-ci.org) and github webhook to deploy the documentation automatically. Please refer to this article, [Deploy Using Travis-CI And Github Webhook](https://medium.com/@lcxfs1991/deploy-using-travis-ci-and-github-webhook-eba67b3ab6ac)
* Any questions, please open and issue and @lcxfs1991 or @dear-lizhihua.

## Content Progress

Check out the [MVP Milestone](https://github.com/webpack/webpack.js.org/milestones) for the current status.

## License

The content is available under [Creative Commons BY 4.0](https://creativecommons.org/licenses/by/4.0/) license.
