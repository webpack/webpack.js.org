---
title: Comparison
sort: 1
contributors:
  - pksjce
  - bebraw
  - chrisVillanueva
  - tashian
  - simon04
  - byzyk
related:
  - title: JSPM vs. webpack
    url: https://ilikekillnerds.com/2015/07/jspm-vs-webpack/
  - title: webpack vs. Browserify vs. SystemJS
    url: https://engineering.velocityapp.com/webpack-vs-browersify-vs-systemjs-for-spas-95b349a41fa0
---

webpack is not the only module bundler out there. If you are choosing between using webpack or any of the bundlers below, here is a feature-by-feature comparison on how webpack fares against the current competition.

| Feature | webpack/webpack | jrburke/requirejs | substack/node-browserify | jspm/jspm-cli | rollup/rollup | brunch/brunch |
|---------|-----------------|-------------------|--------------------------|---------------|---------------|---------------|
| Additional chunks are loaded on demand | __yes__ | __yes__ | no | [System.import](https://github.com/systemjs/systemjs/blob/master/docs/system-api.md#systemimportmodulename--normalizedparentname---promisemodule) | no | no |
| AMD `define` | __yes__ | __yes__ | [deamdify](https://github.com/jaredhanson/deamdify) | yes | [rollup-plugin-amd](https://github.com/piuccio/rollup-plugin-amd) | yes |
| AMD `require` | __yes__ | __yes__ | no | yes | no | yes |
| AMD `require` loads on demand | __yes__ | with manual configuration | no | yes | no | no |
| CommonJS `exports` | __yes__ | only wrapping in `define` | __yes__ | yes | [commonjs-plugin](https://github.com/rollup/rollup-plugin-commonjs) | yes |
| CommonJS `require` | __yes__ | only wrapping in `define` | __yes__ | yes | [commonjs-plugin](https://github.com/rollup/rollup-plugin-commonjs) | yes |
| CommonJS `require.resolve` | __yes__ | no | no | no | no | |
| Concat in require `require("./fi" + "le")` | __yes__ | no♦ | no | no | no | |
| Debugging support | __SourceUrl, SourceMaps__ | not required | SourceMaps | __SourceUrl, SourceMaps__ | __SourceUrl, SourceMaps__ | SourceMaps |
| Dependencies | 19MB / 127 packages | 11MB / 118 packages | __1.2MB / 1 package__ | 26MB / 131 packages | ?MB / 3 packages | |
| ES2015 `import`/`export` | __yes__ (webpack 2) | no | no | __yes__ | __yes__ | yes, via [es6 module transpiler](https://github.com/gcollazo/es6-module-transpiler-brunch)
| Expressions in require (guided) `require("./templates/" + template)` | __yes (all files matching included)__ | no♦ | no | no | no | no |
| Expressions in require (free) `require(moduleName)` | with manual configuration | no♦ | no | no | no | |
| Generate a single bundle | __yes__ | yes♦ | yes | yes | yes | yes |
| Indirect require `var r = require; r("./file")` | __yes__ | no♦ | no | no | no | |
| Load each file separate | no | yes | no | yes | no | no |
| Mangle path names | __yes__ | no | partial | yes | not required (path names are not included in the bundle) | no |
| Minimizing | [Terser](https://github.com/fabiosantoscode/terser) | uglify, closure compiler | [uglifyify](https://github.com/hughsk/uglifyify) | yes | [uglify-plugin](https://github.com/TrySound/rollup-plugin-uglify) | [UglifyJS-brunch](https://github.com/brunch/uglify-js-brunch)
| Multi pages build with common bundle | with manual configuration | __yes__ | with manual configuration | with bundle arithmetic | no | no|
| Multiple bundles | __yes__ | with manual configuration | with manual configuration | yes | no | yes |
| Node.js built-in libs `require("path")` | __yes__ | no | __yes__ | __yes__ | [node-resolve-plugin](https://github.com/rollup/rollup-plugin-node-resolve) | |
| Other Node.js stuff | process, __dir/filename, global | - | process, __dir/filename, global | process, __dir/filename, global for cjs | global ([commonjs-plugin](https://github.com/rollup/rollup-plugin-commonjs)) | |
| Plugins | __yes__ | yes | __yes__ | yes | yes | yes |
| Preprocessing | __loaders, [transforms](https://github.com/webpack-contrib/transform-loader)__ | loaders | transforms | plugin translate | plugin transforms | compilers, optimizers |
| Replacement for browser | `web_modules`, `.web.js`, package.json field, alias configuration option | alias option | package.json field, alias option | package.json, alias option | no | |
| Requirable files | file system | __web__ | file system | through plugins | file system or through plugins | file system |
| Runtime overhead | __243B + 20B per module + 4B per dependency__ | 14.7kB + 0B per module + (3B + X) per dependency | 415B + 25B per module + (6B + 2X) per dependency | 5.5kB for self-executing bundles, 38kB for full loader and polyfill, 0 plain modules, 293B CJS, 139B ES2015 System.register before gzip | __none for ES2015 modules__ (other formats may have) | |
| Watch mode | yes | not required | [watchify](https://github.com/browserify/watchify) | not needed in dev | [rollup-watch](https://github.com/rollup/rollup-watch) | yes |

♦ in production mode (opposite in development mode)

X is the length of the path string


## Bundling vs. Loading

It's important to note some key differences between _loading_ and _bundling_ modules. A tool like [SystemJS](https://github.com/systemjs/systemjs), which can be found under the hood of [JSPM](https://github.com/jspm/jspm-cli), is used to load and transpile modules at runtime in the browser. This differs significantly from webpack, where modules are transpiled (through "loaders") and bundled before hitting the browser.

Each method has its advantages and disadvantages. Loading and transpiling modules at runtime can add a lot of overhead for larger sites and applications comprised of many modules. For this reason, SystemJS makes more sense for smaller projects where fewer modules are required. However, this may change a bit as [HTTP/2](https://http2.github.io/) will improve the speed at which files can be transferred from server to client. Note that HTTP/2 doesn't change anything about _transpiling_ modules, which will always take longer when done client-side.
