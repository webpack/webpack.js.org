---
title: Output Management
sort: 3
contributors:
  - skipjack
  - TheDutchCoder
  - sudarsangp
  - JGJP
  - EugeneHlushko
  - AnayaDesign
  - chenxsan
---

T> This guide extends on code examples found in the [`Asset Management`](/guides/asset-management) guide.

So far we've manually included all our assets in our `index.html` file, but as your application grows and once you start [using hashes in filenames](/guides/caching) and outputting [multiple bundles](/guides/code-splitting), it will be difficult to keep managing your `index.html` file manually. However, a few plugins exist that will make this process much easier to manage.

## Preparation

First, let's adjust our project a little bit:

**project**

```diff
  webpack-demo
  |- package.json
  |- webpack.config.js
  |- /dist
  |- /src
    |- index.js
+   |- print.js
  |- /node_modules
```

Let's add some logic to our `src/print.js` file:

**src/print.js**

```js
export default function printMe() {
  console.log('I get called from print.js!');
}
```

And use that function in our `src/index.js` file:

**src/index.js**

```diff
 import _ from 'lodash';
+import printMe from './print.js';

 function component() {
   const element = document.createElement('div');
+  const btn = document.createElement('button');

   element.innerHTML = _.join(['Hello', 'webpack'], ' ');

+  btn.innerHTML = 'Click me and check the console!';
+  btn.onclick = printMe;
+
+  element.appendChild(btn);
+
   return element;
 }

 document.body.appendChild(component());
```

Let's also update our `dist/index.html` file, in preparation for webpack to split out entries:

**dist/index.html**

```diff
 <!DOCTYPE html>
 <html>
   <head>
     <meta charset="utf-8" />
-    <title>Asset Management</title>
+    <title>Output Management</title>
+    <script src="./print.bundle.js"></script>
   </head>
   <body>
-    <script src="bundle.js"></script>
+    <script src="./index.bundle.js"></script>
   </body>
 </html>
```

Now adjust the config. We'll be adding our `src/print.js` as a new entry point (`print`) and we'll change the output as well, so that it will dynamically generate bundle names, based on the entry point names:

**webpack.config.js**

```diff
 const path = require('path');

 module.exports = {
-  entry: './src/index.js',
+  entry: {
+    index: './src/index.js',
+    print: './src/print.js',
+  },
   output: {
-    filename: 'bundle.js',
+    filename: '[name].bundle.js',
     path: path.resolve(__dirname, 'dist'),
   },
 };
```

Let's run `npm run build` and see what this generates:

```bash
...
[webpack-cli] Compilation finished
asset index.bundle.js 69.5 KiB [emitted] [minimized] (name: index) 1 related asset
asset print.bundle.js 316 bytes [emitted] [minimized] (name: print)
runtime modules 1.36 KiB 7 modules
cacheable modules 530 KiB
  ./src/index.js 406 bytes [built] [code generated]
  ./src/print.js 83 bytes [built] [code generated]
  ./node_modules/lodash/lodash.js 530 KiB [built] [code generated]
webpack 5.4.0 compiled successfully in 1996 ms
```

We can see that webpack generates our `print.bundle.js` and `index.bundle.js` files, which we also specified in our `index.html` file. if you open `index.html` in your browser, you can see what happens when you click the button.

But what would happen if we changed the name of one of our entry points, or even added a new one? The generated bundles would be renamed on a build, but our `index.html` file would still reference the old names. Let's fix that with the [`HtmlWebpackPlugin`](/plugins/html-webpack-plugin).

## Setting up HtmlWebpackPlugin

First install the plugin and adjust the `webpack.config.js` file:

```bash
npm install --save-dev html-webpack-plugin
```

**webpack.config.js**

```diff
 const path = require('path');
+const HtmlWebpackPlugin = require('html-webpack-plugin');

 module.exports = {
   entry: {
     index: './src/index.js',
     print: './src/print.js',
   },
+  plugins: [
+    new HtmlWebpackPlugin({
+      title: 'Output Management',
+    }),
+  ],
   output: {
     filename: '[name].bundle.js',
     path: path.resolve(__dirname, 'dist'),
   },
 };
```

Before we do a build, you should know that the `HtmlWebpackPlugin` by default will generate its own `index.html` file, even though we already have one in the `dist/` folder. This means that it will replace our `index.html` file with a newly generated one. Let's see what happens when we do an `npm run build`:

```bash
...
[webpack-cli] Compilation finished
asset index.bundle.js 69.5 KiB [compared for emit] [minimized] (name: index) 1 related asset
asset print.bundle.js 316 bytes [compared for emit] [minimized] (name: print)
asset index.html 253 bytes [emitted]
runtime modules 1.36 KiB 7 modules
cacheable modules 530 KiB
  ./src/index.js 406 bytes [built] [code generated]
  ./src/print.js 83 bytes [built] [code generated]
  ./node_modules/lodash/lodash.js 530 KiB [built] [code generated]
webpack 5.4.0 compiled successfully in 2189 ms
```

If you open `index.html` in your code editor, you'll see that the `HtmlWebpackPlugin` has created an entirely new file for you and that all the bundles are automatically added.

If you want to learn more about all the features and options that the `HtmlWebpackPlugin` provides, then you should read up on it on the [`HtmlWebpackPlugin`](https://github.com/jantimon/html-webpack-plugin) repo.

## Cleaning up the `/dist` folder

As you might have noticed over the past guides and code example, our `/dist` folder has become quite cluttered. Webpack will generate the files and put them in the `/dist` folder for you, but it doesn't keep track of which files are actually in use by your project.

In general it's good practice to clean the `/dist` folder before each build, so that only used files will be generated. Let's take care of that.

You can use [`output.clean` option](/configuration/output/#outputclean) for the same purpose.

**webpack.config.js**

```diff
 const path = require('path');
 const HtmlWebpackPlugin = require('html-webpack-plugin');

 module.exports = {
   entry: {
     index: './src/index.js',
     print: './src/print.js',
   },
   plugins: [
     new HtmlWebpackPlugin({
       title: 'Output Management',
     }),
   ],
   output: {
     filename: '[name].bundle.js',
     path: path.resolve(__dirname, 'dist'),
+    clean: true,
   },
 };
```

Now run an `npm run build` and inspect the `/dist` folder. If everything went well you should now only see the files generated from the build and no more old files!

## The Manifest

You might be wondering how webpack and its plugins seem to "know" what files are being generated. The answer is in the manifest that webpack keeps to track how all the modules map to the output bundles. If you're interested in managing webpack's [`output`](/configuration/output) in other ways, the manifest would be a good place to start.

The manifest data can be extracted into a json file for easy consumption using the [`WebpackManifestPlugin`](https://github.com/shellscape/webpack-manifest-plugin).

We won't go through a full example of how to use this plugin within your projects, but you can read up on [the concept page](/concepts/manifest) and the [caching guide](/guides/caching) to find out how this ties into long term caching.

## Conclusion

Now that you've learned about dynamically adding bundles to your HTML, let's dive into the [development guide](/guides/development). Or, if you want to dig into more advanced topics, we would recommend heading over to the [code splitting guide](/guides/code-splitting).
