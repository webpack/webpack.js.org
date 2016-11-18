---
title: Loaders
contributors:
  - ev1stensberg
  - TheLarkInn
sort: 1
---

Loaders are generic functions that makes builds more flexible. This is being
done in the build step, and loaders get registered to the compiler through a 
`require` statement. To simplify source code, several loaders can be specified 
through [Module.rules](https://webpack.js.org/configuration/module/#module-rules) 
to have loaders explicitly in one place. One could do the following using 
a `require` statement to attain one or more loaders:

```js
require('style-loader!css-loader!less-loader!./someStyle.less')
```
W> Avoid using the require convention if your scripts are meant to work 
without adopting environment specific rules in order to achieve functionality, 
such as node and the browser.

## Rules

[`Module.rules`](https://webpack.js.org/configuration/module/#module-rules) allow you to specify several loaders within your Webpack configuration.
This is a concise way to display loaders, and helps to have clean code as 
well as you have a full overview of each respective loader. 

```js
  module: {
    rules: [
      { loader: 'css-loader', options: {
        modules: true
        }
      },
      { loader: 'postcss-loader'},
      { loader: 'sass-loader'}
    ]
  }
```
T> Use module.rules whenever possible, as this will reduce boilerplate in your 
source code and allows you debug or locate a loader faster if something goes south.

## CLI

Optionally, you could also use loaders through the CLI. 

`$ webpack --module-bind jade --module-bind 'css=style!css'`

This uses the loader “jade” for “.jade” files and the loaders “style” and “css” for “.css” files.

## Loader Features

---
 - Loaders can be chained. They are applied in a pipeline to the resource. A chain
 of loaders are compiled chronologically. The first loader in a chain of loaders 
 returns an value to the next and at the end loader, Webpack expects JavaScript
 to be returned.
 - Loaders can be synchronous or asynchronous.
 - Loaders run in Node.js and can do everything that’s possible there.
 - Loaders accept query parameters. This can be used to pass configuration to the loader.
 - Plugins can give loaders more features.
 - Loaders can emit additional arbitrary files.
 - Loaders can accept an options object
 ---
 
Loaders allows more power in the JavaScript ecosystem through preprocessing 
functions(loaders). Users now have more flexibility to include fine-grained logic
such as compression, packaging, language translations and [more](https://webpack.github.io/docs/list-of-loaders.html)!

## API Reference

---
 - [List of Loaders](https://webpack.github.io/docs/list-of-loaders.html)
 - [module.rules](https://webpack.js.org/configuration/module/#module-rules)
 - [Using Loaders(Old Website)](https://webpack.github.io/docs/using-loaders.html)

