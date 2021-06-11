---
title: ImageMinimizerWebpackPlugin
source: https://raw.githubusercontent.com/webpack-contrib/image-minimizer-webpack-plugin/master/README.md
edit: https://github.com/webpack-contrib/image-minimizer-webpack-plugin/edit/master/README.md
repo: https://github.com/webpack-contrib/image-minimizer-webpack-plugin
---

    Plugin and Loader for <a href="http://webpack.js.org/">webpack</a> to optimize (compress) all images using <a href="https://github.com/imagemin/imagemin">imagemin</a>.
    Do not worry about size of images, now they are always optimized/compressed.
  



[![npm][npm]][npm-url]
[![node][node]][node-url]
[![deps][deps]][deps-url]
[![tests][tests]][tests-url]
[![cover][cover]][cover-url]
[![chat][chat]][chat-url]
[![size][size]][size-url]



## Getting Started

This plugin can use 2 tools to compress images:

- [`imagemin`](https://github.com/imagemin/imagemin) - optimize your images by default, since it is stable and works with all types of images
- [`squoosh`](https://github.com/GoogleChromeLabs/squoosh/tree/dev/libsquoosh) - while working in experimental mode with `.jpg`, `.jpeg`, `.png`, `.webp`, `.avif` file types.

To begin, you'll need to install `image-minimizer-webpack-plugin`:

```console
$ npm install image-minimizer-webpack-plugin --save-dev
```

Images can be optimized in two modes:

1.  [Lossless](https://en.wikipedia.org/wiki/Lossless_compression) (without loss of quality).
2.  [Lossy](https://en.wikipedia.org/wiki/Lossy_compression) (with loss of quality).

### Optimize with [imagemin](https://github.com/imagemin/imagemin)

Note:

- [imagemin-mozjpeg](https://github.com/imagemin/imagemin-mozjpeg) can be configured in lossless and lossy mode.
- [imagemin-svgo](https://github.com/imagemin/imagemin-svgo) can be configured in lossless and lossy mode.

Explore the options to get the best result for you.

**Recommended imagemin plugins for lossless optimization**

```shell
npm install imagemin-gifsicle imagemin-jpegtran imagemin-optipng imagemin-svgo --save-dev
```

**Recommended imagemin plugins for lossy optimization**

```shell
npm install imagemin-gifsicle imagemin-mozjpeg imagemin-pngquant imagemin-svgo --save-dev
```

For `imagemin-svgo` v9.0.0+ need use svgo [configuration](https://github.com/svg/svgo#configuration)

**webpack.config.js**

```js
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");
const { extendDefaultPlugins } = require("svgo");

module.exports = {
  module: {
    rules: [
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        type: "asset",
      },
    ],
  },
  plugins: [
    new ImageMinimizerPlugin({
      minimizerOptions: {
        // Lossless optimization with custom option
        // Feel free to experiment with options for better result for you
        plugins: [
          ["gifsicle", { interlaced: true }],
          ["jpegtran", { progressive: true }],
          ["optipng", { optimizationLevel: 5 }],
          // Svgo configuration here https://github.com/svg/svgo#configuration
          [
            "svgo",
            {
              plugins: extendDefaultPlugins([
                {
                  name: "removeViewBox",
                  active: false,
                },
                {
                  name: "addAttributesToSVGElement",
                  params: {
                    attributes: [{ xmlns: "http://www.w3.org/2000/svg" }],
                  },
                },
              ]),
            },
          ],
        ],
      },
    }),
  ],
};
```

### Optimize with [`squoosh`](https://github.com/GoogleChromeLabs/squoosh/tree/dev/libsquoosh)

```console
$ npm install @squoosh/lib --save-dev
```

**Recommended `@squoosh/lib` options for lossy optimization**

For lossy optimization we recommend using the default settings `@squoosh/lib`.
The default values and supported file types for each option can be found in the `[codecs.js]`(https://github.com/GoogleChromeLabs/squoosh/blob/dev/libsquoosh/src/codecs.js) file under `codecs`.

**webpack.config.js**

```js
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");

module.exports = {
  module: {
    rules: [
      {
        test: /\.(jpe?g|png)$/i,
        type: "asset",
      },
    ],
  },
  plugins: [
    new ImageMinimizerPlugin({
      minify: ImageMinimizerPlugin.squooshMinify,
    }),
  ],
};
```

**Recommended `squoosh` options for lossless optimization**

For lossless optimization we recommend using the options listed below in `minimizerOptions.encodeOptions`.

**webpack.config.js**

```js
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");

module.exports = {
  module: {
    rules: [
      {
        test: /\.(jpe?g|png)$/i,
        type: "asset",
      },
    ],
  },
  plugins: [
    new ImageMinimizerPlugin({
      minify: ImageMinimizerPlugin.squooshMinify,
      minimizerOptions: {
        encodeOptions: {
          mozjpeg: {
            // That setting might be close to lossless, but it’s not guaranteed
            // https://github.com/GoogleChromeLabs/squoosh/issues/85
            quality: 100,
          },
          webp: {
            lossless: 1,
          },
          avif: {
            // https://github.com/GoogleChromeLabs/squoosh/blob/dev/codecs/avif/enc/README.md
            cqLevel: 0,
          },
        },
      },
    }),
  ],
};
```

> ℹ️ If you want to use `loader` or `plugin` standalone see sections below, but this is not recommended.

### Standalone Loader

[Documentation: Using loaders](/concepts/loaders/)

In your `webpack.config.js`, add the `ImageMinimizerPlugin.loader` and specify the [asset modules options](/guides/asset-modules/):

**webpack.config.js**

```js
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");

module.exports = {
  module: {
    rules: [
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        type: "asset",
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: [
          {
            loader: ImageMinimizerPlugin.loader,
            options: {
              severityError: "warning", // Ignore errors on corrupted images
              minimizerOptions: {
                plugins: ["gifsicle"],
              },
            },
          },
        ],
      },
    ],
  },
};
```

### Standalone Plugin

[Documentation: Using plugins](/concepts/plugins/)

**webpack.config.js**

```js
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");

module.exports = {
  module: {
    rules: [
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        type: "asset",
      },
    ],
  },
  plugins: [
    // Make sure that the plugin placed after any plugins that added images
    new ImageMinimizerPlugin({
      severityError: "warning", // Ignore errors on corrupted images
      minimizerOptions: {
        plugins: ["gifsicle"],
      },
      // Disable `loader`
      loader: false,
    }),
  ],
};
```

## Options

### Plugin Options



|            Name            |                   Type                    |                           Default                           | Description                                                                                       |
| :------------------------: | :---------------------------------------: | :---------------------------------------------------------: | :------------------------------------------------------------------------------------------------ |
|         **`test`**         | `{String\/RegExp\|Array<String\|RegExp>}` | <code>/\.(jpe?g\|png\|gif\|tif\|webp\|svg\|avif)\$/i</code> | Test to match files against                                                                       |
|       **`include`**        | `{String\/RegExp\|Array<String\|RegExp>}` |                         `undefined`                         | Files to `include`                                                                                |
|       **`exclude`**        | `{String\/RegExp\|Array<String\|RegExp>}` |                         `undefined`                         | Files to `exclude`                                                                                |
|        **`filter`**        |               `{Function}`                |                        `() => true`                         | Allows filtering of images for optimization                                                       |
|    **`severityError`**     |                `{String}`                 |                          `'error'`                          | Allows to choose how errors are displayed                                                         |
|        **`minify`**        |      `{Function \| Array<Function>}`      |            `ImageMinimizerPlugin.imageminMinify`            | Allows to override default minify function                                                        |
|   **`minimizerOptions`**   |         `{Object\|Array<Object>}`         |                      `{ plugins: [] }`                      | Options for `imagemin`                                                                            |
|        **`loader`**        |                `{Boolean}`                |                           `true`                            | Automatically adding `imagemin-loader`                                                            |
|    **`maxConcurrency`**    |                `{Number}`                 |             `Math.max(1, os.cpus().length - 1)`             | Maximum number of concurrency optimization processes in one time                                  |
|       **`filename`**       |           `{string\|Function}`            |                    `'[path][name][ext]'`                    | Allows to set the filename for the generated asset. Useful for converting to a `webp`             |
| **`deleteOriginalAssets`** |                `{Boolean}`                |                           `false`                           | Allows to delete the original asset. Useful for converting to a `webp` and remove original assets |



#### `test`

Type: `String|RegExp|Array<String|RegExp>`
Default: `/\.(jpe?g\|png\|gif\|tif\|webp\|svg\|avif)\$/i`

Test to match files against.

**webpack.config.js**

```js
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");

module.exports = {
  plugins: [
    new ImageMinimizerPlugin({
      test: /\.(jpe?g|png|gif|svg)$/i,
    }),
  ],
};
```

#### `include`

Type: `String|RegExp|Array<String|RegExp>`
Default: `undefined`

Files to include.

**webpack.config.js**

```js
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");

module.exports = {
  plugins: [
    new ImageMinimizerPlugin({
      include: /\/includes/,
    }),
  ],
};
```

#### `exclude`

Type: `String|RegExp|Array<String|RegExp>`
Default: `undefined`

Files to exclude.

**webpack.config.js**

```js
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");

module.exports = {
  plugins: [
    new ImageMinimizerPlugin({
      exclude: /\/excludes/,
    }),
  ],
};
```

#### `filter`

Type: `Function`
Default: `() => true`

Allows filtering of images for optimization.

Return `true` to optimize the image, `false` otherwise.

**webpack.config.js**

```js
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");

module.exports = {
  plugins: [
    new ImageMinimizerPlugin({
      filter: (source, sourcePath) => {
        // The `source` argument is a `Buffer` of source file
        // The `sourcePath` argument is an absolute path to source
        if (source.byteLength < 8192) {
          return false;
        }

        return true;
      },
    }),
  ],
};
```

#### `severityError`

Type: `String`
Default: `'error'`

Allows to choose how errors are displayed.

Сan have the following values:

- `'off'` - suppresses errors and warnings
- `'warning'` - emit warnings instead errors
- `'error'` - emit errors

**webpack.config.js**

```js
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");

module.exports = {
  plugins: [
    new ImageMinimizerPlugin({
      severityError: "warning",
    }),
  ],
};
```

#### `minify`

Type: `Function|Array<Function>`
Default: `ImageMinimizerPlugin.imageminMinify`

Allows to override default minify function.
By default plugin uses [imagemin](https://github.com/imagemin/imagemin) package.
Useful for using and testing unpublished versions or forks.

Аvailable minifiers:

- ImageMinimizerPlugin.imageminMinify
- ImageMinimizerPlugin.squooshMinify

##### `Function`

**webpack.config.js**

```js
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");

module.exports = {
  plugins: [
    new ImageMinimizerPlugin({
      minify: async (data, minimizerOptions) => {
        const [[, input]] = Object.entries(data);

        let result;

        try {
          result = await minifyAndReturnBuffer(input);
        } catch (error) {
          // Return original input if there was an error
          return { data: input, errors: [error] };
        }

        return { data: result, warnings: [], errors: [] };
      },
      minimizerOptions: {},
    }),
  ],
};
```

##### `Array`

If an array of functions is passed to the `minify` option, the `minimizerOptions` can be an array or an object.
If `minimizerOptions` is array, the function index in the `minify` array corresponds to the options object with the same index in the `minimizerOptions` array.
If you use `minimizerOptions` like object, all `minify` function accept it.

**webpack.config.js**

```js
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");

module.exports = {
  plugins: [
    new ImageMinimizerPlugin({
      minify: [
        ImageMinimizerPlugin.imageminMinify,
        (data, minimizerOptions) => {
          const [[, input]] = Object.entries(data);

          let result;

          try {
            result = minifyAndReturnBuffer(input);
          } catch (error) {
            // Return original input if there was an error
            return { data: input, errors: [error] };
          }

          return { data: result, warnings: [], errors: [] };
        },
      ],
      minimizerOptions: [
        // Options for the first function (ImageMinimizerPlugin.imageminMinify)
        {
          plugins: ["gifsicle", "mozjpeg", "pngquant", "svgo"],
        },
        // Options for the second function
        {},
      ],
    }),
  ],
};
```

#### `minimizerOptions`

Type: `Object|Array<Object>`
Default: `{ plugins: [] }`

Options for `minify` functions. [`imagemin`](https://github.com/imagemin/imagemin) is default minify function.

More information and examples [here](https://github.com/imagemin/imagemin).

##### `Object`

**webpack.config.js**

```js
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");

module.exports = {
  plugins: [
    new ImageMinimizerPlugin({
      minimizerOptions: {
        plugins: [
          // Name
          "gifsicle",
          // Name with options
          ["mozjpeg", { quality: 80 }],
          // Full package name
          [
            "imagemin-svgo",
            {
              plugins: [
                {
                  removeViewBox: false,
                },
              ],
            },
          ],
          [
            // Custom package name
            "nonstandard-imagemin-package-name",
            { myOptions: true },
          ],
        ],
      },
    }),
  ],
};
```

##### `Array`

The function index in the `minify` array corresponds to the options object with the same index in the `minimizerOptions` array.
If you use `minimizerOptions` like object, all `minify` function accept it.

**webpack.config.js**

```js
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");

module.exports = {
  plugins: [
    new ImageMinimizerPlugin({
      minify: [
        ImageMinimizerPlugin.imageminMinify,
        async (data, minimizerOptions) => {
          const [[, input]] = Object.entries(data);

          let result;

          try {
            result = await minifyAndReturnBuffer(input);
          } catch (error) {
            // Return original input if there was an error
            return { data: input, errors: [error] };
          }

          return { data: result, warnings: [], errors: [] };
        },
      ],
      minimizerOptions: [
        // Options for the first function (ImageMinimizerPlugin.imageminMinify)
        {
          plugins: ["gifsicle", "mozjpeg", "pngquant", "svgo"],
        },
        // Options for the second function
        {},
      ],
    }),
  ],
};
```

#### `loader`

Type: `Boolean`
Default: `true`

Automatically adding `imagemin-loader`.

**webpack.config.js**

```js
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");

module.exports = {
  plugins: [
    new ImageMinimizerPlugin({
      loader: false,
    }),
  ],
};
```

#### `maxConcurrency`

Type: `Number`
Default: `Math.max(1, os.cpus().length - 1)`

Maximum number of concurrency optimization processes in one time.

**webpack.config.js**

```js
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");

module.exports = {
  plugins: [
    new ImageMinimizerPlugin({
      maxConcurrency: 3,
    }),
  ],
};
```

#### `filename`

Type: `String|Function`
Default: `'[path][name][ext]'`

Allows to set the filename for the generated asset. Useful for converting to a `webp`.
Supported values see in [`webpack template strings`](/configuration/output/#template-strings), `File-level` section.

##### `String`

**webpack.config.js**

```js
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");

module.exports = {
  plugins: [
    // Images are converted to `webp` and the original assets have been kept
    new ImageMinimizerPlugin({
      test: /\.(png)$/i,
      filename: "[path][name].webp",
      minimizerOptions: {
        plugins: ["imagemin-webp"],
      },
    }),
  ],
};
```

##### `Function`

**webpack.config.js**

```js
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");

module.exports = {
  plugins: [
    // Images are converted to `webp` and the original assets have been kept
    new ImageMinimizerPlugin({
      test: /\.(png)$/i,
      filename: (pathData, assetInfo) => {
        if (/imageLg/i.test(pathData.filename)) {
          return "./bigImages/[path][name].webp";
        }

        return "[path][name].webp";
      },
      minimizerOptions: {
        plugins: ["imagemin-webp"],
      },
    }),
  ],
};
```

##### Converting to `webp` using `ImageMinimizerPlugin.squooshMinify`

**webpack.config.js**

```js
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");
/*
const defaultTargets = {
  ".png": "oxipng",
  ".jpg": "mozjpeg",
  ".jpeg": "mozjpeg",
  ".jxl": "jxl",
  ".webp": "webp",
  ".avif": "avif",
};
*/

module.exports = {
  plugins: [
    // Images are converted to `webp` and the original assets have been kept
    new ImageMinimizerPlugin({
      test: /\.(png)$/i,
      filename: "[path][name].webp",
      minify: ImageMinimizerPlugin.squooshMinify,
      minimizerOptions: {
        targets: {
          ".png": "webp",
        },
      },
    }),
  ],
};
```

#### `deleteOriginalAssets`

Type: `Boolean`
Default: `false`

Allows to remove original assets. Useful for converting to a `webp` and remove original assets

> i Doesn't make sense if you haven't changed the original value of the `filename` option

**webpack.config.js**

```js
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");

module.exports = {
  plugins: [
    // Images are converted to `webp` and the original assets have been removed
    new ImageMinimizerPlugin({
      test: /\.(png)$/i,
      deleteOriginalAssets: true,
      filename: "[path][name].webp",
      minimizerOptions: {
        plugins: ["imagemin-webp"],
      },
    }),
  ],
};
```

To generate and compress the original assets:

```js
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");

module.exports = {
  plugins: [
    // And the original assets will be compressed
    new ImageMinimizerPlugin({
      test: /\.(png)$/i,
      minimizerOptions: {
        plugins: ["pngquant"],
      },
    }),
    // Images are converted to `webp` and the original assets have been removed
    new ImageMinimizerPlugin({
      test: /\.(png)$/i,
      deleteOriginalAssets: false,
      filename: "[path][name].webp",
      minimizerOptions: {
        plugins: ["imagemin-webp"],
      },
    }),
  ],
};
```

### Loader Options

|            Name            |              Type               |                Default                | Description                                                                                       |
| :------------------------: | :-----------------------------: | :-----------------------------------: | :------------------------------------------------------------------------------------------------ |
|        **`filter`**        |          `{Function}`           |              `undefined`              | Allows filtering of images for optimization                                                       |
|    **`severityError`**     |           `{String}`            |               `'error'`               | Allows to choose how errors are displayed                                                         |
|        **`minify`**        | `{Function \| Array<Function>}` | `ImageMinimizerPlugin.imageminMinify` | Allows to override default minify function                                                        |
|   **`minimizerOptions`**   |    `{Object\|Array<Object>}`    |           `{ plugins: [] }`           | Options for `imagemin`                                                                            |
|       **`filename`**       |      `{string\|Function}`       |         `'[path][name][ext]'`         | Allows to set the filename for the generated asset. Useful for converting to a `webp`             |
| **`deleteOriginalAssets`** |           `{Boolean}`           |                `false`                | Allows to delete the original asset. Useful for converting to a `webp` and remove original assets |

#### `filter`

Type: `Function`
Default: `() => true`

Allows filtering of images for optimization.

Return `true` to optimize the image, `false` otherwise.

**webpack.config.js**

```js
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");

module.exports = {
  module: {
    rules: [
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        type: "asset",
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: [
          {
            loader: ImageMinimizerPlugin.loader,
            options: {
              cache: true,
              filter: (source, sourcePath) => {
                // The `source` argument is a `Buffer` of source file
                // The `sourcePath` argument is an absolute path to source
                if (source.byteLength < 8192) {
                  return false;
                }

                return true;
              },
              minimizerOptions: {
                plugins: ["gifsicle"],
              },
            },
          },
        ],
      },
    ],
  },
};
```

#### `severityError`

Type: `String`
Default: `'error'`

Allows to choose how errors are displayed.

Сan have the following values:

- `'off'` - suppresses errors and warnings
- `'warning'` - emit warnings instead errors
- `'error'` - emit errors

**webpack.config.js**

```js
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");

module.exports = {
  module: {
    rules: [
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        type: "asset",
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: [
          {
            loader: ImageMinimizerPlugin.loader,
            options: {
              severityError: "warning",
              minimizerOptions: {
                plugins: ["gifsicle"],
              },
            },
          },
        ],
      },
    ],
  },
};
```

#### `minify`

Type: `Function|Array<Function>`
Default: `ImageMinimizerPlugin.imageminMinify`

Allows to override default minify function.
By default plugin uses [imagemin](https://github.com/imagemin/imagemin) package.
Useful for using and testing unpublished versions or forks.

Аvailable minifiers:

- ImageMinimizerPlugin.imageminMinify
- ImageMinimizerPlugin.squooshMinify

##### `Function`

**webpack.config.js**

```js
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");

module.exports = {
  module: {
    rules: [
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        type: "asset",
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: [
          {
            loader: ImageMinimizerPlugin.loader,
            options: {
              minify: async (data, minimizerOptions) => {
                const [[, input]] = Object.entries(data);

                let result;

                try {
                  result = await minifyAndReturnBuffer(input);
                } catch (error) {
                  // Return original input if there was an error
                  return { data: input, errors: [error] };
                }

                return { data: result, warnings: [], errors: [] };
              },
              minimizerOptions: {},
            },
          },
        ],
      },
    ],
  },
};
```

##### `Array`

If an array of functions is passed to the `minify` option, the `minimizerOptions` can be an array or an object.
If `minimizerOptions` is array, the function index in the `minify` array corresponds to the options object with the same index in the `minimizerOptions` array.
If you use `minimizerOptions` like object, all `minify` function accept it.

**webpack.config.js**

```js
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");

module.exports = {
  module: {
    rules: [
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        type: "asset",
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: [
          {
            loader: ImageMinimizerPlugin.loader,
            options: {
              minify: [
                ImageMinimizerPlugin.imageminMinify,
                async (data, minimizerOptions) => {
                  const [[, input]] = Object.entries(data);

                  let result;

                  try {
                    result = await minifyAndReturnBuffer(input);
                  } catch (error) {
                    // Return original input if there was an error
                    return { data: input, errors: [error] };
                  }

                  return { data: result, warnings: [], errors: [] };
                },
              ],
              minimizerOptions: [
                // Options for the first function (ImageMinimizerPlugin.imageminMinify)
                {
                  plugins: ["gifsicle", "mozjpeg", "pngquant", "svgo"],
                },
                // Options for the second function
                {},
              ],
            },
          },
        ],
      },
    ],
  },
};
```

#### `minimizerOptions`

Type: `Object|Array<Object>`
Default: `{ plugins: [] }`

Options for `minify` functions. [`imagemin`](https://github.com/imagemin/imagemin) is default minify function.

More information and examples [here](https://github.com/imagemin/imagemin).

##### `Object`

**webpack.config.js**

```js
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");

module.exports = {
  module: {
    rules: [
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        type: "asset",
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: [
          {
            loader: ImageMinimizerPlugin.loader,
            options: {
              minimizerOptions: {
                plugins: [
                  ["gifsicle", { interlaced: true, optimizationLevel: 3 }],
                ],
              },
            },
          },
        ],
      },
    ],
  },
};
```

##### `Array`

The function index in the `minify` array corresponds to the options object with the same index in the `minimizerOptions` array.
If you use `minimizerOptions` like object, all `minify` function accept it.

**webpack.config.js**

```js
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");

module.exports = {
  module: {
    rules: [
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        type: "asset",
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: [
          {
            loader: ImageMinimizerPlugin.loader,
            options: {
              minify: [
                ImageMinimizerPlugin.imageminMinify,
                async (data, minimizerOptions) => {
                  const [[, input]] = Object.entries(data);

                  let result;

                  try {
                    result = await minifyAndReturnBuffer(input);
                  } catch (error) {
                    // Return original input if there was an error
                    return { data: input, errors: [error] };
                  }

                  return { data: result, warnings: [], errors: [] };
                },
              ],
              minimizerOptions: [
                // Options for the first function (ImageMinimizerPlugin.imageminMinify)
                {
                  plugins: [
                    ["gifsicle", { interlaced: true, optimizationLevel: 3 }],
                  ],
                },
                // Options for the second function
                {},
              ],
            },
          },
        ],
      },
    ],
  },
};
```

#### `filename`

Type: `String|Function`
Default: `'[path][name][ext]'`

Allows to set the filename for the generated asset. Useful for converting to a `webp`.
Supported values see in [`webpack template strings`](/configuration/output/#template-strings), `File-level` section.

##### `String`

**webpack.config.js**

```js
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");

module.exports = {
  module: {
    rules: [
      {
        test: /\.(jpe?g|png|gif)$/i,
        use: [
          {
            test: /\.(jpe?g|png|gif|svg)$/i,
            type: "asset",
          },
          {
            loader: ImageMinimizerPlugin.loader,
            options: {
              filename: "[path][name].webp",
              minimizerOptions: {
                plugins: ["imagemin-webp"],
              },
            },
          },
        ],
      },
    ],
  },
};
```

##### `Function`

**webpack.config.js**

```js
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");

module.exports = {
  module: {
    rules: [
      {
        test: /\.(jpe?g|png|gif)$/i,
        use: [
          {
            test: /\.(jpe?g|png|gif|svg)$/i,
            type: "asset",
          },
          {
            loader: ImageMinimizerPlugin.loader,
            options: {
              filename: (pathData, assetInfo) => {
                if (/imageLg/i.test(pathData.filename)) {
                  return "./bigImages/[path][name].webp";
                }

                return "[path][name].webp";
              },
              minimizerOptions: {
                plugins: ["imagemin-webp"],
              },
            },
          },
        ],
      },
    ],
  },
};
```

#### `deleteOriginalAssets`

Type: `Boolean`
Default: `false`

Allows to keep the original asset. Useful for converting to a `webp` and remove original assets.

> i Doesn't make sense if you haven't changed the original value of the `filename` option

**webpack.config.js**

```js
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");

module.exports = {
  module: {
    rules: [
      {
        test: /\.(png)$/i,
        use: [
          {
            test: /\.(jpe?g|png|gif|svg)$/i,
            type: "asset",
          },
          {
            loader: ImageMinimizerPlugin.loader,
            options: {
              // PNG images are converted to WEBP, and the originals will keep
              deleteOriginalAssets: false,
              filename: "[path][name].webp",
              minimizerOptions: {
                plugins: ["imagemin-webp"],
              },
            },
          },
        ],
      },
    ],
  },
};
```

## Additional API

### `normalizeImageminConfig(config)`

The function normalizes configuration (converts plugins names and options to `Function`s) for using in `imagemin` package directly.

```js
const imagemin = require("imagemin");
const { normalizeImageminConfig } = require("image-minimizer-webpack-plugin");
const imageminConfig = normalizeImageminConfig({
  plugins: [
    "jpegtran",
    [
      "pngquant",
      {
        quality: [0.6, 0.8],
      },
    ],
  ],
});

/*
  console.log(imageminConfig);
  =>
  {
    plugins: [Function, Function],
    pluginsMeta: [
      { name: "imagemin-jpegtran", version: "x.x.x", options: {} },
      { name: "imagemin-pngquant", version: "x.x.x", options: { quality: [0.6, 0.8] }
    ]
  }
*/

(async () => {
  const files = await imagemin(["images/*.{jpg,png}"], {
    destination: "build/images",
    plugins: imageminConfig.plugins,
  });

  console.log(files);
  // => [{data: <Buffer 89 50 4e …>, path: 'build/images/foo.jpg'}, …]
})();
```

## Examples

### Optimize images based on size

You can use difference options (like `progressive`/`interlaced` and etc) based on image size (example - don't do progressive transformation for small images).

What is `progressive` image? [`Answer here`](https://jmperezperez.com/medium-image-progressive-loading-placeholder/).

**webpack.config.js**

```js
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");

module.exports = {
  minimizer: [
    new ImageMinimizerPlugin({
      // Only apply this one to files equal to or over 8192 bytes
      filter: (source) => {
        if (source.byteLength >= 8192) {
          return true;
        }

        return false;
      },
      minimizerOptions: {
        plugins: [["jpegtran", { progressive: true }]],
      },
    }),
    new ImageMinimizerPlugin({
      // Only apply this one to files under 8192
      filter: (source) => {
        if (source.byteLength < 8192) {
          return true;
        }

        return false;
      },
      minimizerOptions: {
        plugins: [["jpegtran", { progressive: false }]],
      },
    }),
  ],
};
```

### Optimize and transform images to `webp`

```js
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");

module.exports = {
  plugins: [
    new ImageMinimizerPlugin({
      minimizerOptions: {
        plugins: ["pngquant"],
      },
    }),
    new ImageMinimizerPlugin({
      deleteOriginalAssets: false,
      filename: "[path][name].webp",
      minimizerOptions: {
        plugins: ["imagemin-webp"],
      },
    }),
  ],
};
```

## Contributing

Please take a moment to read our contributing guidelines if you haven't yet done so.

[CONTRIBUTING](https://github.com/webpack-contrib/image-minimizer-webpack-plugin/blob/master/.github/CONTRIBUTING.md)

## License

[MIT](https://github.com/webpack-contrib/image-minimizer-webpack-plugin/blob/master/LICENSE)

[npm]: https://img.shields.io/npm/v/image-minimizer-webpack-plugin.svg
[npm-url]: https://npmjs.com/package/image-minimizer-webpack-plugin
[node]: https://img.shields.io/node/v/image-minimizer-webpack-plugin.svg
[node-url]: https://nodejs.org/
[deps]: https://david-dm.org/webpack-contrib/image-minimizer-webpack-plugin.svg
[deps-url]: https://david-dm.org/webpack-contrib/image-minimizer-webpack-plugin
[tests]: https://github.com/webpack-contrib/image-minimizer-webpack-plugin/workflows/image-minimizer-webpack-plugin/badge.svg
[tests-url]: https://github.com/webpack-contrib/image-minimizer-webpack-plugin/actions
[cover]: https://codecov.io/gh/webpack-contrib/image-minimizer-webpack-plugin/branch/master/graph/badge.svg
[cover-url]: https://codecov.io/gh/webpack-contrib/image-minimizer-webpack-plugin
[chat]: https://badges.gitter.im/webpack/webpack.svg
[chat-url]: https://gitter.im/webpack/webpack
[size]: https://packagephobia.now.sh/badge?p=image-minimizer-webpack-plugin
[size-url]: https://packagephobia.now.sh/result?p=image-minimizer-webpack-plugin
