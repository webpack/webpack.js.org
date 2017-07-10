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


## Using Source Maps

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
 3. webpack-dev-middlware

In most cases, you probably would want to use `webpack-dev-server`, but let's explore all of the above options.


### Using Webpack Watch Mode

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


### Using webpack-dev-server

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

Now we can run `npm run server` from the command line and we will see our browser automatically loading up a new page (usually `localhost:8080`). If you now change any of the source files and save them, the web server will automatically reload after the code has been compiled. Give it a try!

The `webpack-dev-server` comes with many configurable options. Head over to the [`documentation`](/configuration/dev-server) to learn more.

T> Now that your server is working, you might want to give [`Hot Module Replacement`](/guides/hot-module-replacement) a try. It's a logical next step!


### Using webpack-dev-middleware

W> This section is currently not working out of the box.


## Adjusting Your Text Editor

When using automatic compilation of your code, you could run into issues when saving your files. Some editors have a "safe write "feature that can potentially interfere with recompilation.

To disable this feature in some common editors, see the list below:

 * **Sublime Text 3** - Add `atomic_save: "false"` to your user preferences.
 * **IntelliJ** - use search in the preferences to find "safe write" and disable it.
 * **Vim** - add `:set backupcopy=yes` to your settings.
 * **WebStorm** - uncheck Use `"safe write"` in `Preferences > Appearance & Behavior > System Settings`.


 ## Conclusion

 Now that you've learned how to automatically compile your code whenever you save a file, and how to run a simple development server, you can check out the next guide that covers [`Hot Module Replacement`](/guides/hot-module-replacement).
