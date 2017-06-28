---
title: Output Management
sort: 4
contributors:
  - skipjack
  - TheDutchCoder
---

So far we've manually included all our assets in our `index.html` file, but as your application grows and once you start [using hashes in filenames](/guides/caching) and outputting [multiple bundles](/guides/code-splitting-libraries), it will be difficult to keep managing your `index.html` file manually. However, there's no need to fear as a few plugins exist that will make this process much easier to manage.

First, let's adjust our project a little bit:

__dist/index.html__

``` diff
  <html>
    <head>
-     <title>Asset Management</title>
+     <title>Output Management</title>
+     <script src="./vendor.bundle.js"></script>
    </head>
    <body>
-     <script src="./bundle.js"></script>
+     <script src="./app.bundle.js"></script>
    </body>
  </html>
```

Now adjust the config. We'll be adding a vendor entry point as an example and we'll change the output as well, so that it will dynamically generate bundle names, based on the entry point names:

__webpack.config.js__

``` diff
  const path = require('path');

  module.exports = {
    entry: {
-     index: './src/index.js',
+     app: './src/index.js',
+     vendor: ['lodash']
    },
    output: {
-     filename: 'bundle.js',
+     filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist')
    }
  };
```

Let's run `npm run build` and see what this generates:

``` bash
Hash: 5f3b0265b87c603b4a0f
Version: webpack 2.6.1
Time: 539ms
           Asset     Size  Chunks                    Chunk Names
vendor.bundle.js   544 kB       0  [emitted]  [big]  vendor
   app.bundle.js  2.81 kB       1  [emitted]         app
   [0] ./~/lodash/lodash.js 540 kB {0} [built]
   [1] (webpack)/buildin/global.js 509 bytes {0} [built]
   [2] (webpack)/buildin/module.js 517 bytes {0} [built]
   [3] ./src/index.js 172 bytes {1} [built]
   [4] multi lodash 28 bytes {0} [built]
```

We can see that webpack generates our `vendor.bundle.js` and `app.bundle.js` files, which we also specified in our `index.html` file. But what would happen if we changed the name of one of our entry points? The generated bundles would be renamed on a build, but our `index.html` file would still reference the old names. Let's fix that with the [`HtmlWebpackPlugin`](/plugins/html-webpack-plugin).


## Setting up HtmlWebpackPlugin ##

First install the plugin and adjust the `webpack.config.js` file:

``` bash
npm install --save-dev html-webpack-plugin
```

__webpack.config.js__

``` diff
  const path = require('path');
+ const HtmlWebpackPlugin = require('html-webpack-plugin');

  module.exports = {
    entry: {
      app: './src/index.js',
      vendor: ['lodash']
    },
+   plugins: [
+     new HtmlWebpackPlugin()
+   ],
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist')
    }
  };
```

Now run `npm run build` and you should see something similar to this:

``` bash
Hash: 81f82697c19b5f49aebd
Version: webpack 2.6.1
Time: 854ms
           Asset       Size  Chunks                    Chunk Names
vendor.bundle.js     544 kB       0  [emitted]  [big]  vendor
   app.bundle.js    2.81 kB       1  [emitted]         app
      index.html  249 bytes          [emitted]
   [0] ./~/lodash/lodash.js 540 kB {0} [built]
   [1] (webpack)/buildin/global.js 509 bytes {0} [built]
   [2] (webpack)/buildin/module.js 517 bytes {0} [built]
   [3] ./src/index.js 172 bytes {1} [built]
   [4] multi lodash 28 bytes {0} [built]
Child html-webpack-plugin for "index.html":
       [0] ./~/lodash/lodash.js 540 kB {0} [built]
       [1] ./~/html-webpack-plugin/lib/loader.js!./~/html-webpack-plugin/default_index.ejs 538 bytes {0} [built]
       [2] (webpack)/buildin/global.js 509 bytes {0} [built]
       [3] (webpack)/buildin/module.js 517 bytes {0} [built]
```

If you open `index.html` in your code editor, you'll see that the `HtmlWebpackPlugin` has created an entirely new file for you and that all the bundles are automatically added. This is great, but it also has overwritten everything else we had in our file.

In most cases you probably want to provide a certain template to the `HtmlWebpackPlugin`, so that you can still have your own `index.html` file, but have webpack automatically add generated files.


## Adding a template ##

Let's add a template that `HtmlWebpackPlugin` can use, but we keep it in our `src` directory instead.

>T `HtmlWebpackPlugin` uses the `.ejs` extension by default for templates.

__project__

``` diff
  webpack-demo
  |- package.json
  |- webpack.config.js
  |- /dist
    |- bundle.js
-   |- index.html
  |- /src
+   |- index.ejs
    |- index.js
  |- /node_modules
```

__src/index.ejs__

``` html
<html>
  <head>
    <title><%= htmlWebpackPlugin.options.title %></title>
  </head>
  <body>
    <h1>Output Management</h1>
  </body>
</html>
```

Now adjust your `webpack.config.js` and tell `HtmlWebpackPlugin` to use our new template:

__webpack.config.js__

``` diff
  const path = require('path');
  const HtmlWebpackPlugin = require('html-webpack-plugin');

  module.exports = {
    entry: {
      app: './src/index.js',
      vendor: ['lodash']
    },
    plugins: [
-     new HtmlWebpackPlugin()
+     new HtmlWebpackPlugin({
+       title: 'Output Management',
+       filename: 'index.html',
+       template: 'src/index.html'
+     })
    ],
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist')
    }
  };
```

Now run `npm run build` again, which should yield a similar result as in the last step:

``` bash
Hash: 3adf5eed79147a35559e
Version: webpack 2.6.1
Time: 844ms
           Asset       Size  Chunks                    Chunk Names
vendor.bundle.js     544 kB       0  [emitted]  [big]  vendor
   app.bundle.js    2.81 kB       1  [emitted]         app
      index.html  244 bytes          [emitted]
   [0] ./~/lodash/lodash.js 540 kB {0} [built]
   [1] (webpack)/buildin/global.js 509 bytes {0} [built]
   [2] (webpack)/buildin/module.js 517 bytes {0} [built]
   [3] ./src/index.js 172 bytes {1} [built]
   [4] multi lodash 28 bytes {0} [built]
Child html-webpack-plugin for "index.html":
       [0] ./~/lodash/lodash.js 540 kB {0} [built]
       [1] ./~/html-webpack-plugin/lib/loader.js!./src/index.ejs 540 bytes {0} [built]
       [2] (webpack)/buildin/global.js 509 bytes {0} [built]
       [3] (webpack)/buildin/module.js 517 bytes {0} [built]
```

Open `index.html` in your code editor again. This time you will see that the `HtmlWebpackPlugin` has dynamically added a title (which we specified in our `webpack.config.js` at the `HtmlWebpackPlugin` configuration options), as well as the generated bundles.

This is great, because now we don't have to manually adjust our `index.html` file anymore, webpack takes care of that. As an added bonus, we now keep the `index.ejs` template in our `src` directory, so our `dist` directory only contains generated files.

T> Check out the [`HtmlWebpackTemplate`](https://github.com/ampedandwired/html-webpack-plugin#configuration) page for more advanced options, including outputting multiple HTML files.


## Conclusion ##

Now that you've learned about dynamically adding bundles to your HTML, let's dive into the next guide where this will be very useful: [`Code Splitting`](/guides/code-splitting).
