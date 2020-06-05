---
title: ChunksWebpackPlugin
contributors:
  - yoriiis
related:
  - title: SplitChunksPlugin
    url: /plugins/split-chunks-plugin/
  - title: The real power of Webpack 4 SplitChunks Plugin
    url: https://medium.com/@Yoriiis/the-real-power-of-webpack-4-splitchunks-plugin-fad097c45ba0
---

The `ChunksWebpackPlugin` creates HTML files with entry points and chunks relations to serve your webpack bundles. It is suitable with multiple page application that contains multiple entry points.

Since webpack 4, `SplitChunksPlugin` offers the possibility to optimizes all chunks. It can be particularly powerful, because it means that chunks can be shared even between async and non-async chunks. See the webpack documentation for [`splitChunks.chunks`](/plugins/split-chunks-plugin/#splitchunkschunks) for details.

`splitChunks.chunks` option can be set to automatically generate new chunks associated with an entry point. For example, entry points `a.js` and `b.js` share common code with the file `vendors~a~b.js`.

With multiple entry points, it can be difficult to identify relation between the auto-generated chunks and entry points.

`ChunksWebpackPlugin` parses the `entrypoints` [Map](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Map) from the webpack compilation to get all valid entry points and associated files. Then, it generates HTML files which include all assets filtered by an entry point and the `chunks-manifest.json` file.

## Zero config

It works without configuration. For advanced usage, see the [using configuration section](#using-a-configuration).

## Installation

The plugin is available as a package with the name of `chunks-webpack-plugin` on [npm](https://www.npmjs.com/package/chunks-webpack-plugin) and [Github](https://github.com/yoriiis/chunks-webpack-plugin).

```bash
npm install chunks-webpack-plugin --save-dev
```

```bash
yarn add chunks-webpack-plugin --dev
```

## Environment

`ChunksWebpackPlugin` was built for Node.js `>=8.11.2` and webpack `>=4.x`.

## Example

For example usage, please see the [`ChunksWebpackPlugin` Github documentation](https://github.com/yoriiis/chunks-webpack-plugin/blob/master/README.md#example).

## Basic usage

`ChunksWebpackPlugin` will generate two HTML files for each entry point. Each filename contains the entry point name, the `{{entry}}` placeholder is automatically replaced.

- `{{entry}}-styles.html`: contains all HTML `<link>` tags
- `{{entry}}-scripts.html`: contains all HTML `<script>` tags

First, let's add the plugin to the webpack configuration.

```js
const ChunksWebpackPlugin = require('chunks-webpack-plugin');
const path = require('path');

module.exports = {
  entry: 'main.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, './dist')
  },
  plugins: [new ChunksWebpackPlugin()]
};
```

HTML files are built in the output path directory with the rest of the webpack output.

Then, include the HTML files in the wanted pages.

__main-styles.html__

```html
<link rel="stylesheet" href="main.css" />
```

__main-scripts.html__

```html
<script src="main.js"></script>
```

---

## Using a configuration

You can pass a configuration object to `ChunksWebpackPlugin` to override the default settings.

### `outputPath`

`string = null`

Tells the plugin whether to personalize the output path of the generated files.

```js
new ChunksWebpackPlugin({
  outputPath: path.resolve(__dirname, './templates')
});
```

T> The default behavior will use the  `options.output.path` from the [webpack configuration](https://webpack.js.org/configuration/output/#outputpath).

W> The `outputPath` must be an absolute path.

### `fileExtension`

`string = '.html'`

Tells the plugin whether to personalize the extension of the generated files.

```js
new ChunksWebpackPlugin({
  fileExtension: '.html'
});
```

### `templateStyle`

`string = '<link rel="stylesheet" href="{{chunk}}" />'`

Tells the plugin whether to personalize the default template for the HTML `<style>` tags. For example, add additional attributes, a CDN prefix or something else.

```js
new ChunksWebpackPlugin({
  templateStyle: '<link rel="stylesheet" href="{{chunk}}" />'
});
```

T> Keep the `{{chunk}}` placeholder, it is automatically replaced by the concatenation of the webpack public path and the chunk filename.

### `templateScript`

`string = '<script src="{{chunk}}"></script>'`

Tells the plugin whether to personalize the default template for the HTML `<script>` tags. For example, add additional attributes, a CDN prefix or something else.

```js
new ChunksWebpackPlugin({
  templateScript: '<script src="{{chunk}}"></script>'
});
```

T> Keep the `{{chunk}}` placeholder, it is automatically replaced by the concatenation of the webpack public path and the chunk filename.

### `customFormatTags`

`boolean: false` `function (chunksSorted, Entrypoint) => object`

Tells the plugin whether to personalize the default behavior for generating your own templates. The function is called for each entry point. Can be used to add a custom behavior for a specific entry point.

```js
new ChunksWebpackPlugin({
  customFormatTags: (chunksSorted, Entrypoint) => {
    // Generate all HTML style tags with a CDN prefix
    const styles = chunksSorted.styles.map(chunkCss =>
      `<link rel="stylesheet" href="https://cdn.domain.com/${chunkCss}" />`
    ).join('');

    // Generate all HTML style tags with CDN prefix and defer attribute
    const scripts = chunksSorted.scripts.map(chunkJs =>
      `<script defer src="https://cdn.domain.com/${chunkJs}"></script>`
    ).join('');

    return { styles, scripts };
  }
});
```

T> The arrow function syntax allow you to access the class properties.

W> The function provides more flexibility by replacing the default behavior. Follow the example above to make sure it works.

The function must return an object with the following format:

```json
{
  "styles": "",
  "scripts": ""
}
```

The `customFormatTags` function has two parameters:

#### `chunksSorted`

`object`

The list of the chunks sorted by type: `styles` and `scripts`.

#### `Entrypoint`

`object`

The object is included in every single ChunkGroup. The variable contains all information about the current entry point; log it on the console for more details.

W> Use this variable only for a full customization if the `chunksSorted` variable does not meet your needs.

### `generateChunksManifest`

`boolean = false`

Tells the plugin whether to generate the `chunks-manifest.json`. The file contains the list of all chunks grouped by entry points.

```js
new ChunksWebpackPlugin({
  generateChunksManifest: true
});
```

Example of the output of the `chunks-manifest.json` file:

```json
{
  "app-a": {
    "styles": ["/dist/css/vendors~app-a~app-b.css", "/dist/css/app-a.css"],
    "scripts": ["/dist/js/vendors~app-a~app-b.js", "/dist/js/app-a.js"]
  },
  "app-b": {
    "styles": ["/dist/css/vendors~app-a~app-b.css", "/dist/css/app-b.css"],
    "scripts": ["/dist/js/vendors~app-a~app-b.js", "/dist/js/app-b.js"]
  }
}
```

### `generateChunksFiles`

`boolean = true`

Tells the plugin whether to generate the HTML files.

```js
new ChunksWebpackPlugin({
  generateChunksFiles: false
});
```

W> When set to `false`, HTML files will not be generated. It can only be useful together with  `generateChunksManifest` option set to `true` for custom generation of the HTML files.

### Caching

The [webpack caching](/guides/caching/) feature allows you to generate HTML files that include hash in the filename.

```js
const ChunksWebpackPlugin = require('chunks-webpack-plugin');
const path = require('path');

module.exports = {
  entry: 'main.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'bundle.[contenthash].js'
  },
  plugins: [new ChunksWebpackPlugin()]
};
```

This will generate the following HTML files with hash in the filename.

__main-styles.html__

```html
<link rel="stylesheet" href="main.72dd90acdd3d4a4a1fd4.css" />
```

__main-scripts.html__

```html
<script src="main.72dd90acdd3d4a4a1fd4.js"></script>
```

### Multiple entry points

Example of the webpack configuration with multiple entry points which share common code:

```js
const ChunksWebpackPlugin = require('chunks-webpack-plugin');
const path = require('path');

module.exports = {
  entry: {
    home: 'home.js',
    news: 'news.js'
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'bundle.js'
  },
  plugins: [new ChunksWebpackPlugin()]
};
```

The plugin will generate all files in the `./dist/` directory:

__home-styles.html__

```html
<link rel="stylesheet" href="vendors~home~news.css" />
<link rel="stylesheet" href="home.css" />
```

__home-scripts.html__

```html
<script src="vendors~home~news.js"></script>
<script src="home.js"></script>
```

__news-styles.html__

```html
<link rel="stylesheet" href="vendors~home~news.css" />
<link rel="stylesheet" href="news.css" />
```

__news-scripts.html__

```html
<script src="vendors~home~news.js"></script>
<script src="news.js"></script>
```
