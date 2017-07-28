---
title: Integrations
sort: 25
contributors:
  - pksjce
  - bebraw
  - tashian
---

Let's start by clearing up a common misconception. webpack is a module bundler like [Browserify]() or [Brunch](). It is _not a task runner_ like [Make](), [Grunt](), or [Gulp](). Task runners handle automation of common development tasks such as linting, building, or testing your project. Compared to bundlers, task runners have a higher level focus. You can still benefit from their higher level tooling while leaving the problem of bundling to webpack.

Bundlers help you get your JavaScript and stylesheets ready for deployment, transforming them into a format that's suitable for the browser. For example, JavaScript can be [minified]() or [split into chunks]() and [lazy-loaded]() to improve performance. Bundling is one of the most important challenges in web development, and solving it well can remove a lot of pain from the process.

The good news is that, while there is some overlap, task runners and bundlers can play well together if approached in the right way. This guide provides a high-level overview of how webpack can be integrated into some of the more popular task runners.


## NPM Scripts

Often webpack users use npm [`scripts`]() as their task runner. This is a good starting point. Cross-platform support can become a problem, but there are several workarounds for that. Many, if not most users, get by with simple npm `scripts` and various levels of webpack configuration and tooling.

So while webpack's core focus is bundling, there are a variety of extensions that can enable you to use it for jobs typical of a task runner. Integrating a separate tool adds complexity, so be sure to weigh the pros and cons before going forward.


## Grunt

[grunt-webpack](https://www.npmjs.com/package/grunt-webpack)


## Gulp

[gulp-webpack](https://www.npmjs.com/package/gulp-webpack)


## Mocha

...


## Karma

...
