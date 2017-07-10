---
title: Development
sort: 5
contributors:
  - SpaceK33z
  - rafde
  - fvgs
  - TheDutchCoder
---

T> This guide uses examples from the [`Webpack Guides Code Examples`](https://github.com/TheDutchCoder/webpack-guides-code-examples) repo.

If you've been following the guides, you should have a solid understanding of some of the webpack basics. Before we continue, let's look into setting up a development environment to make our lives a little easier.

W> The tools in this guide are meant for development **only**, do not ever use them in production!


## Source Maps

When webpack creates bundles from your code, it can become difficult to track down errors and warnings in your JavaScript. For example, if you bundle three source files (`a.js`, `b.js`, and `c.js`) into one bundle (`bundle.js`) and one of the source files contains an error, you will see the error in your console coming from `bundle.js` which isn't always very helpful (you want to know which source file the error came from).

In order to make it easier to track down errors and warnings, JavaScript offers Source Maps, which maps your compiled code back to your original source code. So if an error originates from `b.js`, the Source Map will tell you exactly that.

There are a lot of [different options](/configuration/devtool) available when it comes to Source Maps, be sure to check them out so you can configure them to your needs.

For this guide, let's use the `inline-source-map` option, which is good for illustrative purposes(but don't use it in production):

__webpack.config.js__

``` diff
  var path = require('path');

  module.exports = {
    entry: {
      app: './src/index.js',
      print: './src/print.js'
    },
    devtool: 'cheap-eval-source-map',
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist')
    }
  };
```

Now let's make sure we have something to debug, so let's create an error in our `print.js` file:

__src/print.js__

``` diff
  export default function printMe() {
-   console.log('I get called from print.js!');
+   cosnole.log('I get called from print.js!');
  }
```

Run an `npm run build`, it should compile to something like this:

``` bash
Hash: 7bf68ca15f1f2690e2d1
Version: webpack 3.1.0
Time: 1224ms
          Asset       Size  Chunks                    Chunk Names
  app.bundle.js    1.44 MB    0, 1  [emitted]  [big]  app
print.bundle.js    6.43 kB       1  [emitted]         print
     index.html  248 bytes          [emitted]
   [0] ./src/print.js 84 bytes {0} {1} [built]
   [1] ./src/index.js 403 bytes {0} [built]
   [3] (webpack)/buildin/global.js 509 bytes {0} [built]
   [4] (webpack)/buildin/module.js 517 bytes {0} [built]
    + 1 hidden module
Child html-webpack-plugin for "index.html":
       [2] (webpack)/buildin/global.js 509 bytes {0} [built]
       [3] (webpack)/buildin/module.js 517 bytes {0} [built]
        + 2 hidden modules
```

 Now open the resulting `index.html` file in your browser. Click the button and look in your console where the error is displayed. The error should say something like this:

 ```
 Uncaught ReferenceError: cosnole is not defined
    at HTMLButtonElement.printMe (print.js:2)
 ```

 We can see that the error also contains a reference to the file (`print.js`) and line number (2) where the error occurred. This is great, because now we know exactly where to look to fix the issue.


## Choosing a Development Tool

W> Some text editors have a "safe write" function that might interfere with some of the following tools. Read [`Adjusting Your text Editor`](#adjusting-your-text-editor) for a solution to these issue.

It quickly becomes a hassle to manually run `npm run build` everytime you want to compile your code.

There are a couple of different options available in webpack that help you automatically compile your code whenever it changes:

 1. webpack's Watch Mode
 2. webpack-dev-server
 3. webpack-dev-server with webpack-dev-middlware

In most cases, you probably would want to use `webpack-dev-server`, but let's explore all of them first.


### Webpack Watch Mode

Webpack's Watch Mode allows you to watch a set of files for changing. Webpack will then automatically recompile your code for you, so you don't have to do this manually.

Let's add an npm script that will start webpack's Watch Mode:

__package.json__

``` diff
  {
    "name": "asset-management",
    "version": "1.0.0",
    "description": "",
    "main": "webpack.config.js",
    "scripts": {
      "test": "echo \"Error: no test specified\" && exit 1",
+     "watch": "webpack --progress --watch",
      "build": "webpack"
    },
    "keywords": [],
    "author": "",
    "license": "ISC",
    "devDependencies": {
      "css-loader": "^0.28.4",
      "csv-loader": "^2.1.1",
      "file-loader": "^0.11.2",
      "html-webpack-plugin": "^2.29.0",
      "style-loader": "^0.18.2",
      "webpack": "^3.0.0",
      "xml-loader": "^1.2.1"
    }
  }
```

Now you can run `npm run watch` from the command line and you will see that webpack compiles your code, but it doesn't exit to the command line (this is because the script is still watching your files).

Let's make some changes to our code (let's remove the error we introduced):

