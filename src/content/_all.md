

# Comparison

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
| Minimizing | terser | uglify, closure compiler | [uglifyify](https://github.com/hughsk/uglifyify) | yes | [uglify-plugin](https://github.com/TrySound/rollup-plugin-uglify) | [UglifyJS-brunch](https://github.com/brunch/uglify-js-brunch)
| Multi pages build with common bundle | with manual configuration | __yes__ | with manual configuration | with bundle arithmetic | no | no|
| Multiple bundles | __yes__ | with manual configuration | with manual configuration | yes | no | yes |
| Node.js built-in libs `require("path")` | __yes__ | no | __yes__ | __yes__ | [node-resolve-plugin](https://github.com/rollup/rollup-plugin-node-resolve) | |
| Other Node.js stuff | process, __dir/filename, global | - | process, __dir/filename, global | process, __dir/filename, global for cjs | global ([commonjs-plugin](https://github.com/rollup/rollup-plugin-commonjs)) | |
| Plugins | __yes__ | yes | __yes__ | yes | yes | yes |
| Preprocessing | __loaders, [transforms](https://github.com/webpack-contrib/transform-loader)__ | loaders | transforms | plugin translate | plugin transforms | compilers, optimizers |
| Replacement for browser | `web_modules`, `.web.js`, package.json field, alias config option | alias option | package.json field, alias option | package.json, alias option | no | |
| Requirable files | file system | __web__ | file system | through plugins | file system or through plugins | file system |
| Runtime overhead | __243B + 20B per module + 4B per dependency__ | 14.7kB + 0B per module + (3B + X) per dependency | 415B + 25B per module + (6B + 2X) per dependency | 5.5kB for self-executing bundles, 38kB for full loader and polyfill, 0 plain modules, 293B CJS, 139B ES2015 System.register before gzip | __none for ES2015 modules__ (other formats may have) | |
| Watch mode | yes | not required | [watchify](https://github.com/browserify/watchify) | not needed in dev | [rollup-watch](https://github.com/rollup/rollup-watch) | yes |

♦ in production mode (opposite in development mode)

X is the length of the path string


## Bundling vs. Loading

It's important to note some key differences between _loading_ and _bundling_ modules. A tool like [SystemJS](https://github.com/systemjs/systemjs), which can be found under the hood of [JSPM](https://github.com/jspm/jspm-cli), is used to load and transpile modules at runtime in the browser. This differs significantly from webpack, where modules are transpiled (through "loaders") and bundled before hitting the browser.

Each method has its advantages and disadvantages. Loading and transpiling modules at runtime can add a lot of overhead for larger sites and applications comprised of many modules. For this reason, SystemJS makes more sense for smaller projects where fewer modules are required. However, this may change a bit as [HTTP/2](https://http2.github.io/) will improve the speed at which files can be transferred from server to client. Note that HTTP/2 doesn't change anything about _transpiling_ modules, which will always take longer when done client-side.


# Branding Guidelines

Here you can find __webpack__ project brand guidelines, assets, and license. See our official [media repository](https://github.com/webpack/media) for more information and to find the [license](https://github.com/webpack/media/blob/master/LICENSE) that governs this work. Click any of the images to download them.


## The Name

webpack should __always__ be written in lower-case letters, even at the beginning of a sentence.


## Logo

The webpack logo should be placed on a white background with enough space around it like this:

<img src="https://raw.githubusercontent.com/webpack/media/master/logo/logo-on-white-bg.png" alt="webpack logo default with proper spacing on light background" />

[svg](https://github.com/webpack/media/blob/master/logo/logo-on-white-bg.svg) | [png](https://github.com/webpack/media/blob/master/logo/logo-on-white-bg.png) | [jpg](https://github.com/webpack/media/blob/master/logo/logo-on-white-bg.jpg)

Just double the size of the inner dark blue cube to get an idea how much space the logo should have.

For dark backgrounds, you can use the negative version of the logo:

<div style="display: block; background: #111;">
  <img src="https://raw.githubusercontent.com/webpack/media/master/logo/logo-on-dark-bg.png" alt="webpack logo default with proper spacing on light background" />
</div>

[svg](https://github.com/webpack/media/blob/master/logo/logo-on-dark-bg.svg) | [png](https://github.com/webpack/media/blob/master/logo/logo-on-dark-bg.png) | [jpg](https://github.com/webpack/media/blob/master/logo/logo-on-dark-bg.jpg)

T> Please use the __icon + text__ whenever possible.


## Icon only

__The icon is designed to be used in layout-constrained areas. As previously stated, please prefer icon + text.__

<img src="https://raw.githubusercontent.com/webpack/media/master/logo/icon.png" width="250" alt="icon example">

[svg](https://github.com/webpack/media/blob/master/logo/icon.svg) | [png](https://github.com/webpack/media/blob/master/logo/icon.png) | [jpg](https://github.com/webpack/media/blob/master/logo/icon.jpg)

Square-sized icon for bigger areas (like avatars or profile pictures):

<img src="https://raw.githubusercontent.com/webpack/media/master/logo/icon-square-big.png" width="250" alt="icon square big example">

[svg](https://github.com/webpack/media/blob/master/logo/icon-square-big.svg) | [png](https://github.com/webpack/media/blob/master/logo/icon-square-big.png) | [jpg](https://github.com/webpack/media/blob/master/logo/icon-square-big.jpg)

Square-sized icon for smaller areas (like favicons):

<img src="https://raw.githubusercontent.com/webpack/media/master/logo/icon-square-small.png" width="50" alt="icon square small example">

[svg](https://github.com/webpack/media/blob/master/logo/icon-square-small.svg) | [png](https://github.com/webpack/media/blob/master/logo/icon-square-small.png) | [jpg](https://github.com/webpack/media/blob/master/logo/icon-square-small.jpg)

T> For those of you following our guidelines and have gotten this far, we've made a special smaller size image used especially for custom emoji (like in a slack or gitter channel ;))

<img src="/assets/icon-square-small-slack.png" width="50" alt="icon square small example">


## Font

We use the beautiful [Geomanist Medium](http://atipofoundry.com/fonts/geomanist) font from the extremely talented folks at the [Atipo Foundry](http://atipofoundry.com/) who provide the entire font family at a 'pay what you want' model.


## Color Palette

The following colors are used throughout the site in various combinations and on our fancy clothing line launched with the help of [Open Collective](https://opencollective.com/) and [Threadless](https://medium.com/u/840563ee2a56) over at the [official webpack store](https://webpack.threadless.com/collections/the-final-release-collection/)!

| Color Name    | HEX Code      | RGB Code              | Sample
|---------------|---------------|-----------------------|-------------------------------
| Malibu:       | HEX `#8dd6f9` | `rgb: 141, 214, 249`  | <div style="background-color: #8dd6f9;">&nbsp;</div>
| Denim:        | HEX `#1d78c1` | `rgb: 29, 120, 193`   | <div style="background-color: #1d78c1;">&nbsp;</div>
| Fiord:        | HEX `#465E69` | `rgb: 70, 94, 105`    | <div style="background-color: #465E69;">&nbsp;</div>
| Outer Space:  | HEX `#2B3A42` | `rgb: 43, 58, 66`     | <div style="background-color: #2B3A42;">&nbsp;</div>
| White:        | HEX `#ffffff` | `rgb: 255, 255, 255`  | <div style="background-color: #ffffff;">&nbsp;</div>
| Concrete:     | HEX `#f2f2f2` | `rgb: 242, 242, 242`  | <div style="background-color: #f2f2f2;">&nbsp;</div>
| Alto:         | HEX `#dedede` | `rgb: 222, 222, 222`  | <div style="background-color: #dedede;">&nbsp;</div>
| Dusty Gray:   | HEX `#999999` | `rgb: 153, 153, 153`  | <div style="background-color: #999999;">&nbsp;</div>
| Dove Gray:    | HEX `#666666` | `rgb: 102, 102, 102`  | <div style="background-color: #666666;">&nbsp;</div>
| Emperor:      | HEX `#535353` | `rgb: 83, 83, 83`     | <div style="background-color: #535353;">&nbsp;</div>
| Mine Shaft:   | HEX `#333333` | `rgb: 51, 51, 51`     | <div style="background-color: #333333;">&nbsp;</div>

In addition, you can grab the following file types directly from these links:

[psd](https://raw.githubusercontent.com/webpack/media/master/design/webpack-palette.psd) | [png](https://raw.githubusercontent.com/webpack/media/master/design/webpack-palette.png)
 | [ai](https://raw.githubusercontent.com/webpack/media/master/design/webpack-palette.ai) | [svg](https://raw.githubusercontent.com/webpack/media/master/design/webpack-palette.svg)


## License

The logo and the brand name are __not MIT licensed__. Please check [our LICENSE](https://github.com/webpack/media/blob/master/LICENSE) for usage guidelines.


# Glossary

This index lists common terms used throughout the webpack ecosystem.


## A

- [__Asset__](/guides/asset-management/): This a general term for the images, fonts, media, and any other kind of files that are typically used in websites and other applications. These typically end up as individual files within the [output](/glossary#o) but can also be inlined via things like the [style-loader](/loaders/style-loader) or [url-loader](/loaders/url-loader).


## B

- [__Bundle__](/guides/getting-started/#creating-a-bundle): Produced from a number of distinct modules, bundles contain the final versions of source files that have already undergone the loading and compilation process.
- [__Bundle Splitting__](/guides/code-splitting): This process offers one way of optimizing a build, allowing webpack to generate multiple bundles for a single application. As a result, each bundle can be isolated from changes effecting others, reducing the amount of code that needs to be republished and therefore re-downloaded by the client and taking advantage of browser caching.


## C

- __Chunk__: This webpack-specific term is used internally to manage the bundling process. Bundles are composed out of chunks, of which there are several types (e.g. entry and child). Typically, _chunks_ directly correspond with the output _bundles_ however, there are some configurations that don't yield a one-to-one relationship.
- [__Code Splitting__](/guides/code-splitting/): Refers to dividing your code into various bundles/chunks which you can then load on demand instead of loading a single bundle containing everything.
- [__Configuration__](/concepts/configuration/): webpack config file is a plain old JavaScript file that exports an object. This object is then processed by webpack based upon its defined properties.


## D

- [__Dependency Graph__](/concepts/dependency-graph): Any time one file depends on another, webpack treats this as a _dependency_. Starting from an entry point(s), webpack recursively builds a dependency graph that includes every module/asset your application needs.


## E

- [__Entry Point__](/concepts/entry-points): The entry point tells webpack where to start and follows the graph of dependencies to know what to bundle. You can think of your application's entry point(s) as the __contextual root(s)__ of what you want bundled.


## F

## G

## H

- [__Hot Module Replacement (HMR)__](/concepts/hot-module-replacement): A process that exchanges, adds, or removes  `modules` while an application is running without a full page reload.


## I

## J

## K

## L

- [__Loaders__](/concepts/loaders): Transformations that are applied on the source code of a module. They allow you to pre-process files as you `require()` or "load" them. Similar to a 'task-runner'.


## M

- [__Module__](/concepts/modules): Discrete chunks of functionality that provide a smaller surface area than a full program. Well-written modules provide solid abstractions and encapsulation boundaries which make up a coherent design and clear purpose.
- [__Module Resolution__](/concepts/module-resolution/): A module can be required as a dependency from another module and a resolver is a library which helps in locating a module by its absolute path.. Modules are searched for inside all directories specified in `resolve.modules`.


## N

## O

- [__Output__](/concepts/output): Option(s) specifying where to output the compiled files to disk.
  > _Note, that while there can be multiple entry points, only one output configuration is specified._


## P

- [__Plugin__](/concepts/plugins): A JavaScript object that has an `apply` property. This `apply` property is called by the webpack compiler, giving access to the entire compilation lifecycle. These packages will typically extend compilation functionality in one way or another.


## Q

## R

- [__Request__](/guides/dependency-management/): Refers to the expression in the require/import statement, e.g. _require("./template/" + name + ".ejs")_, the request is _"./template/" + name + ".ejs"_.

## S

## T

- [__Target__](/configuration/target/): User configured deployment target(s) [listed here](/configuration/target/) to compile for a specific environment like the browser, NodeJS, or Electron.
- [__Tree Shaking__](/guides/tree-shaking/): Unused/Excess code elimination, or more precisely, live code importing. Compilers like webpack will accomplish this by analyzing the various kinds `import` statements and usage of the imported code to determine what parts of dependencies are actually being utilized, dropping parts of the "tree" that are not.


## U

## V

- [__Vendor Entry Point__](/concepts/entry-points/#separate-app-and-vendor-entries): Create dependency graphs starting at both `app.js` and `vendors.js`. These graphs are completely separate and independent of each other to allow leverage of `CommonsChunkPlugin` and extract any vendor references from your app bundle into your vendor bundle. Helps achieve a common pattern in webpack known as [long-term vendor-caching](/guides/caching/).


## W

- [__webpack__](/): A highly configurable [module](/concepts/modules) bundler for modern JavaScript applications


## X

## Y

## Z


# License

## webpack

webpack is [MIT licensed](https://github.com/webpack/webpack/blob/master/LICENSE).

## webpack logo and icon

The webpack logo and icon are under a different license which can be
found [here](https://github.com/webpack/media).

## webpack documentation

The content on [https://webpack.js.org/](https://webpack.js.org/) is available under [Creative Commons BY 4.0](https://creativecommons.org/licenses/by/4.0/) license meaning attribution is required should you use the content elsewhere.

## webpack code samples

The code samples use [CC0 1.0 Universal (CC0 1.0) (Public Domain)](https://creativecommons.org/publicdomain/zero/1.0/) and you are free to use them as you like.
