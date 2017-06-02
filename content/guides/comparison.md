---
title: Comparison with other bundlers
contributors:
  - pksjce
  - bebraw
  - chrisVillanueva
  - tashian
  - simon04
---

webpack is not the only module bundler out there. If you are choosing between using webpack or any of the bundlers below, here is a feature-by-feature comparison on how webpack fares against the current competition.

| Feature | webpack/webpack | jrburke/requirejs | substack/node-browserify | jspm/jspm-cli | rollup/rollup | brunch/brunch |
|---------|-----------------|-------------------|--------------------------|---------------|---------------|---------------|
| Additional chunks are loaded on demand | **yes** | **yes** | no | [System.import](https://github.com/systemjs/systemjs/blob/master/docs/system-api.md#systemimportmodulename--normalizedparentname---promisemodule) | no | no |
| AMD `define` | **yes** | **yes** | [deamdify](https://github.com/jaredhanson/deamdify) | yes | [rollup-plugin-amd](https://github.com/piuccio/rollup-plugin-amd) | yes |
| AMD `require` | **yes** | **yes** | no | yes | no | yes |
| AMD `require` loads on demand | **yes** | with manual configuration | no | yes | no | no |
| CommonJS `exports` | **yes** | only wrapping in `define` | **yes** | yes | [commonjs-plugin](https://github.com/rollup/rollup-plugin-commonjs) | yes |
| CommonJS `require` | **yes** | only wrapping in `define` | **yes** | yes | [commonjs-plugin](https://github.com/rollup/rollup-plugin-commonjs) | yes |
| CommonJS `require.resolve` | **yes** | no | no | no | no | |
| Concat in require `require("./fi" + "le")` | **yes** | no♦ | no | no | no | |
| Debugging support | **SourceUrl, SourceMaps** | not required | SourceMaps | **SourceUrl, SourceMaps** | **SourceUrl, SourceMaps** | SourceMaps |
| Dependencies | 19MB / 127 packages | 11MB / 118 packages | **1.2MB / 1 package** | 26MB / 131 packages | ?MB / 3 packages | |
| ES2015 `import`/`export` | **yes** (webpack 2) | no | no | **yes** | **yes** | yes, via [es6 module transpiler](https://github.com/gcollazo/es6-module-transpiler-brunch)
| Expressions in require (guided) `require("./templates/" + template)` | **yes (all files matching included)** | no♦ | no | no | no | no |
| Expressions in require (free) `require(moduleName)` | with manual configuration | no♦ | no | no | no | |
| Generate a single bundle | **yes** | yes♦ | yes | yes | yes | yes |
| Indirect require `var r = require; r("./file")` | **yes** | no♦ | no | no | no | |
| Load each file separate | no | yes | no | yes | no | no |
| Mangle path names | **yes** | no | partial | yes | not required (path names are not included in the bundle) | no |
| Minimizing | uglify | uglify, closure compiler | [uglifyify](https://github.com/hughsk/uglifyify) | yes | [uglify-plugin](https://github.com/TrySound/rollup-plugin-uglify) | [UglifyJS-brunch](https://github.com/brunch/uglify-js-brunch)
| Multi pages build with common bundle | with manual configuration | **yes** | with manual configuration | with bundle arithmetic | no | no|
| Multiple bundles | **yes** | with manual configuration | with manual configuration | yes | no | yes |
| Node.js built-in libs `require("path")` | **yes** | no | **yes** | **yes** | [node-resolve-plugin](https://github.com/rollup/rollup-plugin-node-resolve) | |
| Other Node.js stuff | process, __dir/filename, global | - | process, __dir/filename, global | process, __dir/filename, global for cjs | global ([commonjs-plugin](https://github.com/rollup/rollup-plugin-commonjs)) | |
| Plugins | **yes** | yes | **yes** | yes | yes | yes |
| Preprocessing | **loaders, [transforms](https://github.com/webpack/transform-loader)** | loaders | transforms | plugin translate | plugin transforms | compilers, optimizers |
| Replacement for browser | `web_modules`, `.web.js`, package.json field, alias config option | alias option | package.json field, alias option | package.json, alias option | no | |
| Requirable files | file system | **web** | file system | through plugins | file system or through plugins | file system |
| Runtime overhead | **243B + 20B per module + 4B per dependency** | 14.7kB + 0B per module + (3B + X) per dependency | 415B + 25B per module + (6B + 2X) per dependency | 5.5kB for self-executing bundles, 38kB for full loader and polyfill, 0 plain modules, 293B CJS, 139B ES2015 System.register before gzip | **none for ES2015 modules** (other formats may have) | |
| Watch mode | yes | not required | [watchify](https://github.com/substack/watchify) | not needed in dev | [rollup-watch](https://github.com/rollup/rollup-watch) | yes |


♦ in production mode (opposite in development mode)

X is the length of the path string