__src/print.js__

``` diff
  export default function printMe() {
-   cosnole.log('I get called from print.js!');
+   console.log('I get called from print.js!');
  }
```

Now save your file and watch your command line, you should see webpack automatically recompile your code (but only the affected files)!

The only downside is that you have te refresh your browser in order to see the changes. It would be much nicer if that would happen automatically as well, so let's take care of that.


### webpack-dev-server

The `webpack-dev-server` provides you with a simple web server and the ability to use live reloading. Let's set it up:

``` bash
npm install --save-dev webpack-dev-server
```

Change your config file to tell the dev server where to look for files:

__webpack.config.js__

``` diff
  const path = require('path');
  const HtmlWebpackPlugin = require('html-webpack-plugin');

  module.exports = {
    entry: {
      app: './src/index.js',
      print: './src/print.js'
    },
    devtool: 'inline-source-map',
+   devServer: {
+     contentBase: './dist'
+   },
    plugins: [
      new HtmlWebpackPlugin({
        title: 'Development'
      })
    ],
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist')
    }
  };
```

This tells the dev server to serve our files from the `dist` folder (where our files get generated) and serve them on `localhost:8080`.

Let's add a script to easily run the dev server as well:

__package.json__

``` diff
  {
    "name": "asset-management",
    "version": "1.0.0",
    "description": "",
    "main": "webpack.config.js",
    "scripts": {
      "test": "echo \"Error: no test specified\" && exit 1",
      "watch": "webpack --progress --watch",
+     "server": "webpack-dev-server --open"
      "build": "webpack"
    },
    "keywords": [],
    "author": "",
    "license": "ISC",
    "devDependencies": {
      "css-loader": "^0.28.4",
      "csv-loader": "^2.1.1",
      "file-loader": "^0.11.2",
      "html-webpack-plugin": "^2.29.0",
      "style-loader": "^0.18.2",
      "webpack": "^3.0.0",
      "xml-loader": "^1.2.1"
    }
  }
```

Now we can run `npm run server` from the command line and we will see our browser automatically loading up a new page (usually `localhost:8080`).

If you now change any of the source files and save them, the web server will automatically reload after the code has been compiled.

Give it a try!



Luckily webpack offers a **watch mode**, which enabled you to have your code compiled for you automatically every time you make a change to a file and save it.





webpack can be used with **watch mode**. In this mode webpack will watch your files, and recompile when they change.
**webpack-dev-server** provides an easy to use development server with fast live reloading. If you already have a development server and want full flexibility, **webpack-dev-middleware** can be used as middleware.

webpack-dev-server and webpack-dev-middleware use in-memory compilation, meaning that the bundle will not be saved to disk. This makes compiling faster and results in less mess on your file system.

In most cases **you'll want to use webpack-dev-server**, since it's the easiest to get started with and offers much functionality out-of-the-box.


### webpack Watch Mode

>W Some editors have a "safe write" feature, which can interfere with webpack's watch mode. It is recommended to [adjust your editor in order to prevent issues](#adjusting-your-text-editor).

webpack's watch mode watches files for changes. If any change is detected, it'll run the compilation again.

We also want a nice progress bar while it's compiling. Let's run the command:

```bash
webpack --progress --watch
```

Make a change in one of your files and hit save. You should see that it's recompiling.

