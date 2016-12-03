---
title: Code Splitting - CSS
sort: 3
contributors:
  - pksjce
---

In webpack, when you use the css-loader and import CSS into your JavaScript files, the CSS is bundled along with your JavaScript.
This has the disadvantage that, you will not be able to utilize the browser's ability to load CSS asynchronously and parallel. Instead, your page will have to wait until your whole JavaScript bundle is loaded, to style itself.
webpack can help with this problem by bundling the CSS separately using [extract-text-webpack-plugin](https://github.com/webpack/extract-text-webpack-plugin) and the [css-loader](https://github.com/webpack/css-loader).

## Using `css-loader`

To import css into your JavaScript code like [any other module](concept/modules), you will have to use the [css-loader](https://github.com/webpack/css-loader)
The webpack config with `css-loader` will look like

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

## Using `extract-text-webpack-plugin` - ExtractTextPlugin

Install this plugin as follows
```
npm i --save-dev extract-text-webpack-plugin
```

To use this `ExtractTextPlugin`, it needs to be added to the `webpack.config.js` file in two steps.
### In the loader

Adapting from the previous example with the `css-loader`, we should add `ExtractTextPlugin` as follows

```javascript
...
loader: ExtractTextPlugin.extract('css-loader?sourceMap') //Can be used without sourcemaps too.
...
```

### In the plugin

```javascript
new ExtractTextPlugin({ filename: 'bundle.css', disable: false, allChunks: true })
```

With above two steps, you can generate a new bundle specifically for all the CSS modules and add them as a separate tag in the `index.html`
For more info on how to use the api please go to [`ExtractTextPlugin` api](https://github.com/webpack/extract-text-webpack-plugin#api).

The full config for splitting css with `ExtractTextPlugin` is as follows

```javascript
var ExtractTextPlugin = require('extract-text-webpack-plugin');
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
                loader: ExtractTextPlugin.extract({
                    loader: 'css-loader?sourceMap'
                })
            }]
        },
        devtool: 'source-map',
        plugins: [
            new ExtractTextPlugin({ filename: 'bundle.css', disable: false, allChunks: true })
        ]
    }
}
```
