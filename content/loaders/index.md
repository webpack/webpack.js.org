---
title: Loaders
sort: 1
contributors:
  - simon04
---

webpack enables use of [loaders](/concepts/loaders) to preprocess files. This allows you to bundle any static resource way beyond JavaScript. You can easily write your own loaders using Node.js.

Loaders are activated by using `loadername!` prefixes in `require()` statements, or are automatically applied via regex from your webpack configuration – see [configuration](/concepts/loaders#configuration).

## Files
* [`raw-loader`](/loaders/raw-loader) Loads raw content of a file (utf-8)
* [`val-loader`](/loaders/val-loader) Executes code as module and consider exports as JS code
* [`url-loader`](/loaders/url-loader) Works like the file loader, but can return a [data URL](https://tools.ietf.org/html/rfc2397) if the file is smaller than a limit
* [`file-loader`](/loaders/file-loader) Emits the file into the output folder and returns the (relative) URL

## JSON
* [`json-loader`](/loaders/json-loader) Loads a [JSON](http://json.org/) file (included by default)
* [`json5-loader`](/loaders/json5-loader) Loads and transpiles a [JSON 5](http://json5.org/) file
* `cson-loader` Loads and transpiles a [CSON](https://github.com/bevry/cson#what-is-cson) file

## Transpiling
* [`script-loader`](/loaders/script-loader) Executes a JavaScript file once in global context (like in script tag), requires are not parsed
* [`babel-loader`](/loaders/babel-loader) Loads ES2015+ code and transpiles to ES5 using [Babel](https://babeljs.io/)
* `traceur-loader` Loads ES2015+ code and transpiles to ES5 using [Traceur](https://github.com/google/traceur-compiler#readme)
* [`ts-loader`](https://github.com/TypeStrong/ts-loader) or [`awesome-typescript-loader`](https://github.com/s-panferov/awesome-typescript-loader) Loads [TypeScript](https://www.typescriptlang.org/) 2.0+ like JavaScript
* [`coffee-loader`](/loaders/coffee-loader) Loads [CoffeeScript](http://coffeescript.org/) like JavaScript

## Templating
* [`html-loader`](/loaders/html-loader) Exports HTML as string, require references to static resources
* `pug-loader` Loads Pug templates and returns a function
* `jade-loader` Loads Jade templates and returns a function
* `markdown-loader` Compiles Markdown to HTML
* `posthtml-loader` Loads and transforms a HTML file using [PostHTML](https://github.com/posthtml/posthtml)
* `handlebars-loader` Compiles Handlebars to HTML

## Styling
* [`style-loader`](/loaders/style-loader) Add exports of a module as style to DOM
* [`css-loader`](/loaders/css-loader) Loads CSS file with resolved imports and returns CSS code
* [`less-loader`](/loaders/less-loader) Loads and compiles a LESS file
* [`sass-loader`](/loaders/sass-loader) Loads and compiles a SASS/SCSS file
* `stylus-loader` Loads and compiles a Stylus file
* `postcss-loader` Loads and transforms a CSS/SSS file using [PostCSS](http://postcss.org)

## Linting && Testing
* [`mocha-loader`](/loaders/mocha-loader) Tests with [mocha](https://mochajs.org/) (Browser/NodeJS)
* `eslint-loader` PreLoader for linting code using [ESLint](http://eslint.org/)
* [`jshint-loader`](/loaders/jshint-loader) PreLoader for linting code using [JSHint](http://jshint.com/about/)
* `jscs-loader` PreLoader for code style checking using [JSCS](http://jscs.info/)
* [`coverjs-loader`](/loaders/coverjs-loader) PreLoader to determine the testing coverage using [CoverJS](https://github.com/arian/CoverJS)

## Frameworks
* `vue-loader` Loads and compiles [Vue Components](https://vuejs.org/v2/guide/components.html)
* `polymer-loader` Process HTML & CSS with preprocessor of choice and `require()` Web Components like first-class modules
* `angular2-template-loader` Loads and compiles [Angular](https://angular.io/) Components


![Awesome](../assets/awesome-badge.svg)
For more third-party loaders, see the list from [awesome-webpack](https://github.com/webpack-contrib/awesome-webpack#loaders).
