---
title: Code Splitting - CSS
sort: 31
contributors:
  - pksjce
  - jonwheeler
  - johnstew
  - simon04
  - shinxi
---

To bundle CSS files with webpack, import CSS into your JavaScript code like [any other module](/concepts/modules), and use the `css-loader` (which outputs the CSS as JS module), and optionally apply the `ExtractTextWebpackPlugin` (which extracts the bundled CSS and outputs CSS files).

## Importing CSS

Import the CSS file like a JavaScript module, for instance in `vendor.js`:

```javascript
import 'bootstrap/dist/css/bootstrap.css';
```

## Using `css-loader`

Configure the [`css-loader`](/loaders/css-loader) in `webpack.config.js` as follows:

```javascript
module.exports = {
    module: {
        rules: [{
            test: /\.css$/,
            use: 'css-loader'
        }]
    }
}
```

As a result, the CSS is bundled along with your JavaScript.

This has the disadvantage that you will not be able to utilize the browser's ability to load CSS asynchronously and parallel. Instead, your page will have to wait until your whole JavaScript bundle is loaded, to style itself.

webpack can help with this problem by bundling the CSS separately using the `ExtractTextWebpackPlugin`.

## Using `ExtractTextWebpackPlugin`

Install the [`ExtractTextWebpackPlugin`](/plugins/extract-text-webpack-plugin) plugin as follows
```
npm i --save-dev extract-text-webpack-plugin
```

To use this plugin, it needs to be added to the `webpack.config.js` file in three steps.

```diff
+var ExtractTextPlugin = require('extract-text-webpack-plugin');
module.exports = {
    module: {
         rules: [{
             test: /\.css$/,
-            use: 'css-loader'
+            use: ExtractTextPlugin.extract({
+                use: 'css-loader'
+            })
         }]
     },
+    plugins: [
+        new ExtractTextPlugin('styles.css'),
+    ]
}
```

With above two steps, you can generate a new bundle specifically for all the CSS modules and add them as a separate tag in the `index.html`.
