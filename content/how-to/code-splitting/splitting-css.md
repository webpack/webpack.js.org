---
title: How to Split CSS?
contributors:
  - pksjce
---

In `webpack`, when you use the css loader and import css into your javascript files, the css is bundled along with your javascript.
This has the disadvantage that, you will not be able to utilize the browser's ability to load css asynchronously and parallely. Instead, your page will have to wait until your whole javascript bundle is loaded, to style itself.
`webpack` can help with this problem by bundling the css separately using [Extract-Text-Webpack-Plugin](https://github.com/webpack/extract-text-webpack-plugin) and the [css-loader](https://github.com/webpack/css-loader)

## Using `css-loader`

To import css into your javascript code like [any other module](concept/modules), you will have to use the [css-loader](https://github.com/webpack/css-loader)
The webpack config with `css-loader` will look somewhat like

```javascript
//webpack.config.js

modules.exports = function(env){
    entry: '..',
    ...
    module: {
        loaders: [{
            test: /\.css$/,
            exclude: /node_modules/,
            loader: 'css-loader'
        }]
    }
    ...
}
```

## Using `extract-text-webpack-plugin` - ExtractPlugin

Install this plugin as follows
```
npm i --save-dev extract-text-webpack-plugin
```

To use this ExtractPlugin, it needs to be added to the `webpack.config.js` file in two steps.
### In the loader

Adapting from the previous example with the `css-loader`, we should add ExtractPlugin as follows

```javascript
...
loader: ExtractPlugin.extract('css-loader?sourceMap') //Can be used without sourcemaps too.
...
```

### In the plugin

```javascript
new ExtractPlugin({ filename: 'bundle.css', disable: false, allChunks: true })
```

With above two steps, you can generate a new bundle specifically for all the css modules and add them as a separate tag in the `index.html`
For more info on how to use the api please go to [ExtractPlugin api](https://github.com/webpack/extract-text-webpack-plugin#api)
The full config for splitting css with ExtractPlugin is as follows

```javascript
var ExtractPlugin = require('extract-text-webpack-plugin');
module.exports = function () {
    return {
        entry: './main.js',
        output: {
            path: './dist',
            filename: 'bundle.js'
        },
        module: {
            loaders: [{
                test: /\.css$/,
                exclude: /node_modules/,
                loader: Extract.extract('css-loader?sourceMap')
            }]
        },
        devtool: 'source-map',
        plugins: [
            new ExtractPlugin({ filename: 'bundle.css', disable: false, allChunks: true })
        ]
    }
}
```