Watch mode makes no assumptions about a server, so you will need to provide your own. An easy server to use is [`serve`](https://github.com/zeit/serve). After installing (`npm install --save-dev serve`), you can run it in the directory where the outputted files are:

```bash
`npm bin`/serve
```

You may find it more convenient to run `serve` using npm scripts. You can do so by first creating a `start` script in `package.json` as follows:

```json
...
"scripts": {
  "start": "serve"
}
...
```

You can then start the server by running `npm start` from within your project directory. After each compilation, you will need to manually refresh your browser to see the changes.

T> You may find the `--single` option useful for serving single page apps.


### Watch Mode with Chrome DevTools Workspaces

If you set up Chrome to [persist changes when saving from the _Sources_ panel](https://medium.com/@rafaelideleon/webpack-your-chrome-devtools-workspaces-cb9cca8d50da)
so you don't have to refresh the page, you will have to setup webpack to use

```javascript
devtool: "inline-source-map"
```

to continue editing and saving your changes from Chrome or source files.

There are some _gotchas_ about using workspaces with watch:

* Large chunks (such as a common chunk that is over 1MB) that are rebuilt could cause the page to blank, which will force you to refresh the browser.
* Smaller chunks will be faster to build than larger chunks since `inline-source-map` is slower due to having to base64 encode the original source code.


### webpack-dev-server

webpack-dev-server provides you with a server and live reloading. This is easy to setup.

To prepare, make sure you have a `index.html` file that points to your bundle. Assuming that `output.filename` is `bundle.js`:

```html
<script src="/bundle.js"></script>
```

Start with installing `webpack-dev-server` from npm:

```bash
npm install --save-dev webpack-dev-server
```

When it's done installing, you should be able to use `webpack-dev-server` like this:

```bash
webpack-dev-server --open
```

T> If your console says it can't find the command, try running `node_modules/.bin/webpack-dev-server`. Optimally you would add the command to your `package.json`, like this: `"scripts": { "start": "webpack-dev-server" }`.

The command above should automatically open your browser on `http://localhost:8080`.

Make a change in one of your files and hit save. You should see that the console is recompiling. After that's done, the page should be refreshed. If nothing happens in the console, you may need to fiddle with [`watchOptions`](/configuration/dev-server#devserver-watchoptions-).

Now you have live reloading working, you can take it even a step further: Hot Module Replacement. This is an interface that makes it possible to swap modules **without a page refresh**. See the [Hot Module Replacement guide](/guides/hot-module-replacement) for more information.

By default **inline mode** is used. This mode injects the client - needed for live reloading and showing build errors - in your bundle. With inline mode you will get build errors and warnings in your DevTools console.

webpack-dev-server can do many more things such as proxying requests to your backend server. For more configuration options, see the [**devServer documentation**](/configuration/dev-server).


### webpack-dev-middleware

webpack-dev-middleware works for connect-based middleware stacks. This can be useful if you already have a Node.js server or if you want to have full control over the server.

The middleware will cause webpack to compile files in-memory. When a compilation is running, it will delay the request to a file until the compilation is done.

W> This is intended for advanced users. webpack-dev-server is much easier to use.

Start with installing the dependencies from npm:

```bash
npm install --save-dev express webpack-dev-middleware
```

After installing, you can use the middleware like this:

```js
var express = require("express");
var webpackDevMiddleware = require("webpack-dev-middleware");
var webpack = require("webpack");
var webpackConfig = require("./webpack.config");

var app = express();
var compiler = webpack(webpackConfig);

app.use(webpackDevMiddleware(compiler, {
  publicPath: "/" // Same as `output.publicPath` in most cases.
}));

app.listen(3000, function () {
  console.log("Listening on port 3000!");
});
```

Depending on what you've used in `output.publicPath` and `output.filename`, your bundle should now be available on `http://localhost:3000/bundle.js`.

By default, **watch mode** is used. It's also possible to use **lazy mode**, which will only recompile on a request to the entry point.

To compile only on a request to the entry `bundle.js`:

```js
app.use(webpackDevMiddleware(compiler, {
  lazy: true,
  filename: "bundle.js" // Same as `output.filename` in most cases.
}));
```

There are many more options you can use. For all configuration options, see the [**devServer documentation**](/configuration/dev-server).


## Adjusting Your Text Editor

Some text editors have a "safe write" feature enabled by default. As a result, saving a file will not always result in a recompilation of your code.

Each editor has a different way of disabling this, but for the most common ones you can reference this list:

* **Sublime Text 3** - Add `"atomic_save": false` to your user preferences.
* **IntelliJ** - use search in the preferences to find "safe write" and disable it.
* **Vim** - add `:set backupcopy=yes` in your settings.
* **WebStorm** - uncheck `Use "safe write"` in Preferences > Appearance & Behavior > System Settings


## References

* [SurviveJS - Automatic Browser Refresh](http://survivejs.com/webpack/developing-with-webpack/automatic-browser-refresh/)
* [webpack your Chrome DevTools Workspaces](https://medium.com/@rafaelideleon/webpack-your-chrome-devtools-workspaces-cb9cca8d50da)
