---
title: Loaders
sort: -1
contributors:
  - simon04
  - bajras
  - rhys-vdw
  - EugeneHlushko
  - hemal7735
  - snitin315
  - anshumanv
  - jamesgeorge007
---

webpack enables use of [loaders](/concepts/loaders) to preprocess files. This allows you to bundle any static resource way beyond JavaScript. You can easily write your own loaders using Node.js.

Loaders are activated by using `loadername!` prefixes in `require()` statements, or are automatically applied via regex from your webpack configuration – see [configuration](/concepts/loaders/#configuration).

## Files

- [`val-loader`](/loaders/val-loader) Executes code as module and consider exports as JS code
- [`ref-loader`](https://www.npmjs.com/package/ref-loader) Create dependencies between any files manually

## JSON

- [`cson-loader`](https://github.com/awnist/cson-loader) Loads and transpiles a [CSON](https://github.com/bevry/cson#what-is-cson) file

## Transpiling

- [`babel-loader`](/loaders/babel-loader) Loads ES2015+ code and transpiles to ES5 using [Babel](https://babeljs.io/)
- [`buble-loader`](https://github.com/sairion/buble-loader) Loads ES2015+ code and transpiles to ES5 using [Bublé](https://buble.surge.sh/guide/)
- [`traceur-loader`](https://github.com/jupl/traceur-loader) Loads ES2015+ code and transpiles to ES5 using [Traceur](https://github.com/google/traceur-compiler#readme)
- [`ts-loader`](https://github.com/TypeStrong/ts-loader) Loads [TypeScript](https://www.typescriptlang.org/) 2.0+ like JavaScript
- [`coffee-loader`](/loaders/coffee-loader) Loads [CoffeeScript](http://coffeescript.org/) like JavaScript
- [`fengari-loader`](https://github.com/fengari-lua/fengari-loader/) Loads Lua code using [fengari](https://fengari.io/)
- [`elm-webpack-loader`](https://github.com/elm-community/elm-webpack-loader) Loads [Elm](https://elm-lang.org/) like JavaScript

## Templating

- [`html-loader`](/loaders/html-loader) Exports HTML as string, require references to static resources
- [`pug-loader`](https://github.com/pugjs/pug-loader) Loads Pug and Jade templates and returns a function
- [`markdown-loader`](https://github.com/peerigon/markdown-loader) Compiles Markdown to HTML
- [`react-markdown-loader`](https://github.com/javiercf/react-markdown-loader) Compiles Markdown to a React Component using the markdown-parse parser
- [`posthtml-loader`](https://github.com/posthtml/posthtml-loader) Loads and transforms a HTML file using [PostHTML](https://github.com/posthtml/posthtml)
- [`handlebars-loader`](https://github.com/pcardune/handlebars-loader) Compiles Handlebars to HTML
- [`markup-inline-loader`](https://github.com/asnowwolf/markup-inline-loader) Inline SVG/MathML files to HTML. It’s useful when applying icon font or applying CSS animation to SVG.
- [`twig-loader`](https://github.com/zimmo-be/twig-loader) Compiles Twig templates and returns a function
- [`remark-loader`](https://github.com/webpack-contrib/remark-loader) Load markdown through `remark` with built-in image resolution

## Styling

- [`style-loader`](/loaders/style-loader) Add exports of a module as style to DOM
- [`css-loader`](/loaders/css-loader) Loads CSS file with resolved imports and returns CSS code
- [`less-loader`](/loaders/less-loader) Loads and compiles a LESS file
- [`sass-loader`](/loaders/sass-loader) Loads and compiles a SASS/SCSS file
- [`postcss-loader`](/loaders/postcss-loader) Loads and transforms a CSS/SSS file using [PostCSS](http://postcss.org)
- [`stylus-loader`](/loaders/stylus-loader/) Loads and compiles a Stylus file

## Testing

- [`mocha-loader`](/loaders/mocha-loader) Tests with [mocha](https://mochajs.org/) (Browser/NodeJS)

## Frameworks

- [`vue-loader`](https://github.com/vuejs/vue-loader) Loads and compiles [Vue Components](https://vuejs.org/v2/guide/components.html)
- [`angular2-template-loader`](https://github.com/TheLarkInn/angular2-template-loader) Loads and compiles [Angular](https://angular.io/) Components

## Awesome

For more third-party loaders, see the list from [awesome-webpack](https://github.com/webpack-contrib/awesome-webpack#loaders).
