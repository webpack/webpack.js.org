---
title: Integration with task/test runners
contributors:
  - pksjce
  - bebraw
  - tashian
---

webpack is a module bundler, like Browserify or Brunch. It is not a task runner. Make, Grunt, or Gulp are task runners. But people get confused about the difference, so let's clear that up right away.

Task runners handle automation of common development tasks such as linting, building, or testing your project. Compared to bundlers, task runners have a higher level focus.

Bundlers help you get your JavaScript and stylesheets ready for deployment, transforming them into a format that's suitable for the browser. For example, JavaScript can be minified or split into chunks and loaded on-demand to improve performance. Bundling is one of the most important challenges in web development, and solving it well can remove a lot of pain from the process.

webpack can work alongside task runners. You can still benefit from their higher level tooling while leaving the problem of bundling to webpack. [grunt-webpack](https://www.npmjs.com/package/grunt-webpack) and [gulp-webpack](https://www.npmjs.com/package/gulp-webpack) are good examples.

T> Often webpack users use npm `scripts` as their task runner. This is a good starting point. Cross-platform support can become a problem, but there are several workarounds for that.

T> Even though webpack core focuses on bundling, you can find a variety of extensions that allow you to use it in a task runner kind of way.

?> Grunt

?> Gulp

?> Mocha

?> Karma
