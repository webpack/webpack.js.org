---
title: Asset Management
contributors:
  - skipjack
  - michael-ciniawsky
---

So you are all set up with webpack -- you're transforming and linting your JavaScript modules, generating your html file with the [html-webpack-plugin](), and even loading some css through your JavaScript modules with the [css-loader](). But wait, your site requires a whole bunch of other assets like images (e.g. `.png`, `.jpg`, `.svg`), fonts (e.g. `.woff`, `.woff2`, `.eot`), and data (e.g. `.json`, `.xml`, `.csv`)!

Prior to webpack, front-end developers would use tools like grunt and gulp to process these "web assets" and move them from their `/src` folder into their `/dist` or `/build` directory. The same idea was used for JavaScript modules, but, as you likely already know, tools like webpack will now "enter" your application and __dynamically bundle__ all dependencies (creating what's known as a [dependency graph](/concepts/dependency-graph)). This is great because every module now _explicitly states its dependencies_ and we'll avoid bundling modules that aren't in use.

One of the coolest webpack features is that you can also _include any other type of file_, besides JavaScript, for which there is a loader. This means that the same benefits listed above for JavaScript (e.g. explicit dependencies) can be applied to everything used in building a website or web app. Let's start with CSS, as you may already be familiar with that setup...


## Loading CSS

In order to `import` a CSS file from within a JavaScript module, you simply need to install and add the [css-loader]() to your [`module` configuration](/configuration/module)...

``` bash
npm install --save-dev css-loader
```

__webpack.config.js__

``` js
module.exports = {
  //...
  module: {
    rules: [
      {
        test: /\.css$/,
        use: 'css-loader'
      }
    ]
  },
  //...
}
```

This enables you to `import './style.css'` into the file that depends on that styling. Now, when that module is run, a `<style>` tag with the stringified css will be inserted into the `<head>` of your html file.

T> Note that you can also [split your CSS](/guides/code-splitting-css) for better load times in production. On top of that, loaders exist for pretty much any flavor of CSS you can think of -- [postcss](), [scss](), and [less]() to name a few.


## Loading Images

...


## Loading Fonts

...


## Loading Data

...
