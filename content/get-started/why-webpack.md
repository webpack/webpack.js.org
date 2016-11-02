---
title: Why webpack?
contributors:
  - pksjce
  - bebraw
sort: 1
---

You might be familiar with tools like Make, Grunt, Gulp, Browserify, or Brunch. Make is the oldest and the most known one as it's a general build tool and its history goes back to the 70s. More specialized *task runners*, like Grunt and Gulp, are focused on JavaScript and have healthy plugin ecosystems around them.

## What Are Task Runners?

Task runners literally make it easier to handle tasks, such as linting, building, or developing your project. Compared to *bundlers* like Browserify, Brunch, or webpack, they have a higher level focus. As you might guess from the term bundler, the goal of these tools is to achieve something lower level.

## What Are Bundlers?

Roughly put bundlers take assets, such as JavaScript files in, and then transform them into format that's suitable for the browser of the end user to consume. This process of bundling happens to be one of the most important problems in web development and solving it well you can remove a large part of pain from the process.

Bundlers can work in tandem with task runners. You can still benefit from their higher level tooling while leaving the problem of bundling to more specialized tools. [grunt-webpack](https://www.npmjs.com/package/grunt-webpack) and [gulp-webpack](https://www.npmjs.com/package/gulp-webpack) are good examples of integrations.

T> Often webpack users use npm `scripts` as their task runner. This is a good starting point. Cross-platform support can become a problem, but there are several workarounds for that.

T> Even though webpack core focuses on bundling, you can find a variety of extensions that allow you to use it in a task runner kind of way.