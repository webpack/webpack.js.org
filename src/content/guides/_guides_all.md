

# Installation

This guide goes through the various methods used to install webpack.


## Prerequisites

Before we begin, make sure you have a fresh version of [Node.js](https://nodejs.org/en/) installed. The current Long Term Support (LTS) release is an ideal starting point. You may run into a variety of issues with the older versions as they may be missing functionality webpack and/or its related packages require.


## Local Installation

The latest webpack release is:

[![GitHub release](https://img.shields.io/npm/v/webpack.svg?label=webpack&style=flat-square&maxAge=3600)](https://github.com/webpack/webpack/releases)

To install the latest release or a specific version, run one of the following commands:

``` bash
npm install --save-dev webpack
npm install --save-dev webpack@<version>
```

If you're using webpack v4 or later, you'll need to install the [CLI](/api/cli/).

``` bash
npm install --save-dev webpack-cli
```

Installing locally is what we recommend for most projects. This makes it easier to upgrade projects individually when breaking changes are introduced. Typically webpack is run via one or more [npm scripts](https://docs.npmjs.com/misc/scripts) which will look for a webpack installation in your local `node_modules` directory:

```json
"scripts": {
	"start": "webpack --config webpack.config.js"
}
```

T> To run the local installation of webpack you can access its bin version as `node_modules/.bin/webpack`.


## Global Installation

The following NPM installation will make `webpack` available globally:

``` bash
npm install --global webpack
```

W> Note that this is __not a recommended practice__. Installing globally locks you down to a specific version of webpack and could fail in projects that use a different version.


## Bleeding Edge

If you are enthusiastic about using the latest that webpack has to offer, you can install beta versions or even directly from the webpack repository using the following commands:

``` bash
npm install webpack@beta
npm install webpack/webpack#<tagname/branchname>
```

W> Take caution when installing these bleeding edge releases! They may still contain bugs and therefore should not be used in production.


# Getting Started

Webpack is used to compile JavaScript modules. Once [installed](/guides/installation), you can interface with webpack either from its [CLI](/api/cli) or [API](/api/node). If you're still new to webpack, please read through the [core concepts](/concepts) and [this comparison](/comparison) to learn why you might use it over the other tools that are out in the community.

## Basic Setup

First let's create a directory, initialize npm, [install webpack locally](/guides/installation#local-installation), and install the webpack-cli (the tool used to run webpack on the command line):

``` bash
mkdir webpack-demo && cd webpack-demo
npm init -y
npm install webpack webpack-cli --save-dev
```

T> Throughout the Guides we will use `diff` blocks to show you what changes we're making to directories, files, and code.

Now we'll create the following directory structure, files and their contents:

__project__

``` diff
  webpack-demo
  |- package.json
+ |- index.html
+ |- /src
+   |- index.js
```

__src/index.js__

``` javascript
function component() {
  let element = document.createElement('div');

  // Lodash, currently included via a script, is required for this line to work
  element.innerHTML = _.join(['Hello', 'webpack'], ' ');

  return element;
}

document.body.appendChild(component());
```

__index.html__

``` html
<!doctype html>
<html>
  <head>
    <title>Getting Started</title>
    <script src="https://unpkg.com/lodash@4.16.6"></script>
  </head>
  <body>
    <script src="./src/index.js"></script>
  </body>
</html>
```

We also need to adjust our `package.json` file in order to make sure we mark our package as `private`, as well as removing the `main` entry. This is to prevent an accidental publish of your code.

T> If you want to learn more about the inner workings of `package.json`, then we recommend reading the [npm documentation](https://docs.npmjs.com/files/package.json).

__package.json__

``` diff
  {
    "name": "webpack-demo",
    "version": "1.0.0",
    "description": "",
+   "private": true,
-   "main": "index.js",
    "scripts": {
      "test": "echo \"Error: no test specified\" && exit 1"
    },
    "keywords": [],
    "author": "",
    "license": "ISC",
    "devDependencies": {
    "webpack": "^4.20.2",
    "webpack-cli": "^3.1.2"
    },
    "dependencies": {}
  }
```

In this example, there are implicit dependencies between the `<script>` tags. Our `index.js` file depends on `lodash` being included in the page before it runs. This is because `index.js` never explicitly declared a need for `lodash`; it just assumes that the global variable `_` exists.

There are problems with managing JavaScript projects this way:

- It is not immediately apparent that the script depends on an external library.
- If a dependency is missing, or included in the wrong order, the application will not function properly.
- If a dependency is included but not used, the browser will be forced to download unnecessary code.

Let's use webpack to manage these scripts instead.

## Creating a Bundle

First we'll tweak our directory structure slightly, separating the "source" code (`/src`) from our "distribution" code (`/dist`). The "source" code is the code that we'll write and edit. The "distribution" code is the minimized and optimized `output` of our build process that will eventually be loaded in the browser:

__project__

``` diff
  webpack-demo
  |- package.json
+ |- /dist
+   |- index.html
- |- index.html
  |- /src
    |- index.js
```

To bundle the `lodash` dependency with `index.js`, we'll need to install the library locally:

``` bash
npm install --save lodash
```

T> When installing a package that will be bundled into your production bundle, you should use `npm install --save`. If you're installing a package for development purposes (e.g. a linter, testing libraries, etc.) then you should use `npm install --save-dev`. More information can be found in the [npm documentation](https://docs.npmjs.com/cli/install).

Now, lets import `lodash` in our script:

__src/index.js__

``` diff
+ import _ from 'lodash';
+
  function component() {
    let element = document.createElement('div');

-   // Lodash, currently included via a script, is required for this line to work
    element.innerHTML = _.join(['Hello', 'webpack'], ' ');

    return element;
  }

  document.body.appendChild(component());
```

Now, since we'll be bundling our scripts, we have to update our `index.html` file. Let's remove the lodash `<script>`, as we now `import` it, and modify the other `<script>` tag to load the bundle, instead of the raw `/src` file:

__dist/index.html__

``` diff
  <!doctype html>
  <html>
   <head>
     <title>Getting Started</title>
-    <script src="https://unpkg.com/lodash@4.16.6"></script>
   </head>
   <body>
-    <script src="./src/index.js"></script>
+    <script src="main.js"></script>
   </body>
  </html>
```

In this setup, `index.js` explicitly requires `lodash` to be present, and binds it as `_` (no global scope pollution). By stating what dependencies a module needs, webpack can use this information to build a dependency graph. It then uses the graph to generate an optimized bundle where scripts will be executed in the correct order.

With that said, let's run `npx webpack`, which will take our script at `src/index.js` as the [entry point](/concepts/entry-points), and will generate `dist/main.js` as the [output](/concepts/output). The `npx` command, which ships with Node 8.2/npm 5.2.0 or higher, runs the webpack binary (`./node_modules/.bin/webpack`) of the webpack package we installed in the beginning:

``` bash
npx webpack

...
Built at: 13/06/2018 11:52:07
  Asset      Size  Chunks             Chunk Names
main.js  70.4 KiB       0  [emitted]  main
...

WARNING in configuration
The 'mode' option has not been set, webpack will fallback to 'production' for this value. Set 'mode' option to 'development' or 'production' to enable defaults for each environment.
You can also set it to 'none' to disable any default behavior. Learn more: https://webpack.js.org/concepts/mode/
```

T> Your output may vary a bit, but if the build is successful then you are good to go. Also, don't worry about the warning, we'll tackle that later.

Open `index.html` in your browser and, if everything went right, you should see the following text: 'Hello webpack'.


## Modules

The [`import`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import) and [`export`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/export) statements have been standardized in [ES2015](https://babeljs.io/learn-es2015/) and [are supported in most browsers](https://caniuse.com/#search=modules). Some older browsers still lag behind but webpack supports modules out of the box.

Behind the scenes, webpack actually "transpiles" the code so that older browsers can also run it. If you inspect `dist/main.js`, you might be able to see how webpack does this, it's quite ingenious! Besides `import` and `export`, webpack supports various other module syntaxes as well, see [Module API](/api/module-methods) for more information.

Note that webpack will not alter any code other than `import` and `export` statements. If you are using other [ES2015 features](http://es6-features.org/), make sure to [use a transpiler](/loaders/#transpiling) such as [Babel](https://babeljs.io/) or [Bublé](https://buble.surge.sh/guide/) via webpack's [loader system](/concepts/loaders/).


## Using a Configuration

As of version 4, webpack doesn't require any configuration, but most projects will need a more complex setup, which is why webpack supports a [configuration file](/concepts/configuration). This is much more efficient than having to manually type in a lot of commands in the terminal, so let's create one:

__project__

``` diff
  webpack-demo
  |- package.json
+ |- webpack.config.js
  |- /dist
    |- index.html
  |- /src
    |- index.js
```

__webpack.config.js__

``` javascript
const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist')
  }
};
```

Now, let's run the build again but instead using our new configuration file:

``` bash
npx webpack --config webpack.config.js

...
  Asset      Size  Chunks             Chunk Names
main.js  70.4 KiB       0  [emitted]  main
...

WARNING in configuration
The 'mode' option has not been set, webpack will fallback to 'production' for this value. Set 'mode' option to 'development' or 'production' to enable defaults for each environment.
You can also set it to 'none' to disable any default behavior. Learn more: https://webpack.js.org/concepts/mode/
```

T> If a `webpack.config.js` is present, the `webpack` command picks it up by default. We use the `--config` option here only to show that you can pass a config of any name. This will be useful for more complex configurations that need to be split into multiple files.

A configuration file allows far more flexibility than simple CLI usage. We can specify loader rules, plugins, resolve options and many other enhancements this way. See the [configuration documentation](/configuration) to learn more.


## NPM Scripts

Given it's not particularly fun to run a local copy of webpack from the CLI, we can set up a little shortcut. Let's adjust our _package.json_ by adding an [npm script](https://docs.npmjs.com/misc/scripts):

__package.json__

``` diff
  {
    "name": "webpack-demo",
    "version": "1.0.0",
    "description": "",
    "scripts": {
      "test": "echo \"Error: no test specified\" && exit 1",
+     "build": "webpack"
    },
    "keywords": [],
    "author": "",
    "license": "ISC",
    "devDependencies": {
      "webpack": "^4.20.2",
      "webpack-cli": "^3.1.2"
    },
    "dependencies": {
      "lodash": "^4.17.5"
    }
  }
```

Now the `npm run build` command can be used in place of the `npx` command we used earlier. Note that within `scripts` we can reference locally installed npm packages by name the same way we did with `npx`. This convention is the standard in most npm-based projects because it allows all contributors to use the same set of common scripts (each with flags like `--config` if necessary).

Now run the following command and see if your script alias works:

``` bash
npm run build

...
  Asset      Size  Chunks             Chunk Names
main.js  70.4 KiB       0  [emitted]  main
...

WARNING in configuration
The 'mode' option has not been set, webpack will fallback to 'production' for this value. Set 'mode' option to 'development' or 'production' to enable defaults for each environment.
You can also set it to 'none' to disable any default behavior. Learn more: https://webpack.js.org/concepts/mode/.
```

T> Custom parameters can be passed to webpack by adding two dashes between the `npm run build` command and your parameters, e.g. `npm run build -- --colors`.


## Conclusion

Now that you have a basic build together you should move on to the next guide [`Asset Management`](/guides/asset-management) to learn how to manage assets like images and fonts with webpack. At this point, your project should look like this:

__project__

``` diff
webpack-demo
|- package.json
|- webpack.config.js
|- /dist
  |- main.js
  |- index.html
|- /src
  |- index.js
|- /node_modules
```

T> If you're using npm 5, you'll probably also see a `package-lock.json` file in your directory.

If you want to learn more about webpack's design, you can check out the [basic concepts](/concepts) and [configuration](/configuration) pages. Furthermore, the [API](/api) section digs into the various interfaces webpack offers.


# Asset Management

If you've been following the guides from the start, you will now have a small project that shows "Hello webpack". Now let's try to incorporate some other assets, like images, to see how they can be handled.

Prior to webpack, front-end developers would use tools like grunt and gulp to process these assets and move them from their `/src` folder into their `/dist` or `/build` directory. The same idea was used for JavaScript modules, but tools like webpack will __dynamically bundle__ all dependencies (creating what's known as a [dependency graph](/concepts/dependency-graph)). This is great because every module now _explicitly states its dependencies_ and we'll avoid bundling modules that aren't in use.

One of the coolest webpack features is that you can also _include any other type of file_, besides JavaScript, for which there is a loader. This means that the same benefits listed above for JavaScript (e.g. explicit dependencies) can be applied to everything used in building a website or web app. Let's start with CSS, as you may already be familiar with that setup.

## Setup

Let's make a minor change to our project before we get started:

__dist/index.html__

``` diff
  <!doctype html>
  <html>
    <head>
-    <title>Getting Started</title>
+    <title>Asset Management</title>
    </head>
    <body>
-     <script src="./main.js"></script>
+     <script src="./bundle.js"></script>
    </body>
  </html>
```

__webpack.config.js__

``` diff
  const path = require('path');

  module.exports = {
    entry: './src/index.js',
    output: {
-     filename: 'main.js',
+     filename: 'bundle.js',
      path: path.resolve(__dirname, 'dist')
    }
  };
```


## Loading CSS

In order to `import` a CSS file from within a JavaScript module, you need to install and add the [style-loader](/loaders/style-loader) and [css-loader](/loaders/css-loader) to your [`module` configuration](/configuration/module):

``` bash
npm install --save-dev style-loader css-loader
```

__webpack.config.js__

``` diff
  const path = require('path');

  module.exports = {
    entry: './src/index.js',
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'dist')
    },
+   module: {
+     rules: [
+       {
+         test: /\.css$/,
+         use: [
+           'style-loader',
+           'css-loader'
+         ]
+       }
+     ]
+   }
  };
```

T> webpack uses a regular expression to determine which files it should look for and serve to a specific loader. In this case any file that ends with `.css` will be served to the `style-loader` and the `css-loader`.

This enables you to `import './style.css'` into the file that depends on that styling. Now, when that module is run, a `<style>` tag with the stringified css will be inserted into the `<head>` of your html file.

Let's try it out by adding a new `style.css` file to our project and import it in our `index.js`:

__project__

``` diff
  webpack-demo
  |- package.json
  |- webpack.config.js
  |- /dist
    |- bundle.js
    |- index.html
  |- /src
+   |- style.css
    |- index.js
  |- /node_modules
```

__src/style.css__

``` css
.hello {
  color: red;
}
```

__src/index.js__

``` diff
  import _ from 'lodash';
+ import './style.css';

  function component() {
    var element = document.createElement('div');

    // Lodash, now imported by this script
    element.innerHTML = _.join(['Hello', 'webpack'], ' ');
+   element.classList.add('hello');

    return element;
  }

  document.body.appendChild(component());
```

Now run your build command:

``` bash
npm run build

...
    Asset      Size  Chunks             Chunk Names
bundle.js  76.4 KiB       0  [emitted]  main
Entrypoint main = bundle.js
...
```

Open up `index.html` in your browser again and you should see that `Hello webpack` is now styled in red. To see what webpack did, inspect the page (don't view the page source, as it won't show you the result) and look at the page's head tags. It should contain our style block that we imported in `index.js`.

Note that you can, and in most cases should, [minimize css](/plugins/mini-css-extract-plugin/#minimizing-for-production) for better load times in production. On top of that, loaders exist for pretty much any flavor of CSS you can think of -- [postcss](/loaders/postcss-loader), [sass](/loaders/sass-loader), and [less](/loaders/less-loader) to name a few.


## Loading Images

So now we're pulling in our CSS, but what about our images like backgrounds and icons? Using the [file-loader](/loaders/file-loader) we can easily incorporate those in our system as well:

``` bash
npm install --save-dev file-loader
```

__webpack.config.js__

``` diff
  const path = require('path');

  module.exports = {
    entry: './src/index.js',
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'dist')
    },
    module: {
      rules: [
        {
          test: /\.css$/,
          use: [
            'style-loader',
            'css-loader'
          ]
        },
+       {
+         test: /\.(png|svg|jpg|gif)$/,
+         use: [
+           'file-loader'
+         ]
+       }
      ]
    }
  };
```

Now, when you `import MyImage from './my-image.png'`, that image will be processed and added to your `output` directory _and_ the `MyImage` variable will contain the final url of that image after processing. When using the [css-loader](/loaders/css-loader), as shown above, a similar process will occur for `url('./my-image.png')` within your CSS. The loader will recognize this is a local file, and replace the `'./my-image.png'` path with the final path to the image in your `output` directory. The [html-loader](/loaders/html-loader) handles `<img src="./my-image.png" />` in the same manner.

Let's add an image to our project and see how this works, you can use any image you like:

__project__

``` diff
  webpack-demo
  |- package.json
  |- webpack.config.js
  |- /dist
    |- bundle.js
    |- index.html
  |- /src
+   |- icon.png
    |- style.css
    |- index.js
  |- /node_modules
```

__src/index.js__

``` diff
  import _ from 'lodash';
  import './style.css';
+ import Icon from './icon.png';

  function component() {
    var element = document.createElement('div');

    // Lodash, now imported by this script
    element.innerHTML = _.join(['Hello', 'webpack'], ' ');
    element.classList.add('hello');

+   // Add the image to our existing div.
+   var myIcon = new Image();
+   myIcon.src = Icon;
+
+   element.appendChild(myIcon);

    return element;
  }

  document.body.appendChild(component());
```

__src/style.css__

``` diff
  .hello {
    color: red;
+   background: url('./icon.png');
  }
```

Let's create a new build and open up the index.html file again:

``` bash
npm run build

...
                               Asset      Size  Chunks                    Chunk Names
da4574bb234ddc4bb47cbe1ca4b20303.png  3.01 MiB          [emitted]  [big]
                           bundle.js  76.7 KiB       0  [emitted]         main
Entrypoint main = bundle.js
...
```

If all went well, you should now see your icon as a repeating background, as well as an `img` element beside our `Hello webpack` text. If you inspect this element, you'll see that the actual filename has changed to something like `5c999da72346a995e7e2718865d019c8.png`. This means webpack found our file in the `src` folder and processed it!

T> A logical next step from here is minifying and optimizing your images. Check out the [image-webpack-loader](https://github.com/tcoopman/image-webpack-loader) and [url-loader](/loaders/url-loader) for more on how you can enhance your image loading process.


## Loading Fonts

So what about other assets like fonts? The file and url loaders will take any file you load through them and output it to your build directory. This means we can use them for any kind of file, including fonts. Let's update our `webpack.config.js` to handle font files:

__webpack.config.js__

``` diff
  const path = require('path');

  module.exports = {
    entry: './src/index.js',
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'dist')
    },
    module: {
      rules: [
        {
          test: /\.css$/,
          use: [
            'style-loader',
            'css-loader'
          ]
        },
        {
          test: /\.(png|svg|jpg|gif)$/,
          use: [
            'file-loader'
          ]
        },
+       {
+         test: /\.(woff|woff2|eot|ttf|otf)$/,
+         use: [
+           'file-loader'
+         ]
+       }
      ]
    }
  };
```

Add some font files to your project:

__project__


``` diff
  webpack-demo
  |- package.json
  |- webpack.config.js
  |- /dist
    |- bundle.js
    |- index.html
  |- /src
+   |- my-font.woff
+   |- my-font.woff2
    |- icon.png
    |- style.css
    |- index.js
  |- /node_modules
```

With the loader configured and fonts in place, you can incorporate them via an `@font-face` declaration. The local `url(...)` directive will be picked up by webpack just as it was with the image:

__src/style.css__

``` diff
+ @font-face {
+   font-family: 'MyFont';
+   src:  url('./my-font.woff2') format('woff2'),
+         url('./my-font.woff') format('woff');
+   font-weight: 600;
+   font-style: normal;
+ }

  .hello {
    color: red;
+   font-family: 'MyFont';
    background: url('./icon.png');
  }
```

Now run a new build and let's see if webpack handled our fonts:

``` bash
npm run build

...
                                 Asset      Size  Chunks                    Chunk Names
5439466351d432b73fdb518c6ae9654a.woff2  19.5 KiB          [emitted]
 387c65cc923ad19790469cfb5b7cb583.woff  23.4 KiB          [emitted]
  da4574bb234ddc4bb47cbe1ca4b20303.png  3.01 MiB          [emitted]  [big]
                             bundle.js    77 KiB       0  [emitted]         main
Entrypoint main = bundle.js
...
```

Open up `index.html` again and see if our `Hello webpack` text has changed to the new font. If all is well, you should see the changes.


## Loading Data

Another useful asset that can be loaded is data, like JSON files, CSVs, TSVs, and XML. Support for JSON is actually built-in, similar to NodeJS, meaning `import Data from './data.json'` will work by default. To import CSVs, TSVs, and XML you could use the [csv-loader](https://github.com/theplatapi/csv-loader) and [xml-loader](https://github.com/gisikw/xml-loader). Let's handle loading all three:

``` bash
npm install --save-dev csv-loader xml-loader
```

__webpack.config.js__

``` diff
  const path = require('path');

  module.exports = {
    entry: './src/index.js',
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'dist')
    },
    module: {
      rules: [
        {
          test: /\.css$/,
          use: [
            'style-loader',
            'css-loader'
          ]
        },
        {
          test: /\.(png|svg|jpg|gif)$/,
          use: [
            'file-loader'
          ]
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/,
          use: [
            'file-loader'
          ]
        },
+       {
+         test: /\.(csv|tsv)$/,
+         use: [
+           'csv-loader'
+         ]
+       },
+       {
+         test: /\.xml$/,
+         use: [
+           'xml-loader'
+         ]
+       }
      ]
    }
  };
```

Add some data files to your project:

__project__

``` diff
  webpack-demo
  |- package.json
  |- webpack.config.js
  |- /dist
    |- bundle.js
    |- index.html
  |- /src
+   |- data.xml
    |- my-font.woff
    |- my-font.woff2
    |- icon.png
    |- style.css
    |- index.js
  |- /node_modules
```

__src/data.xml__

``` xml
<?xml version="1.0" encoding="UTF-8"?>
<note>
  <to>Mary</to>
  <from>John</from>
  <heading>Reminder</heading>
  <body>Call Cindy on Tuesday</body>
</note>
```

Now you can `import` any one of those four types of data (JSON, CSV, TSV, XML) and the `Data` variable you import it to will contain parsed JSON for easy consumption:

__src/index.js__

``` diff
  import _ from 'lodash';
  import './style.css';
  import Icon from './icon.png';
+ import Data from './data.xml';

  function component() {
    var element = document.createElement('div');

    // Lodash, now imported by this script
    element.innerHTML = _.join(['Hello', 'webpack'], ' ');
    element.classList.add('hello');

    // Add the image to our existing div.
    var myIcon = new Image();
    myIcon.src = Icon;

    element.appendChild(myIcon);

+   console.log(Data);

    return element;
  }

  document.body.appendChild(component());
```

When you open `index.html` and look at your console in your developer tools, you should be able to see your imported data being logged to the console!

T> This can be especially helpful when implementing some sort of data visualization using a tool like [d3](https://github.com/d3). Instead of making an ajax request and parsing the data at runtime you can load it into your module during the build process so that the parsed data is ready to go as soon as the module hits the browser.


## Global Assets

The coolest part of everything mentioned above, is that loading assets this way allows you to group modules and assets together in a more intuitive way. Instead of relying on a global `/assets` directory that contains everything, you can group assets with the code that uses them. For example, a structure like this can be very useful:

``` diff
- |- /assets
+ |– /components
+ |  |– /my-component
+ |  |  |– index.jsx
+ |  |  |– index.css
+ |  |  |– icon.svg
+ |  |  |– img.png
```

This setup makes your code a lot more portable as everything that is closely coupled now lives together. Let's say you want to use `/my-component` in another project, simply copy or move it into the `/components` directory over there. As long as you've installed any _external dependencies_ and your _configuration has the same loaders_ defined, you should be good to go.

However, let's say you're locked into your old ways or you have some assets that are shared between multiple components (views, templates, modules, etc.). It's still possible to store these assets in a base directory and even use [aliasing](/configuration/resolve#resolve-alias) to make them easier to `import`.


## Wrapping up

For the next guides we won't be using all the different assets we've used in this guide, so let's do some cleanup so we're prepared for the next piece of the guides [Output Management](https://webpack.js.org/guides/output-management/):

__project__

``` diff
  webpack-demo
  |- package.json
  |- webpack.config.js
  |- /dist
    |- bundle.js
    |- index.html
  |- /src
-   |- data.xml
-   |- my-font.woff
-   |- my-font.woff2
-   |- icon.png
-   |- style.css
    |- index.js
  |- /node_modules
```

__webpack.config.js__

``` diff
  const path = require('path');

  module.exports = {
    entry: './src/index.js',
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'dist')
    },
-   module: {
-     rules: [
-       {
-         test: /\.css$/,
-         use: [
-           'style-loader',
-           'css-loader'
-         ]
-       },
-       {
-         test: /\.(png|svg|jpg|gif)$/,
-         use: [
-           'file-loader'
-         ]
-       },
-       {
-         test: /\.(woff|woff2|eot|ttf|otf)$/,
-         use: [
-           'file-loader'
-         ]
-       },
-       {
-         test: /\.(csv|tsv)$/,
-         use: [
-           'csv-loader'
-         ]
-       },
-       {
-         test: /\.xml$/,
-         use: [
-           'xml-loader'
-         ]
-       }
-     ]
-   }
  };
```

__src/index.js__

``` diff
  import _ from 'lodash';
- import './style.css';
- import Icon from './icon.png';
- import Data from './data.xml';
-
  function component() {
    var element = document.createElement('div');
-
-   // Lodash, now imported by this script
    element.innerHTML = _.join(['Hello', 'webpack'], ' ');
-   element.classList.add('hello');
-
-   // Add the image to our existing div.
-   var myIcon = new Image();
-   myIcon.src = Icon;
-
-   element.appendChild(myIcon);
-
-   console.log(Data);

    return element;
  }

  document.body.appendChild(component());
```


## Next guide

Let's move on to [Output Management](https://webpack.js.org/guides/output-management/)


## Further Reading

- [Loading Fonts](https://survivejs.com/webpack/loading/fonts/) on SurviveJS


# Output Management

T> This guide extends on code examples found in the [`Asset Management`](/guides/asset-management) guide.

So far we've manually included all our assets in our `index.html` file, but as your application grows and once you start [using hashes in filenames](/guides/caching) and outputting [multiple bundles](/guides/code-splitting), it will be difficult to keep managing your `index.html` file manually. However, a few plugins exist that will make this process much easier to manage.

## Preparation

First, let's adjust our project a little bit:

__project__

``` diff
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

__src/print.js__

``` js
export default function printMe() {
  console.log('I get called from print.js!');
}
```

And use that function in our `src/index.js` file:

__src/index.js__

``` diff
  import _ from 'lodash';
+ import printMe from './print.js';

  function component() {
    var element = document.createElement('div');
+   var btn = document.createElement('button');

    element.innerHTML = _.join(['Hello', 'webpack'], ' ');

+   btn.innerHTML = 'Click me and check the console!';
+   btn.onclick = printMe;
+
+   element.appendChild(btn);

    return element;
  }

  document.body.appendChild(component());
```

Let's also update our `dist/index.html` file, in preparation for webpack to split out entries:

__dist/index.html__

``` diff
  <!doctype html>
  <html>
    <head>
-     <title>Asset Management</title>
+     <title>Output Management</title>
+     <script src="./print.bundle.js"></script>
    </head>
    <body>
-     <script src="./bundle.js"></script>
+     <script src="./app.bundle.js"></script>
    </body>
  </html>
```

Now adjust the config. We'll be adding our `src/print.js` as a new entry point (`print`) and we'll change the output as well, so that it will dynamically generate bundle names, based on the entry point names:

__webpack.config.js__

``` diff
  const path = require('path');

  module.exports = {
-   entry: './src/index.js',
+   entry: {
+     app: './src/index.js',
+     print: './src/print.js'
+   },
    output: {
-     filename: 'bundle.js',
+     filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist')
    }
  };
```

Let's run `npm run build` and see what this generates:

``` bash
...
          Asset     Size  Chunks                    Chunk Names
  app.bundle.js   545 kB    0, 1  [emitted]  [big]  app
print.bundle.js  2.74 kB       1  [emitted]         print
...
```

We can see that webpack generates our `print.bundle.js` and `app.bundle.js` files, which we also specified in our `index.html` file. if you open `index.html` in your browser, you can see what happens when you click the button.

But what would happen if we changed the name of one of our entry points, or even added a new one? The generated bundles would be renamed on a build, but our `index.html` file would still reference the old names. Let's fix that with the [`HtmlWebpackPlugin`](/plugins/html-webpack-plugin).


## Setting up HtmlWebpackPlugin

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
      print: './src/print.js'
    },
+   plugins: [
+     new HtmlWebpackPlugin({
+       title: 'Output Management'
+     })
+   ],
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist')
    }
  };
```

Before we do a build, you should know that the `HtmlWebpackPlugin` by default will generate its own `index.html` file, even though we already have one in the `dist/` folder. This means that it will replace our `index.html` file with a newly generated one. Let's see what happens when we do an `npm run build`:

``` bash
...
           Asset       Size  Chunks                    Chunk Names
 print.bundle.js     544 kB       0  [emitted]  [big]  print
   app.bundle.js    2.81 kB       1  [emitted]         app
      index.html  249 bytes          [emitted]
...
```

If you open `index.html` in your code editor, you'll see that the `HtmlWebpackPlugin` has created an entirely new file for you and that all the bundles are automatically added.

If you want to learn more about all the features and options that the `HtmlWebpackPlugin` provides, then you should read up on it on the [`HtmlWebpackPlugin`](https://github.com/jantimon/html-webpack-plugin) repo.

You can also take a look at [`html-webpack-template`](https://github.com/jaketrent/html-webpack-template) which provides a couple of extra features in addition to the default template.


## Cleaning up the `/dist` folder

As you might have noticed over the past guides and code example, our `/dist` folder has become quite cluttered. Webpack will generate the files and put them in the `/dist` folder for you, but it doesn't keep track of which files are actually in use by your project.

In general it's good practice to clean the `/dist` folder before each build, so that only used files will be generated. Let's take care of that.

A popular plugin to manage this is the [`clean-webpack-plugin`](https://www.npmjs.com/package/clean-webpack-plugin) so let's install and configure it.

``` bash
npm install --save-dev clean-webpack-plugin
```

__webpack.config.js__

``` diff
  const path = require('path');
  const HtmlWebpackPlugin = require('html-webpack-plugin');
+ const CleanWebpackPlugin = require('clean-webpack-plugin');

  module.exports = {
    entry: {
      app: './src/index.js',
      print: './src/print.js'
    },
    plugins: [
+     new CleanWebpackPlugin(['dist']),
      new HtmlWebpackPlugin({
        title: 'Output Management'
      })
    ],
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist')
    }
  };
```

Now run an `npm run build` and inspect the `/dist` folder. If everything went well you should now only see the files generated from the build and no more old files!


## The Manifest

You might be wondering how webpack and its plugins seem to "know" what files are being generated. The answer is in the manifest that webpack keeps to track how all the modules map to the output bundles. If you're interested in managing webpack's [`output`](/configuration/output) in other ways, the manifest would be a good place to start.

The manifest data can be extracted into a json file for easy consumption using the [`WebpackManifestPlugin`](https://github.com/danethurber/webpack-manifest-plugin).

We won't go through a full example of how to use this plugin within your projects, but you can read up on [the concept page](/concepts/manifest) and the [caching guide](/guides/caching) to find out how this ties into long term caching.


## Conclusion

Now that you've learned about dynamically adding bundles to your HTML, let's dive into the [development guide](/guides/development). Or, if you want to dig into more advanced topics, we would recommend heading over to the [code splitting guide](/guides/code-splitting).


# Development

T> This guide extends on code examples found in the [Output Management](/guides/output-management) guide.

If you've been following the guides, you should have a solid understanding of some of the webpack basics. Before we continue, let's look into setting up a development environment to make our lives a little easier.

W> The tools in this guide are __only meant for development__, please __avoid__ using them in production!

Before proceeding lets first set [`mode` to `'development'`](/concepts/mode/#mode-development).

__webpack.config.js__

``` diff
  const path = require('path');
  const HtmlWebpackPlugin = require('html-webpack-plugin');
  const CleanWebpackPlugin = require('clean-webpack-plugin');

  module.exports = {
+   mode: 'development',
    entry: {
      app: './src/index.js',
      print: './src/print.js'
    },
    plugins: [
      new CleanWebpackPlugin(['dist']),
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

## Using source maps

When webpack bundles your source code, it can become difficult to track down errors and warnings to their original location. For example, if you bundle three source files (`a.js`, `b.js`, and `c.js`) into one bundle (`bundle.js`) and one of the source files contains an error, the stack trace will simply point to `bundle.js`. This isn't always helpful as you probably want to know exactly which source file the error came from.

In order to make it easier to track down errors and warnings, JavaScript offers [source maps](http://blog.teamtreehouse.com/introduction-source-maps), which maps your compiled code back to your original source code. If an error originates from `b.js`, the source map will tell you exactly that.

There are a lot of [different options](/configuration/devtool) available when it comes to source maps. Be sure to check them out so you can configure them to your needs.

For this guide, let's use the `inline-source-map` option, which is good for illustrative purposes (though not for production):

__webpack.config.js__

``` diff
  const path = require('path');
  const HtmlWebpackPlugin = require('html-webpack-plugin');
  const CleanWebpackPlugin = require('clean-webpack-plugin');

  module.exports = {
    mode: 'development',
    entry: {
      app: './src/index.js',
      print: './src/print.js'
    },
+   devtool: 'inline-source-map',
    plugins: [
      new CleanWebpackPlugin(['dist']),
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
...
          Asset       Size  Chunks                    Chunk Names
  app.bundle.js    1.44 MB    0, 1  [emitted]  [big]  app
print.bundle.js    6.43 kB       1  [emitted]         print
     index.html  248 bytes          [emitted]
...
```

Now open the resulting `index.html` file in your browser. Click the button and look in your console where the error is displayed. The error should say something like this:

 ``` bash
 Uncaught ReferenceError: cosnole is not defined
    at HTMLButtonElement.printMe (print.js:2)
 ```

We can see that the error also contains a reference to the file (`print.js`) and line number (2) where the error occurred. This is great because now we know exactly where to look in order to fix the issue.


## Choosing a Development Tool

W> Some text editors have a "safe write" function that might interfere with some of the following tools. Read [Adjusting Your text Editor](#adjusting-your-text-editor) for a solution to these issues.

It quickly becomes a hassle to manually run `npm run build` every time you want to compile your code.

There are a couple of different options available in webpack that help you automatically compile your code whenever it changes:

 1. webpack's Watch Mode
 2. webpack-dev-server
 3. webpack-dev-middleware

In most cases, you probably would want to use `webpack-dev-server`, but let's explore all of the above options.


### Using Watch Mode

You can instruct webpack to "watch" all files within your dependency graph for changes. If one of these files is updated, the code will be recompiled so you don't have to run the full build manually.

Let's add an npm script that will start webpack's Watch Mode:

__package.json__

``` diff
  {
    "name": "development",
    "version": "1.0.0",
    "description": "",
    "main": "webpack.config.js",
    "scripts": {
      "test": "echo \"Error: no test specified\" && exit 1",
+     "watch": "webpack --watch",
      "build": "webpack"
    },
    "keywords": [],
    "author": "",
    "license": "ISC",
    "devDependencies": {
      "clean-webpack-plugin": "^0.1.16",
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

Now run `npm run watch` from the command line and see how webpack compiles your code.
You can see that it doesn't exit the command line because the script is currently watching your files.

Now, while webpack is watching your files, let's remove the error we introduced earlier:

__src/print.js__

``` diff
  export default function printMe() {
-   cosnole.log('I get called from print.js!');
+   console.log('I get called from print.js!');
  }
```

Now save your file and check the terminal window. You should see that webpack automatically recompiles the changed module!

The only downside is that you have to refresh your browser in order to see the changes. It would be much nicer if that would happen automatically as well, so let's try `webpack-dev-server` which will do exactly that.


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
  const CleanWebpackPlugin = require('clean-webpack-plugin');

  module.exports = {
    mode: 'development',
    entry: {
      app: './src/index.js',
      print: './src/print.js'
    },
    devtool: 'inline-source-map',
+   devServer: {
+     contentBase: './dist'
+   },
    plugins: [
      new CleanWebpackPlugin(['dist']),
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

This tells `webpack-dev-server` to serve the files from the `dist` directory on `localhost:8080`.

W> webpack-dev-server doesn't write any output files after compiling. Instead, it keeps bundle files in memory and serves them as if they were real files mounted at the server's root path. If your page expects to find the bundle files in different path, you can change this with the [`publicPath`](/configuration/dev-server/#devserver-publicpath-) option in the dev server's configuration.

Let's add a script to easily run the dev server as well:

__package.json__

``` diff
  {
    "name": "development",
    "version": "1.0.0",
    "description": "",
    "main": "webpack.config.js",
    "scripts": {
      "test": "echo \"Error: no test specified\" && exit 1",
      "watch": "webpack --watch",
+     "start": "webpack-dev-server --open",
      "build": "webpack"
    },
    "keywords": [],
    "author": "",
    "license": "ISC",
    "devDependencies": {
      "clean-webpack-plugin": "^0.1.16",
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

Now we can run `npm start` from the command line and we will see our browser automatically loading up our page. If you now change any of the source files and save them, the web server will automatically reload after the code has been compiled. Give it a try!

The `webpack-dev-server` comes with many configurable options. Head over to the [documentation](/configuration/dev-server) to learn more.

T> Now that your server is working, you might want to give [Hot Module Replacement](/guides/hot-module-replacement) a try!


### Using webpack-dev-middleware

`webpack-dev-middleware` is a wrapper that will emit files processed by webpack to a server. This is used in `webpack-dev-server` internally, however it's available as a separate package to allow more custom setups if desired. We'll take a look at an example that combines webpack-dev-middleware with an express server.

Let's install `express` and `webpack-dev-middleware` so we can get started:

``` bash
npm install --save-dev express webpack-dev-middleware
```

Now we need to make some adjustments to our webpack configuration file in order to make sure the middleware will function correctly:

__webpack.config.js__

``` diff
  const path = require('path');
  const HtmlWebpackPlugin = require('html-webpack-plugin');
  const CleanWebpackPlugin = require('clean-webpack-plugin');

  module.exports = {
    mode: 'development',
    entry: {
      app: './src/index.js',
      print: './src/print.js'
    },
    devtool: 'inline-source-map',
    devServer: {
      contentBase: './dist'
    },
    plugins: [
      new CleanWebpackPlugin(['dist']),
      new HtmlWebpackPlugin({
        title: 'Output Management'
      })
    ],
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
+     publicPath: '/'
    }
  };
```

The `publicPath` will be used within our server script as well in order to make sure files are served correctly on `http://localhost:3000`. We'll specify the port number later. The next step is setting up our custom `express` server:

__project__

``` diff
  webpack-demo
  |- package.json
  |- webpack.config.js
+ |- server.js
  |- /dist
  |- /src
    |- index.js
    |- print.js
  |- /node_modules
```

__server.js__

```javascript
const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');

const app = express();
const config = require('./webpack.config.js');
const compiler = webpack(config);

// Tell express to use the webpack-dev-middleware and use the webpack.config.js
// configuration file as a base.
app.use(webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath
}));

// Serve the files on port 3000.
app.listen(3000, function () {
  console.log('Example app listening on port 3000!\n');
});
```

Now add an npm script to make it a little easier to run the server:

__package.json__

``` diff
  {
    "name": "development",
    "version": "1.0.0",
    "description": "",
    "main": "webpack.config.js",
    "scripts": {
      "test": "echo \"Error: no test specified\" && exit 1",
      "watch": "webpack --watch",
      "start": "webpack-dev-server --open",
+     "server": "node server.js",
      "build": "webpack"
    },
    "keywords": [],
    "author": "",
    "license": "ISC",
    "devDependencies": {
      "clean-webpack-plugin": "^0.1.16",
      "css-loader": "^0.28.4",
      "csv-loader": "^2.1.1",
      "express": "^4.15.3",
      "file-loader": "^0.11.2",
      "html-webpack-plugin": "^2.29.0",
      "style-loader": "^0.18.2",
      "webpack": "^3.0.0",
      "webpack-dev-middleware": "^1.12.0",
      "xml-loader": "^1.2.1"
    }
  }
```

Now in your terminal run `npm run server`, it should give you an output similar to this:

``` bash
Example app listening on port 3000!
...
          Asset       Size  Chunks                    Chunk Names
  app.bundle.js    1.44 MB    0, 1  [emitted]  [big]  app
print.bundle.js    6.57 kB       1  [emitted]         print
     index.html  306 bytes          [emitted]
...
webpack: Compiled successfully.
```

Now fire up your browser and go to `http://localhost:3000`. You should see your webpack app running and functioning!

T> If you would like to know more about how Hot Module Replacement works, we recommend you read the [Hot Module Replacement](/guides/hot-module-replacement/) guide.


## Adjusting Your Text Editor

When using automatic compilation of your code, you could run into issues when saving your files. Some editors have a "safe write" feature that can potentially interfere with recompilation.

To disable this feature in some common editors, see the list below:

- __Sublime Text 3__: Add `atomic_save: 'false'` to your user preferences.
- __JetBrains IDEs (e.g. WebStorm)__: Uncheck "Use safe write" in `Preferences > Appearance & Behavior > System Settings`.
- __Vim__: Add `:set backupcopy=yes` to your settings.


## Conclusion

Now that you've learned how to automatically compile your code and run a simple development server, you can check out the next guide, which will cover [Hot Module Replacement](/guides/hot-module-replacement).


# Hot Module Replacement

T> This guide extends on code examples found in the [Development](/guides/development) guide.

Hot Module Replacement (or HMR) is one of the most useful features offered by webpack. It allows all kinds of modules to be updated at runtime without the need for a full refresh. This page focuses on __implementation__ while the [concepts page](/concepts/hot-module-replacement) gives more details on how it works and why it's useful.

W> __HMR__ is not intended for use in production, meaning it should only be used in development. See the [building for production guide](/guides/production) for more information.


## Enabling HMR

This feature is great for productivity. All we need to do is update our [webpack-dev-server](https://github.com/webpack/webpack-dev-server) configuration, and use webpack's built in HMR plugin. We'll also remove the entry point for `print.js` as it will now be consumed by the `index.js` module.

T> If you took the route of using `webpack-dev-middleware` instead of `webpack-dev-server`, please use the [`webpack-hot-middleware`](https://github.com/webpack-contrib/webpack-hot-middleware) package to enable HMR on your custom server or application.

__webpack.config.js__

``` diff
  const path = require('path');
  const HtmlWebpackPlugin = require('html-webpack-plugin');
  const CleanWebpackPlugin = require('clean-webpack-plugin');
+ const webpack = require('webpack');

  module.exports = {
    entry: {
-      app: './src/index.js',
-      print: './src/print.js'
+      app: './src/index.js'
    },
    devtool: 'inline-source-map',
    devServer: {
      contentBase: './dist',
+     hot: true
    },
    plugins: [
      new CleanWebpackPlugin(['dist']),
      new HtmlWebpackPlugin({
        title: 'Hot Module Replacement'
      }),
+     new webpack.HotModuleReplacementPlugin()
    ],
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist')
    }
  };
```

T> You can use the CLI to modify the [webpack-dev-server](https://github.com/webpack/webpack-dev-server) configuration with the following command: `webpack-dev-server --hotOnly`.

Now let's update the `index.js` file so that when a change inside `print.js` is detected we tell webpack to accept the updated module.

__index.js__

``` diff
  import _ from 'lodash';
  import printMe from './print.js';

  function component() {
    var element = document.createElement('div');
    var btn = document.createElement('button');

    element.innerHTML = _.join(['Hello', 'webpack'], ' ');

    btn.innerHTML = 'Click me and check the console!';
    btn.onclick = printMe;

    element.appendChild(btn);

    return element;
  }

  document.body.appendChild(component());
+
+ if (module.hot) {
+   module.hot.accept('./print.js', function() {
+     console.log('Accepting the updated printMe module!');
+     printMe();
+   })
+ }
```

Start changing the `console.log` statement in `print.js`, and you should see the following output in the browser console.

__print.js__

``` diff
  export default function printMe() {
-   console.log('I get called from print.js!');
+   console.log('Updating print.js...')
  }
```

__console__

``` diff
[HMR] Waiting for update signal from WDS...
main.js:4395 [WDS] Hot Module Replacement enabled.
+ 2main.js:4395 [WDS] App updated. Recompiling...
+ main.js:4395 [WDS] App hot update...
+ main.js:4330 [HMR] Checking for updates on the server...
+ main.js:10024 Accepting the updated printMe module!
+ 0.4b8ee77….hot-update.js:10 Updating print.js...
+ main.js:4330 [HMR] Updated modules:
+ main.js:4330 [HMR]  - 20
```


## Via the Node.js API

When using Webpack Dev Server with the Node.js API, don't put the dev server options on the webpack config object. Instead, pass them as a second parameter upon creation. For example:

`new WebpackDevServer(compiler, options)`

To enable HMR, you also need to modify your webpack configuration object to include the HMR entry points. The `webpack-dev-server` package includes a method called `addDevServerEntrypoints` which you can use to do this. Here's a small example of how that might look:

__dev-server.js__

``` javascript
const webpackDevServer = require('webpack-dev-server');
const webpack = require('webpack');

const config = require('./webpack.config.js');
const options = {
  contentBase: './dist',
  hot: true,
  host: 'localhost'
};

webpackDevServer.addDevServerEntrypoints(config, options);
const compiler = webpack(config);
const server = new webpackDevServer(compiler, options);

server.listen(5000, 'localhost', () => {
  console.log('dev server listening on port 5000');
});
```

T> If you're [using `webpack-dev-middleware`](/guides/development#using-webpack-dev-middleware), check out the [`webpack-hot-middleware`](https://github.com/webpack-contrib/webpack-hot-middleware) package to enable HMR on your custom dev server.


## Gotchas

Hot Module Replacement can be tricky. To show this, let's go back to our working example. If you go ahead and click the button on the example page, you will realize the console is printing the old `printMe` function.

This is happening because the button's `onclick` event handler is still bound to the original `printMe` function.

To make this work with HMR we need to update that binding to the new `printMe` function using `module.hot.accept`:

__index.js__

``` diff
  import _ from 'lodash';
  import printMe from './print.js';

  function component() {
    var element = document.createElement('div');
    var btn = document.createElement('button');

    element.innerHTML = _.join(['Hello', 'webpack'], ' ');

    btn.innerHTML = 'Click me and check the console!';
    btn.onclick = printMe;  // onclick event is bind to the original printMe function

    element.appendChild(btn);

    return element;
  }

- document.body.appendChild(component());
+ let element = component(); // Store the element to re-render on print.js changes
+ document.body.appendChild(element);

  if (module.hot) {
    module.hot.accept('./print.js', function() {
      console.log('Accepting the updated printMe module!');
-     printMe();
+     document.body.removeChild(element);
+     element = component(); // Re-render the "component" to update the click handler
+     document.body.appendChild(element);
    })
  }
```

This is just one example, but there are many others that can easily trip people up. Luckily, there are a lot of loaders out there (some of which are mentioned below) that will make hot module replacement much easier.


## HMR with Stylesheets

Hot Module Replacement with CSS is actually fairly straightforward with the help of the `style-loader`. This loader uses `module.hot.accept` behind the scenes to patch `<style>` tags when CSS dependencies are updated.

First let's install both loaders with the following command:

```bash
npm install --save-dev style-loader css-loader
```

Now let's update the configuration file to make use of the loader.

__webpack.config.js__

```diff
  const path = require('path');
  const HtmlWebpackPlugin = require('html-webpack-plugin');
  const CleanWebpackPlugin = require('clean-webpack-plugin');
  const webpack = require('webpack');

  module.exports = {
    entry: {
      app: './src/index.js'
    },
    devtool: 'inline-source-map',
    devServer: {
      contentBase: './dist',
      hot: true
    },
+   module: {
+     rules: [
+       {
+         test: /\.css$/,
+         use: ['style-loader', 'css-loader']
+       }
+     ]
+   },
    plugins: [
      new CleanWebpackPlugin(['dist']),
      new HtmlWebpackPlugin({
        title: 'Hot Module Replacement'
      }),
      new webpack.HotModuleReplacementPlugin()
    ],
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist')
    }
  };
```

Hot loading stylesheets is as easy as importing them into a module:

__project__

``` diff
  webpack-demo
  | - package.json
  | - webpack.config.js
  | - /dist
    | - bundle.js
  | - /src
    | - index.js
    | - print.js
+   | - styles.css
```

__styles.css__

``` css
body {
  background: blue;
}
```

__index.js__

``` diff
  import _ from 'lodash';
  import printMe from './print.js';
+ import './styles.css';

  function component() {
    var element = document.createElement('div');
    var btn = document.createElement('button');

    element.innerHTML = _.join(['Hello', 'webpack'], ' ');

    btn.innerHTML = 'Click me and check the console!';
    btn.onclick = printMe;  // onclick event is bind to the original printMe function

    element.appendChild(btn);

    return element;
  }

  let element = component();
  document.body.appendChild(element);

  if (module.hot) {
    module.hot.accept('./print.js', function() {
      console.log('Accepting the updated printMe module!');
      document.body.removeChild(element);
      element = component(); // Re-render the "component" to update the click handler
      document.body.appendChild(element);
    })
  }

```

Change the style on `body` to `background: red;` and you should immediately see the page's background color change without a full refresh.

__styles.css__

``` diff
  body {
-   background: blue;
+   background: red;
  }
```


## Other Code and Frameworks

There are many other loaders and examples out in the community to make HMR interact smoothly with a variety of frameworks and libraries...

- [React Hot Loader](https://github.com/gaearon/react-hot-loader): Tweak react components in real time.
- [Vue Loader](https://github.com/vuejs/vue-loader): This loader supports HMR for vue components out of the box.
- [Elm Hot Loader](https://github.com/fluxxu/elm-hot-loader): Supports HMR for the Elm programming language.
- [Angular HMR](https://github.com/gdi2290/angular-hmr): No loader necessary! A simple change to your main NgModule file is all that's required to have full control over the HMR APIs.

T> If you know of any other loaders or plugins that help with or enhance Hot Module Replacement please submit a pull request to add to this list!


# Tree Shaking

_Tree shaking_ is a term commonly used in the JavaScript context for dead-code elimination. It relies on the [static structure](http://exploringjs.com/es6/ch_modules.html#static-module-structure) of ES2015 module syntax, i.e. [`import`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import) and [`export`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/export). The name and concept have been popularized by the ES2015 module bundler [rollup](https://github.com/rollup/rollup).

The webpack 2 release came with built-in support for ES2015 modules (alias _harmony modules_) as well as unused module export detection. The new webpack 4 release expands on this capability with a way to provide hints to the compiler via the `"sideEffects"` `package.json` property to denote which files in your project are "pure" and therefore safe to prune if unused.

T> The remainder of this guide will stem from [Getting Started](/guides/getting-started). If you haven't read through that guide already, please do so now.


## Add a Utility

Let's add a new utility file to our project, `src/math.js`, that exports two functions:

__project__

``` diff
webpack-demo
|- package.json
|- webpack.config.js
|- /dist
  |- bundle.js
  |- index.html
|- /src
  |- index.js
+ |- math.js
|- /node_modules
```

__src/math.js__

```javascript
export function square(x) {
  return x * x;
}

export function cube(x) {
  return x * x * x;
}
```

Set the `mode` configuration option to [development](/concepts/mode/#mode-development) to make sure that the bundle is not minified:

__webpack.config.js__

``` diff
const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
- }
+ },
+ mode: 'development',
+ optimization: {
+   usedExports: true
+ }
};
```

With that in place, let's update our entry script to utilize one of these new methods and remove `lodash` for simplicity:

__src/index.js__

``` diff
- import _ from 'lodash';
+ import { cube } from './math.js';

  function component() {
-   var element = document.createElement('div');
+   var element = document.createElement('pre');

-   // Lodash, now imported by this script
-   element.innerHTML = _.join(['Hello', 'webpack'], ' ');
+   element.innerHTML = [
+     'Hello webpack!',
+     '5 cubed is equal to ' + cube(5)
+   ].join('\n\n');

    return element;
  }

  document.body.appendChild(component());
```

Note that we __did not `import` the `square` method__ from the `src/math.js` module. That function is what's known as "dead code", meaning an unused `export` that should be dropped. Now let's run our npm script, `npm run build`, and inspect the output bundle:

__dist/bundle.js (around lines 90 - 100)__

```js
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {
  'use strict';
  /* unused harmony export square */
  /* harmony export (immutable) */ __webpack_exports__['a'] = cube;
  function square(x) {
    return x * x;
  }

  function cube(x) {
    return x * x * x;
  }
});
```

Note the `unused harmony export square` comment above. If you look at the code below it, you'll notice that `square` is not being imported, however, it is still included in the bundle. We'll fix that in the next section.


## Mark the file as side-effect-free

In a 100% ESM module world, identifying side effects is straightforward. However, we aren't there just yet, so in the mean time it's necessary to provide hints to webpack's compiler on the "pureness" of your code.

The way this is accomplished is the `"sideEffects"` package.json property.

```json
{
  "name": "your-project",
  "sideEffects": false
}
```

All the code noted above does not contain side effects, so we can simply mark the property as `false` to inform webpack that it can safely prune unused exports.

T> A "side effect" is defined as code that performs a special behavior when imported, other than exposing one or more exports. An example of this are polyfills, which affect the global scope and usually do not provide an export.

If your code did have some side effects though, an array can be provided instead:

```json
{
  "name": "your-project",
  "sideEffects": [
    "./src/some-side-effectful-file.js"
  ]
}
```

The array accepts relative, absolute, and glob patterns to the relevant files. It uses [micromatch](https://github.com/micromatch/micromatch#matching-features) under the hood.

T> Note that any imported file is subject to tree shaking. This means if you use something like `css-loader` in your project and import a CSS file, it needs to be added to the side effect list so it will not be unintentionally dropped in production mode:

```json
{
  "name": "your-project",
  "sideEffects": [
    "./src/some-side-effectful-file.js",
    "*.css"
  ]
}
```

Finally, `"sideEffects"` can also be set from the [`module.rules` configuration option](/configuration/module/#module-rules).

## Minify the Output

So we've cued up our "dead code" to be dropped by using the `import` and `export` syntax, but we still need to drop it from the bundle. To do that set the `mode` configuration option to [`production`](/concepts/mode/#mode-production) configuration option.

__webpack.config.js__

``` diff
const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
- mode: 'development',
- optimization: {
-   usedExports: true
- }
+ mode: 'production'
};
```

T> Note that the `--optimize-minimize` flag can be used to enable `TerserPlugin` as well.

With that squared away, we can run another `npm run build` and see if anything has changed.

Notice anything different about `dist/bundle.js`? Clearly the whole bundle is now minified and mangled, but, if you look carefully, you won't see the `square` function included but will see a mangled version of the `cube` function (`function r(e){return e*e*e}n.a=r`). With minification and tree shaking our bundle is now a few bytes smaller! While that may not seem like much in this contrived example, tree shaking can yield a significant decrease in bundle size when working on larger applications with complex dependency trees.

T> [ModuleConcatenationPlugin](/plugins/module-concatenation-plugin) is needed for the tree shaking to work. It is added by `mode: "production"`. If you are not using it, remember to add the [ModuleConcatenationPlugin](/plugins/module-concatenation-plugin) manually.

## Conclusion

So, what we've learned is that in order to take advantage of _tree shaking_, you must...

- Use ES2015 module syntax (i.e. `import` and `export`).
- Ensure no compilers transform your ES2015 module syntax into CommonJS modules (this is the default behavior of popular Babel preset @babel/preset-env - see [documentation](https://babeljs.io/docs/en/babel-preset-env#modules) for more details).
- Add a `"sideEffects"` property to your project's `package.json` file.
- Use [`production`](/concepts/mode/#mode-production) `mode` configuration option to enable [various optimizations](/concepts/mode/#usage) including minification and tree shaking.

You can imagine your application as a tree. The source code and libraries you actually use represent the green, living leaves of the tree. Dead code represents the brown, dead leaves of the tree that are consumed by autumn. In order to get rid of the dead leaves, you have to shake the tree, causing them to fall.

If you are interested in more ways to optimize your output, please jump to the next guide for details on building for [production](/guides/production).


# Production

In this guide we'll dive into some of the best practices and utilities for building a production site or application.

T> This walkthrough stems from [Tree Shaking](/guides/tree-shaking) and [Development](/guides/development). Please ensure you are familiar with the concepts/setup introduced in those guides before continuing on.


## Setup

The goals of _development_ and _production_ builds differ greatly. In _development_, we want strong source mapping and a localhost server with live reloading or hot module replacement. In _production_, our goals shift to a focus on minified bundles, lighter weight source maps, and optimized assets to improve load time. With this logical separation at hand, we typically recommend writing __separate webpack configurations__ for each environment.

While we will separate the _production_ and _development_ specific bits out, note that we'll still maintain a "common" configuration to keep things DRY. In order to merge these configurations together, we'll use a utility called [`webpack-merge`](https://github.com/survivejs/webpack-merge). With the "common" configuration in place, we won't have to duplicate code within the environment-specific configurations.

Let's start by installing `webpack-merge` and splitting out the bits we've already worked on in previous guides:

``` bash
npm install --save-dev webpack-merge
```

__project__

``` diff
  webpack-demo
  |- package.json
- |- webpack.config.js
+ |- webpack.common.js
+ |- webpack.dev.js
+ |- webpack.prod.js
  |- /dist
  |- /src
    |- index.js
    |- math.js
  |- /node_modules
```

__webpack.common.js__

``` diff
+ const path = require('path');
+ const CleanWebpackPlugin = require('clean-webpack-plugin');
+ const HtmlWebpackPlugin = require('html-webpack-plugin');
+
+ module.exports = {
+   entry: {
+     app: './src/index.js'
+   },
+   plugins: [
+     new CleanWebpackPlugin(['dist']),
+     new HtmlWebpackPlugin({
+       title: 'Production'
+     })
+   ],
+   output: {
+     filename: '[name].bundle.js',
+     path: path.resolve(__dirname, 'dist')
+   }
+ };
```

__webpack.dev.js__

``` diff
+ const merge = require('webpack-merge');
+ const common = require('./webpack.common.js');
+
+ module.exports = merge(common, {
+   mode: 'development',
+   devtool: 'inline-source-map',
+   devServer: {
+     contentBase: './dist'
+   }
+ });
```

__webpack.prod.js__

``` diff
+ const merge = require('webpack-merge');
+ const common = require('./webpack.common.js');
+
+ module.exports = merge(common, {
+   mode: 'production',
+ });
```

In `webpack.common.js`, we now have setup our `entry` and `output` configuration and we've included any plugins that are required for both environments. In `webpack.dev.js`, we've set ``mode`` to ``development``. Also, we've added the recommended `devtool` for that environment (strong source mapping), as well as our simple `devServer` configuration. Finally, in `webpack.prod.js`,``mode`` is set to ``production`` which loads `TerserPlugin` which was first introduced by the [tree shaking](/guides/tree-shaking) guide.

Note the use of `merge()` in the environment-specific configurations to easily include our common configuration in `dev` and `prod`. The `webpack-merge` tool offers a variety of advanced features for merging but for our use case we won't need any of that.


## NPM Scripts

Now let's repoint our `scripts` to the new configurations. We'll use the _development_ one for our `webpack-dev-server`, `npm start`, script and the _production_ one for our `npm run build` script:

__package.json__

``` diff
  {
    "name": "development",
    "version": "1.0.0",
    "description": "",
    "main": "src/index.js",
    "scripts": {
-     "start": "webpack-dev-server --open",
+     "start": "webpack-dev-server --open --config webpack.dev.js",
-     "build": "webpack"
+     "build": "webpack --config webpack.prod.js"
    },
    "keywords": [],
    "author": "",
    "license": "ISC",
    "devDependencies": {
      "clean-webpack-plugin": "^0.1.17",
      "css-loader": "^0.28.4",
      "csv-loader": "^2.1.1",
      "express": "^4.15.3",
      "file-loader": "^0.11.2",
      "html-webpack-plugin": "^2.29.0",
      "style-loader": "^0.18.2",
      "webpack": "^3.0.0",
      "webpack-dev-middleware": "^1.12.0",
      "webpack-dev-server": "^2.9.1",
      "webpack-merge": "^4.1.0",
      "xml-loader": "^1.2.1"
    }
  }
```

Feel free to run those scripts and see how the output changes as we continue adding to our _production_ configuration.


## Specify the Mode

Many libraries will key off the `process.env.NODE_ENV` variable to determine what should be included in the library. For example, when not in _production_ some libraries may add additional logging and testing to make debugging easier. However, with `process.env.NODE_ENV === 'production'` they might drop or add significant portions of code to optimize how things run for your actual users. Since webpack v4, specifying [`mode`](/concepts/mode/) automatically configures [`DefinePlugin`](/plugins/define-plugin) for you:

__webpack.prod.js__

``` diff
  const merge = require('webpack-merge');
  const common = require('./webpack.common.js');

  module.exports = merge(common, {
    mode: 'production',
  });
```

T> Technically, `NODE_ENV` is a system environment variable that Node.js exposes into running scripts. It is used by convention to determine dev-vs-prod behavior by server tools, build scripts, and client-side libraries. Contrary to expectations, `process.env.NODE_ENV` is not set to `"production"` __within__ the build script `webpack.config.js`, see [#2537](https://github.com/webpack/webpack/issues/2537). Thus, conditionals like `process.env.NODE_ENV === 'production' ? '[name].[hash].bundle.js' : '[name].bundle.js'` within webpack configurations do not work as expected.

If you're using a library like [`react`](https://reactjs.org/), you should actually see a significant drop in bundle size after adding this plugin. Also note that any of our local `/src` code can key off of this as well, so the following check would be valid:

__src/index.js__

``` diff
  import { cube } from './math.js';
+
+ if (process.env.NODE_ENV !== 'production') {
+   console.log('Looks like we are in development mode!');
+ }

  function component() {
    var element = document.createElement('pre');

    element.innerHTML = [
      'Hello webpack!',
      '5 cubed is equal to ' + cube(5)
    ].join('\n\n');

    return element;
  }

  document.body.appendChild(component());
```


## Minification

webpack v4+ will minify your code by default in [`production mode`](/concepts/mode/#mode-production).

Note that while the [`TerserPlugin`](/plugins/terser-webpack-plugin) is a great place to start for minification and being used by default, there are other options out there. Here are a few more popular ones:

- [`BabelMinifyWebpackPlugin`](https://github.com/webpack-contrib/babel-minify-webpack-plugin)
- [`ClosureCompilerPlugin`](https://github.com/roman01la/webpack-closure-compiler)

If you decide to try another minification plugin, just make sure your new choice also drops dead code as described in the [tree shaking](/guides/tree-shaking) guide and provide it as the [`optimization.minimizer`](/configuration/optimization/#optimization-minimizer).


## Source Mapping

We encourage you to have source maps enabled in production, as they are useful for debugging as well as running benchmark tests. That said, you should choose one with a fairly quick build speed that's recommended for production use (see [`devtool`](/configuration/devtool)). For this guide, we'll use the `source-map` option in _production_ as opposed to the `inline-source-map` we used in _development_:

__webpack.prod.js__

``` diff
  const merge = require('webpack-merge');
  const common = require('./webpack.common.js');

  module.exports = merge(common, {
    mode: 'production',
+   devtool: 'source-map'
  });
```

T> Avoid `inline-***` and `eval-***` use in production as they can increase bundle size and reduce the overall performance.


## Minimize CSS

It is crucial to minimize your CSS on production, please see [Minimizing for Production](/plugins/mini-css-extract-plugin/#minimizing-for-production) section.


## CLI Alternatives

Some of what has been described above is also achievable via the command line. For example, the `--optimize-minimize` flag will include the `TerserPlugin` behind the scenes. The `--define process.env.NODE_ENV="'production'"` will do the same for the `DefinePlugin` instance described above. And, `webpack -p` will automatically invoke both those flags and thus the plugins to be included.

While these short hand methods are nice, we usually recommend just using the configuration as it's better to understand exactly what is being done for you in both cases. The configuration also gives you more control on fine tuning other options within both plugins.


# Code Splitting

T> This guide extends the examples provided in [Getting Started](/guides/getting-started) and [Output Management](/guides/output-management). Please make sure you are at least familiar with the examples provided in them.

Code splitting is one of the most compelling features of webpack. This feature allows you to split your code into various bundles which can then be loaded on demand or in parallel. It can be used to achieve smaller bundles and control resource load prioritization which, if used correctly, can have a major impact on load time.

There are three general approaches to code splitting available:

- Entry Points: Manually split code using [`entry`](/configuration/entry-context) configuration.
- Prevent Duplication: Use the [`SplitChunksPlugin`](/plugins/split-chunks-plugin/) to dedupe and split chunks.
- Dynamic Imports: Split code via inline function calls within modules.


## Entry Points

This is by far the easiest, and most intuitive, way to split code. However, it is more manual and has some pitfalls we will go over. Let's take a look at how we might split another module from the main bundle:

__project__

``` diff
webpack-demo
|- package.json
|- webpack.config.js
|- /dist
|- /src
  |- index.js
+ |- another-module.js
|- /node_modules
```

__another-module.js__

``` js
import _ from 'lodash';

console.log(
  _.join(['Another', 'module', 'loaded!'], ' ')
);
```

__webpack.config.js__

``` diff
const path = require('path');

module.exports = {
  mode: 'development',
  entry: {
    index: './src/index.js',
+   another: './src/another-module.js'
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  }
};
```

This will yield the following build result:

``` bash
...
            Asset     Size   Chunks             Chunk Names
another.bundle.js  550 KiB  another  [emitted]  another
  index.bundle.js  550 KiB    index  [emitted]  index
Entrypoint index = index.bundle.js
Entrypoint another = another.bundle.js
...
```

As mentioned there are some pitfalls to this approach:

- If there are any duplicated modules between entry chunks they will be included in both bundles.
- It isn't as flexible and can't be used to dynamically split code with the core application logic.

The first of these two points is definitely an issue for our example, as `lodash` is also imported within `./src/index.js` and will thus be duplicated in both bundles. Let's remove this duplication by using the [`SplitChunksPlugin`](/plugins/split-chunks-plugin/).


## Prevent Duplication

The [`SplitChunksPlugin`](/plugins/split-chunks-plugin/) allows us to extract common dependencies into an existing entry chunk or an entirely new chunk. Let's use this to de-duplicate the `lodash` dependency from the previous example:

W> The `CommonsChunkPlugin` has been removed in webpack v4 legato. To learn how chunks are treated in the latest version, check out the [`SplitChunksPlugin`](/plugins/split-chunks-plugin/).

__webpack.config.js__

``` diff
  const path = require('path');

  module.exports = {
    mode: 'development',
    entry: {
      index: './src/index.js',
      another: './src/another-module.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist')
    },
+   optimization: {
+     splitChunks: {
+       chunks: 'all'
+     }
+   }
  };
```

With the [`optimization.splitChunks`](/plugins/split-chunks-plugin/#optimization-splitchunks) configuration option in place, we should now see the duplicate dependency removed from our `index.bundle.js` and `another.bundle.js`. The plugin should notice that we've separated `lodash` out to a separate chunk and remove the dead weight from our main bundle. Let's do an `npm run build` to see if it worked:

``` bash
...
                          Asset      Size                 Chunks             Chunk Names
              another.bundle.js  5.95 KiB                another  [emitted]  another
                index.bundle.js  5.89 KiB                  index  [emitted]  index
vendors~another~index.bundle.js   547 KiB  vendors~another~index  [emitted]  vendors~another~index
Entrypoint index = vendors~another~index.bundle.js index.bundle.js
Entrypoint another = vendors~another~index.bundle.js another.bundle.js
...
```

Here are some other useful plugins and loaders provided by the community for splitting code:

- [`mini-css-extract-plugin`](/plugins/mini-css-extract-plugin): Useful for splitting CSS out from the main application.
- [`bundle-loader`](/loaders/bundle-loader): Used to split code and lazy load the resulting bundles.
- [`promise-loader`](https://github.com/gaearon/promise-loader): Similar to the `bundle-loader` but uses promises.


## Dynamic Imports

Two similar techniques are supported by webpack when it comes to dynamic code splitting. The first and recommended approach is to use the [`import()` syntax](/api/module-methods#import-) that conforms to the [ECMAScript proposal](https://github.com/tc39/proposal-dynamic-import) for dynamic imports. The legacy, webpack-specific approach is to use [`require.ensure`](/api/module-methods#require-ensure). Let's try using the first of these two approaches...

W> `import()` calls use [promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) internally. If you use `import()` with older browsers, remember to shim `Promise` using a polyfill such as [es6-promise](https://github.com/stefanpenner/es6-promise) or [promise-polyfill](https://github.com/taylorhakes/promise-polyfill).

Before we start, let's remove the extra [`entry`](/concepts/entry-points/) and [`optimization.splitChunks`](/plugins/split-chunks-plugin) from our config as they won't be needed for this next demonstration:

__webpack.config.js__

``` diff
  const path = require('path');

  module.exports = {
    mode: 'development',
    entry: {
+     index: './src/index.js'
-     index: './src/index.js',
-     another: './src/another-module.js'
    },
    output: {
      filename: '[name].bundle.js',
+     chunkFilename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist')
    },
-   optimization: {
-     splitChunks: {
-       chunks: 'all'
-     }
-   }
  };
```

Note the use of `chunkFilename`, which determines the name of non-entry chunk files. For more information on `chunkFilename`, see [output documentation](/configuration/output/#output-chunkfilename). We'll also update our project to remove the now unused files:

__project__

``` diff
webpack-demo
|- package.json
|- webpack.config.js
|- /dist
|- /src
  |- index.js
- |- another-module.js
|- /node_modules
```

Now, instead of statically importing `lodash`, we'll use dynamic importing to separate a chunk:

__src/index.js__

``` diff
- import _ from 'lodash';
-
- function component() {
+ function getComponent() {
-   var element = document.createElement('div');
-
-   // Lodash, now imported by this script
-   element.innerHTML = _.join(['Hello', 'webpack'], ' ');
+   return import(/* webpackChunkName: "lodash" */ 'lodash').then(({ default: _ }) => {
+     var element = document.createElement('div');
+
+     element.innerHTML = _.join(['Hello', 'webpack'], ' ');
+
+     return element;
+
+   }).catch(error => 'An error occurred while loading the component');
  }

- document.body.appendChild(component());
+ getComponent().then(component => {
+   document.body.appendChild(component);
+ })
```

The reason we need `default` is since webpack 4, when importing a CommonJS module, the import will no longer resolve to the value of `module.exports`, it will instead create an artificial namespace object for the CommonJS module, for more information on the reason behind this, read [webpack 4: import() and CommonJs](https://medium.com/webpack/webpack-4-import-and-commonjs-d619d626b655)

Note the use of `webpackChunkName` in the comment. This will cause our separate bundle to be named `lodash.bundle.js` instead of just `[id].bundle.js`. For more information on `webpackChunkName` and the other available options, see the [`import()` documentation](/api/module-methods#import-). Let's run webpack to see `lodash` separated out to a separate bundle:

``` bash
...
                   Asset      Size          Chunks             Chunk Names
         index.bundle.js  7.88 KiB           index  [emitted]  index
vendors~lodash.bundle.js   547 KiB  vendors~lodash  [emitted]  vendors~lodash
Entrypoint index = index.bundle.js
...
```

As `import()` returns a promise, it can be used with [`async` functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function). However, this requires using a pre-processor like Babel and the [Syntax Dynamic Import Babel Plugin](https://babeljs.io/docs/plugins/syntax-dynamic-import/#installation). Here's how it would simplify the code:

__src/index.js__

``` diff
- function getComponent() {
+ async function getComponent() {
-   return import(/* webpackChunkName: "lodash" */ 'lodash').then({ default: _ } => {
-     var element = document.createElement('div');
-
-     element.innerHTML = _.join(['Hello', 'webpack'], ' ');
-
-     return element;
-
-   }).catch(error => 'An error occurred while loading the component');
+   var element = document.createElement('div');
+   const { default: _ } = await import(/* webpackChunkName: "lodash" */ 'lodash');
+
+   element.innerHTML = _.join(['Hello', 'webpack'], ' ');
+
+   return element;
  }

  getComponent().then(component => {
    document.body.appendChild(component);
  });
```


## Prefetching/Preloading modules

webpack 4.6.0+ adds support for prefetching and preloading.

Using these inline directives while declaring your imports allows webpack to output “Resource Hint” which tells the browser that for:

- prefetch: resource is probably needed for some navigation in the future
- preload: resource might be needed during the current navigation

Simple prefetch example can be having a `HomePage` component, which renders a `LoginButton` component which then on demand loads a `LoginModal` component after being clicked.

__LoginButton.js__

```js
//...
import(/* webpackPrefetch: true */ 'LoginModal');
```

This will result in `<link rel="prefetch" href="login-modal-chunk.js">` being appended in the head of the page, which will instruct the browser to prefetch in idle time the `login-modal-chunk.js` file.

T> webpack will add the prefetch hint once the parent chunk has been loaded.

Preload directive has a bunch of differences compared to prefetch:

- A preloaded chunk starts loading in parallel to the parent chunk. A prefetched chunk starts after the parent chunk finishes loading.
- A preloaded chunk has medium priority and is instantly downloaded. A prefetched chunk is downloaded while browser is idle.
- A preloaded chunk should be instantly requested by the parent chunk. A prefetched chunk can be used anytime in the future.
- Browser support is different.

Simple preload example can be having a `Component` which always depends on a big library that should be in a separate chunk.

Let's imagine a component `ChartComponent` which needs huge `ChartingLibrary`. It displays a `LoadingIndicator` when rendered and instantly does an on demand import of `ChartingLibrary`:

__ChartComponent.js__

```js
//...
import(/* webpackPreload: true */ 'ChartingLibrary');
```

When a page which uses the `ChartComponent` is requested, the charting-library-chunk is also requested via `<link rel="preload">`. Assuming the page-chunk is smaller and finishes faster, the page will be displayed with a `LoadingIndicator`, until the already requested `charting-library-chunk` finishes. This will give a little load time boost since it only needs one round-trip instead of two. Especially in high-latency environments.

T> Using webpackPreload incorrectly can actually hurt performance, so be careful when using it.


## Bundle Analysis

Once you start splitting your code, it can be useful to analyze the output to check where modules have ended up. The [official analyze tool](https://github.com/webpack/analyse) is a good place to start. There are some other community-supported options out there as well:

- [webpack-chart](https://alexkuz.github.io/webpack-chart/): Interactive pie chart for webpack stats.
- [webpack-visualizer](https://chrisbateman.github.io/webpack-visualizer/): Visualize and analyze your bundles to see which modules are taking up space and which might be duplicates.
- [webpack-bundle-analyzer](https://github.com/webpack-contrib/webpack-bundle-analyzer): A plugin and CLI utility that represents bundle content as convenient interactive zoomable treemap.
- [webpack bundle optimize helper](https://webpack.jakoblind.no/optimize): This tool will analyze your bundle and give you actionable suggestions on what to improve to reduce your bundle size.

## Next Steps

See [Lazy Loading](/guides/lazy-loading) for a more concrete example of how `import()` can be used in a real application and [Caching](/guides/caching) to learn how to split code more effectively.


# Lazy Loading

T> This guide is a small follow-up to [Code Splitting](/guides/code-splitting). If you have not yet read through that guide, please do so now.

Lazy, or "on demand", loading is a great way to optimize your site or application. This practice essentially involves splitting your code at logical breakpoints, and then loading it once the user has done something that requires, or will require, a new block of code. This speeds up the initial load of the application and lightens its overall weight as some blocks may never even be loaded.


## Example

Let's take the example from [Code Splitting](/guides/code-splitting#dynamic-imports) and tweak it a bit to demonstrate this concept even more. The code there does cause a separate chunk, `lodash.bundle.js`, to be generated and technically "lazy-loads" it as soon as the script is run. The trouble is that no user interaction is required to load the bundle -- meaning that every time the page is loaded, the request will fire. This doesn't help us too much and will impact performance negatively.

Let's try something different. We'll add an interaction to log some text to the console when the user clicks a button. However, we'll wait to load that code (`print.js`) until the interaction occurs for the first time. To do this we'll go back and rework the [final _Dynamic Imports_ example](/guides/code-splitting#dynamic-imports) from _Code Splitting_ and leave `lodash` in the main chunk.

__project__

``` diff
webpack-demo
|- package.json
|- webpack.config.js
|- /dist
|- /src
  |- index.js
+ |- print.js
|- /node_modules
```

__src/print.js__

``` js
console.log('The print.js module has loaded! See the network tab in dev tools...');

export default () => {
  console.log('Button Clicked: Here\'s "some text"!');
};
```

__src/index.js__

``` diff
+ import _ from 'lodash';
+
- async function getComponent() {
+ function component() {
    var element = document.createElement('div');
-   const _ = await import(/* webpackChunkName: "lodash" */ 'lodash');
+   var button = document.createElement('button');
+   var br = document.createElement('br');

+   button.innerHTML = 'Click me and look at the console!';
    element.innerHTML = _.join(['Hello', 'webpack'], ' ');
+   element.appendChild(br);
+   element.appendChild(button);
+
+   // Note that because a network request is involved, some indication
+   // of loading would need to be shown in a production-level site/app.
+   button.onclick = e => import(/* webpackChunkName: "print" */ './print').then(module => {
+     var print = module.default;
+
+     print();
+   });

    return element;
  }

- getComponent().then(component => {
-   document.body.appendChild(component);
- });
+ document.body.appendChild(component());
```

W> Note that when using `import()` on ES6 modules you must reference the `.default` property as it's the actual `module` object that will be returned when the promise is resolved.

Now let's run webpack and check out our new lazy-loading functionality:

``` bash
...
          Asset       Size  Chunks                    Chunk Names
print.bundle.js  417 bytes       0  [emitted]         print
index.bundle.js     548 kB       1  [emitted]  [big]  index
     index.html  189 bytes          [emitted]
...
```


## Frameworks

Many frameworks and libraries have their own recommendations on how this should be accomplished within their methodologies. Here are a few examples:

- React: [Code Splitting and Lazy Loading](https://reacttraining.com/react-router/web/guides/code-splitting)
- Vue: [Lazy Load in Vue using Webpack's code splitting](https://alexjoverm.github.io/2017/07/16/Lazy-load-in-Vue-using-Webpack-s-code-splitting/)
- AngularJS: [AngularJS + Webpack = lazyLoad](https://medium.com/@var_bin/angularjs-webpack-lazyload-bb7977f390dd) by [@var_bincom](https://twitter.com/var_bincom)


# Caching

T> The examples in this guide stem from [getting started](/guides/getting-started), [output management](/guides/output-management) and [code splitting](/guides/code-splitting).

So we're using webpack to bundle our modular application which yields a deployable `/dist` directory. Once the contents of `/dist` have been deployed to a server, clients (typically browsers) will hit that server to grab the site and its assets. The last step can be time consuming, which is why browsers use a technique called [caching](https://searchstorage.techtarget.com/definition/cache). This allows sites to load faster with less unnecessary network traffic, however it can also cause headaches when you need new code to be picked up.

This guide focuses on the configuration needed to ensure files produced by webpack compilation can remain cached unless their contents has changed.


## Output Filenames

A simple way to ensure the browser picks up changed files is by using `output.filename` [substitutions](/configuration/output#output-filename). The `[hash]` substitution can be used to include a build-specific hash in the filename, however it's even better to use the `[contenthash]` substitution which is the hash of the content of a file, which is different for each asset.

Let's get our project set up using the example from [getting started](/guides/getting-started) with the `plugins` from [output management](/guides/output-management), so we don't have to deal with maintaining our `index.html` file manually:

__project__

``` diff
webpack-demo
|- package.json
|- webpack.config.js
|- /dist
|- /src
  |- index.js
|- /node_modules
```

__webpack.config.js__

``` diff
  const path = require('path');
  const CleanWebpackPlugin = require('clean-webpack-plugin');
  const HtmlWebpackPlugin = require('html-webpack-plugin');

  module.exports = {
    entry: './src/index.js',
    plugins: [
      new CleanWebpackPlugin(['dist']),
      new HtmlWebpackPlugin({
-       title: 'Output Management'
+       title: 'Caching'
      })
    ],
    output: {
-     filename: 'bundle.js',
+     filename: '[name].[contenthash].js',
      path: path.resolve(__dirname, 'dist')
    }
  };
```

Running our build script, `npm run build`, with this configuration should produce the following output:

``` bash
...
                       Asset       Size  Chunks                    Chunk Names
main.7e2c49a622975ebd9b7e.js     544 kB       0  [emitted]  [big]  main
                  index.html  197 bytes          [emitted]
...
```

As you can see the bundle's name now reflects its content (via the hash). If we run another build without making any changes, we'd expect that filename to stay the same. However, if we were to run it again, we may find that this is not the case:

``` bash
...
                       Asset       Size  Chunks                    Chunk Names
main.205199ab45963f6a62ec.js     544 kB       0  [emitted]  [big]  main
                  index.html  197 bytes          [emitted]
...
```

This is because webpack includes certain boilerplate, specifically the runtime and manifest, in the entry chunk.

W> Output may differ depending on your current webpack version. Newer versions may not have all the same issues with hashing as some older versions, but we still recommend the following steps to be safe.

## Extracting Boilerplate

As we learned in [code splitting](/guides/code-splitting), the [`SplitChunksPlugin`](/plugins/split-chunks-plugin/) can be used to split modules out into separate bundles. webpack provides an optimization feature which does split out runtime code into a separate chunk(s) according to the options provided, simply use [`optimization.runtimeChunk`](/configuration/optimization/#optimization-runtimechunk) set to `single` for creating one runtime bundle:

__webpack.config.js__

``` diff
  const path = require('path');
  const CleanWebpackPlugin = require('clean-webpack-plugin');
  const HtmlWebpackPlugin = require('html-webpack-plugin');

  module.exports = {
    entry: './src/index.js',
    plugins: [
      new CleanWebpackPlugin(['dist']),
      new HtmlWebpackPlugin({
        title: 'Caching'
    ],
    output: {
      filename: '[name].[contenthash].js',
      path: path.resolve(__dirname, 'dist')
    },
+   optimization: {
+     runtimeChunk: 'single'
+   }
  };
```

Let's run another build to see the extracted `runtime` bundle:

``` bash
Hash: 82c9c385607b2150fab2
Version: webpack 4.12.0
Time: 3027ms
                          Asset       Size  Chunks             Chunk Names
runtime.cc17ae2a94ec771e9221.js   1.42 KiB       0  [emitted]  runtime
   main.e81de2cf758ada72f306.js   69.5 KiB       1  [emitted]  main
                     index.html  275 bytes          [emitted]
[1] (webpack)/buildin/module.js 497 bytes {1} [built]
[2] (webpack)/buildin/global.js 489 bytes {1} [built]
[3] ./src/index.js 309 bytes {1} [built]
    + 1 hidden module
```

It's also good practice to extract third-party libraries, such as `lodash` or `react`, to a separate `vendor` chunk as they are less likely to change than our local source code. This step will allow clients to request even less from the server to stay up to date.
This can be done by using the [`cacheGroups`](/plugins/split-chunks-plugin/#splitchunks-cachegroups) option of the [`SplitChunksPlugin`](/plugins/split-chunks-plugin/) demonstrated in [Example 2 of SplitChunksPlugin](/plugins/split-chunks-plugin/#split-chunks-example-2). Lets add `optimization.splitChunks` with `cacheGroups` with next params and build:

__webpack.config.js__

``` diff
  var path = require('path');
  const CleanWebpackPlugin = require('clean-webpack-plugin');
  const HtmlWebpackPlugin = require('html-webpack-plugin');

  module.exports = {
    entry: './src/index.js',
    plugins: [
      new CleanWebpackPlugin(['dist']),
      new HtmlWebpackPlugin({
        title: 'Caching'
      }),
    ],
    output: {
      filename: '[name].[contenthash].js',
      path: path.resolve(__dirname, 'dist')
    },
    optimization: {
-     runtimeChunk: 'single'
+     runtimeChunk: 'single',
+     splitChunks: {
+       cacheGroups: {
+         vendor: {
+           test: /[\\/]node_modules[\\/]/,
+           name: 'vendors',
+           chunks: 'all'
+         }
+       }
+     }
    }
  };
```

Let's run another build to see our new `vendor` bundle:

``` bash
...
                          Asset       Size  Chunks             Chunk Names
runtime.cc17ae2a94ec771e9221.js   1.42 KiB       0  [emitted]  runtime
vendors.a42c3ca0d742766d7a28.js   69.4 KiB       1  [emitted]  vendors
   main.abf44fedb7d11d4312d7.js  240 bytes       2  [emitted]  main
                     index.html  353 bytes          [emitted]
...
```

We can now see that our `main` bundle does not contain `vendor` code from `node_modules` directory and is down in size to `240 bytes`!

## Module Identifiers

Let's add another module, `print.js`, to our project:

__project__

``` diff
webpack-demo
|- package.json
|- webpack.config.js
|- /dist
|- /src
  |- index.js
+ |- print.js
|- /node_modules
```

__print.js__

``` diff
+ export default function print(text) {
+   console.log(text);
+ };
```

__src/index.js__

``` diff
  import _ from 'lodash';
+ import Print from './print';

  function component() {
    var element = document.createElement('div');

    // Lodash, now imported by this script
    element.innerHTML = _.join(['Hello', 'webpack'], ' ');
+   element.onclick = Print.bind(null, 'Hello webpack!');

    return element;
  }

  document.body.appendChild(component());
```

Running another build, we would expect only our `main` bundle's hash to change, however...

``` bash
...
                           Asset       Size  Chunks                    Chunk Names
  vendor.a7561fb0e9a071baadb9.js     541 kB       0  [emitted]  [big]  vendor
    main.b746e3eb72875af2caa9.js    1.22 kB       1  [emitted]         main
manifest.1400d5af64fc1b7b3a45.js    5.85 kB       2  [emitted]         manifest
                      index.html  352 bytes          [emitted]
...
```

... we can see that all three have. This is because each [`module.id`](/api/module-variables#module-id-commonjs-) is incremented based on resolving order by default. Meaning when the order of resolving is changed, the IDs will be changed as well. So, to recap:

- The `main` bundle changed because of its new content.
- The `vendor` bundle changed because its `module.id` was changed.
- And, the `manifest` bundle changed because it now contains a reference to a new module.

The first and last are expected -- it's the `vendor` hash we want to fix. Luckily, there are two plugins we can use to resolve this issue. The first is the `NamedModulesPlugin`, which will use the path to the module rather than a numerical identifier. While this plugin is useful during development for more readable output, it does take a bit longer to run. The second option is the [`HashedModuleIdsPlugin`](/plugins/hashed-module-ids-plugin), which is recommended for production builds:

__webpack.config.js__

``` diff
  const path = require('path');
+ const webpack = require('webpack');
  const CleanWebpackPlugin = require('clean-webpack-plugin');
  const HtmlWebpackPlugin = require('html-webpack-plugin');

  module.exports = {
    entry: './src/index.js',
    plugins: [
      new CleanWebpackPlugin(['dist']),
      new HtmlWebpackPlugin({
        title: 'Caching'
      }),
+      new webpack.HashedModuleIdsPlugin()
    ],
    output: {
      filename: '[name].[contenthash].js',
      path: path.resolve(__dirname, 'dist')
    },
    optimization: {
      runtimeChunk: 'single',
      splitChunks: {
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all'
          }
        }
      }
    }
  };
```

Now, despite any new local dependencies, our `vendor` hash should stay consistent between builds:

``` bash
...
                          Asset       Size  Chunks             Chunk Names
   main.216e852f60c8829c2289.js  340 bytes       0  [emitted]  main
vendors.55e79e5927a639d21a1b.js   69.5 KiB       1  [emitted]  vendors
runtime.725a1a51ede5ae0cfde0.js   1.42 KiB       2  [emitted]  runtime
                     index.html  353 bytes          [emitted]
Entrypoint main = runtime.725a1a51ede5ae0cfde0.js vendors.55e79e5927a639d21a1b.js main.216e852f60c8829c2289.js
...
```

And let's modify our `src/index.js` to temporarily remove that extra dependency:

__src/index.js__

``` diff
  import _ from 'lodash';
- import Print from './print';
+ // import Print from './print';

  function component() {
    var element = document.createElement('div');

    // Lodash, now imported by this script
    element.innerHTML = _.join(['Hello', 'webpack'], ' ');
-   element.onclick = Print.bind(null, 'Hello webpack!');
+   // element.onclick = Print.bind(null, 'Hello webpack!');

    return element;
  }

  document.body.appendChild(component());
```

And finally run our build again:

``` bash
...
                          Asset       Size  Chunks             Chunk Names
   main.ad717f2466ce655fff5c.js  274 bytes       0  [emitted]  main
vendors.55e79e5927a639d21a1b.js   69.5 KiB       1  [emitted]  vendors
runtime.725a1a51ede5ae0cfde0.js   1.42 KiB       2  [emitted]  runtime
                     index.html  353 bytes          [emitted]
Entrypoint main = runtime.725a1a51ede5ae0cfde0.js vendors.55e79e5927a639d21a1b.js main.ad717f2466ce655fff5c.js
...
```

We can see that both builds yielded `55e79e5927a639d21a1b` in the `vendor` bundle's filename.


## Conclusion

Caching gets messy. Plain and simple. However the walk-through above should give you a running start to deploying consistent, cacheable assets. See the _Further Reading_ section below to learn more.


# Authoring Libraries

Aside from applications, webpack can also be used to bundle JavaScript libraries. The following guide is meant for library authors looking to streamline their bundling strategy.


## Authoring a Library

Let's assume that you are writing a small library ,`webpack-numbers`, that allows users to convert the numbers 1 through 5 from their numeric representation to a textual one and vice-versa, e.g. 2 to 'two'.

The basic project structure may look like this:

__project__

``` diff
+  |- webpack.config.js
+  |- package.json
+  |- /src
+    |- index.js
+    |- ref.json
```

Initialize npm, install webpack and lodash:

``` bash
npm init -y
npm install --save-dev webpack lodash
```

__src/ref.json__

```json
[
  {
    "num": 1,
    "word": "One"
  },
  {
    "num": 2,
    "word": "Two"
  },
  {
    "num": 3,
    "word": "Three"
  },
  {
    "num": 4,
    "word": "Four"
  },
  {
    "num": 5,
    "word": "Five"
  },
  {
    "num": 0,
    "word": "Zero"
  }
]
```

__src/index.js__

``` js
import _ from 'lodash';
import numRef from './ref.json';

export function numToWord(num) {
  return _.reduce(numRef, (accum, ref) => {
    return ref.num === num ? ref.word : accum;
  }, '');
}

export function wordToNum(word) {
  return _.reduce(numRef, (accum, ref) => {
    return ref.word === word && word.toLowerCase() ? ref.num : accum;
  }, -1);
}
```

The usage specification for the library use will be as follows:

- __ES2015 module import:__

``` js
import * as webpackNumbers from 'webpack-numbers';
// ...
webpackNumbers.wordToNum('Two');
```

- __CommonJS module require:__

``` js
var webpackNumbers = require('webpack-numbers');
// ...
webpackNumbers.wordToNum('Two');
```

- __AMD module require:__

``` js
require(['webpackNumbers'], function ( webpackNumbers) {
  // ...
  webpackNumbers.wordToNum('Two');
});
```

The consumer also can use the library by loading it via a script tag:

``` html
<!doctype html>
<html>
  ...
  <script src="https://unpkg.com/webpack-numbers"></script>
  <script>
    // ...
    // Global variable
    webpackNumbers.wordToNum('Five')
    // Property in the window object
    window.webpackNumbers.wordToNum('Five')
    // ...
  </script>
</html>
```

Note that we can also configure it to expose the library in the following ways:

- Property in the global object, for node.
- Property in the `this` object.

For full library configuration and code please refer to [webpack-library-example](https://github.com/kalcifer/webpack-library-example).


## Base Configuration

Now let's bundle this library in a way that will achieve the following goals:

- Using `externals` to avoid bundling `lodash`, so the consumer is required to load it.
- Setting the library name as `webpack-numbers`.
- Exposing the library as a variable called `webpackNumbers`.
- Being able to access the library inside Node.js.

Also, the consumer should be able to access the library the following ways:

- ES2015 module. i.e. `import webpackNumbers from 'webpack-numbers'`.
- CommonJS module. i.e. `require('webpack-numbers')`.
- Global variable when included through `script` tag.

We can start with this basic webpack configuration:

__webpack.config.js__

``` js
var path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'webpack-numbers.js'
  }
};
```


## Externalize Lodash

Now, if you run `webpack`, you will find that a largish bundle is created. If you inspect the file, you'll see that lodash has been bundled along with your code. In this case, we'd prefer to treat `lodash` as a `peerDependency`. Meaning that the consumer should already have `lodash` installed. Hence you would want to give up control of this external library to the consumer of your library.

This can be done using the `externals` configuration:

__webpack.config.js__

``` diff
  var path = require('path');

  module.exports = {
    entry: './src/index.js',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'webpack-numbers.js'
-   }
+   },
+   externals: {
+     lodash: {
+       commonjs: 'lodash',
+       commonjs2: 'lodash',
+       amd: 'lodash',
+       root: '_'
+     }
+   }
  };
```

This means that your library expects a dependency named `lodash` to be available in the consumer's environment.

T> Note that if you only plan on using your library as a dependency in another webpack bundle, you may specify `externals` as an array.


## External Limitations

For libraries that use several files from a dependency:

``` js
import A from 'library/one';
import B from 'library/two';

// ...
```

You won't be able to exclude them from bundle by specifying `library` in the externals. You'll either need to exclude them one by one or by using a regular expression.

``` js
module.exports = {
  //...
  externals: [
    'library/one',
    'library/two',
    // Everything that starts with "library/"
    /^library\/.+$/
  ]
};
```


## Expose the Library

For widespread use of the library, we would like it to be compatible in different environments, i.e. CommonJS, AMD, Node.js and as a global variable. To make your library available for consumption, add the `library` property inside `output`:

__webpack.config.js__

``` diff
  var path = require('path');

  module.exports = {
    entry: './src/index.js',
    output: {
      path: path.resolve(__dirname, 'dist'),
-     filename: 'webpack-numbers.js'
+     filename: 'webpack-numbers.js',
+     library: 'webpackNumbers'
    },
    externals: {
      lodash: {
        commonjs: 'lodash',
        commonjs2: 'lodash',
        amd: 'lodash',
        root: '_'
      }
    }
  };
```

T> Note that the `library` setup is tied to the `entry` configuration. For most libraries, specifying a single entry point is sufficient. While [multi-part libraries](https://github.com/webpack/webpack/tree/master/examples/multi-part-library) are possible, it is simpler to expose partial exports through an [index script](https://stackoverflow.com/questions/34072598/es6-exporting-importing-in-index-file) that serves as a single entry point. Using an `array` as an `entry` point for a library is __not recommended__.

This exposes your library bundle available as a global variable named `webpackNumbers` when imported. To make the library compatible with other environments, add `libraryTarget` property to the config. This will add the different options about how the library can be exposed.

__webpack.config.js__

``` diff
  var path = require('path');

  module.exports = {
    entry: './src/index.js',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'webpack-numbers.js',
-     library: 'webpackNumbers'
+     library: 'webpackNumbers',
+     libraryTarget: 'umd'
    },
    externals: {
      lodash: {
        commonjs: 'lodash',
        commonjs2: 'lodash',
        amd: 'lodash',
        root: '_'
      }
    }
  };
```

You can expose the library in the following ways:

- Variable: as a global variable made available by a `script` tag (`libraryTarget:'var'`).
- This: available through the `this` object (`libraryTarget:'this'`).
- Window: available trough the `window` object, in the browser (`libraryTarget:'window'`).
- UMD: available after AMD or CommonJS `require` (`libraryTarget:'umd'`).

If `library` is set and `libraryTarget` is not, `libraryTarget` defaults to `var` as specified in the [output configuration documentation](/configuration/output). See [`output.libraryTarget`](/configuration/output#output-librarytarget) there for a detailed list of all available options.

W> With webpack 3.5.5, using `libraryTarget: { root:'_' }` doesn't work properly (as stated in [issue 4824](https://github.com/webpack/webpack/issues/4824)). However, you can set `libraryTarget: { var: '_' }` to expect the library as a global variable.


### Final Steps

Optimize your output for production by following the steps in the [production guide](/guides/production). Let's also add the path to your generated bundle as the package's `main` field in with our `package.json`

__package.json__

``` json
{
  ...
  "main": "dist/webpack-numbers.js",
  ...
}
```

Or, to add as standard module as per [this guide](https://github.com/dherman/defense-of-dot-js/blob/master/proposal.md#typical-usage):

``` json
{
  ...
  "module": "src/index.js",
  ...
}
```

The key `main` refers to the [standard from `package.json`](https://docs.npmjs.com/files/package.json#main), and `module` to [a](https://github.com/dherman/defense-of-dot-js/blob/master/proposal.md) [proposal](https://github.com/rollup/rollup/wiki/pkg.module) to allow the JavaScript ecosystem upgrade to use ES2015 modules without breaking backwards compatibility.

W> The `module` property should point to a script that utilizes ES2015 module syntax but no other syntax features that aren't yet supported by browsers or node. This enables webpack to parse the module syntax itself, allowing for lighter bundles via [tree shaking](https://webpack.js.org/guides/tree-shaking/) if users are only consuming certain parts of the library.

Now you can [publish it as an npm package](https://docs.npmjs.com/getting-started/publishing-npm-packages) and find it at [unpkg.com](https://unpkg.com/#/) to distribute it to your users.

T> To expose stylesheets associated with your library, the [`ExtractTextPlugin`](/plugins/extract-text-webpack-plugin) should be used. Users can then consume and load these as they would any other stylesheet.


# Shimming

The `webpack` compiler can understand modules written as ES2015 modules, CommonJS or AMD. However, some third party libraries may expect global dependencies (e.g. `$` for `jQuery`). The libraries might also create globals which need to be exported. These "broken modules" are one instance where _shimming_ comes into play.

W> __We don't recommend using globals!__ The whole concept behind webpack is to allow more modular front-end development. This means writing isolated modules that are well contained and do not rely on hidden dependencies (e.g. globals). Please use these features only when necessary.

Another instance where _shimming_ can be useful is when you want to [polyfill](https://en.wikipedia.org/wiki/Polyfill) browser functionality to support more users. In this case, you may only want to deliver those polyfills to the browsers that need patching (i.e. load them on demand).

The following article will walk through both of these use cases.

T> For simplicity, this guide stems from the examples in [Getting Started](/guides/getting-started). Please make sure you are familiar with the setup there before moving on.


## Shimming Globals

Let's start with the first use case of shimming global variables. Before we do anything let's take another look at our project:

__project__

``` diff
webpack-demo
|- package.json
|- webpack.config.js
|- /dist
|- /src
  |- index.js
|- /node_modules
```

Remember that `lodash` package we were using? For demonstration purposes, let's say we wanted to instead provide this as a global throughout our application. To do this, we can use the `ProvidePlugin`.

The [`ProvidePlugin`](/plugins/provide-plugin) makes a package available as a variable in every module compiled through webpack. If webpack sees that variable used, it will include the given package in the final bundle. Let's go ahead by removing the `import` statement for `lodash` and instead providing it via the plugin:

__src/index.js__

``` diff
- import _ from 'lodash';
-
  function component() {
    var element = document.createElement('div');

-   // Lodash, now imported by this script
    element.innerHTML = _.join(['Hello', 'webpack'], ' ');

    return element;
  }

  document.body.appendChild(component());
```

__webpack.config.js__

``` diff
  const path = require('path');
+ const webpack = require('webpack');

  module.exports = {
    entry: './src/index.js',
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'dist')
-   }
+   },
+   plugins: [
+     new webpack.ProvidePlugin({
+       _: 'lodash'
+     })
+   ]
  };
```

What we've essentially done here is tell webpack...

> If you encounter at least one instance of the variable `_`, include the `lodash` package and provide it to the modules that need it.

If we run a build, we should still see the same output:

``` bash
...
    Asset    Size  Chunks                    Chunk Names
bundle.js  544 kB       0  [emitted]  [big]  main
...
```

We can also use the `ProvidePlugin` to expose a single export of a module by configuring it with an "array path" (e.g. `[module, child, ...children?]`). So let's imagine we only wanted to provide the `join` method from `lodash` wherever it's invoked:

__src/index.js__

``` diff
  function component() {
    var element = document.createElement('div');

-   element.innerHTML = _.join(['Hello', 'webpack'], ' ');
+   element.innerHTML = join(['Hello', 'webpack'], ' ');

    return element;
  }

  document.body.appendChild(component());
```

__webpack.config.js__

``` diff
  const path = require('path');
  const webpack = require('webpack');

  module.exports = {
    entry: './src/index.js',
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'dist')
    },
    plugins: [
      new webpack.ProvidePlugin({
-       _: 'lodash'
+       join: ['lodash', 'join']
      })
    ]
  };
```

This would go nicely with [Tree Shaking](/guides/tree-shaking) as the rest of the `lodash` library should get dropped.


## Granular Shimming

Some legacy modules rely on `this` being the `window` object. Let's update our `index.js` so this is the case:

``` diff
  function component() {
    var element = document.createElement('div');

    element.innerHTML = join(['Hello', 'webpack'], ' ');
+
+   // Assume we are in the context of `window`
+   this.alert('Hmmm, this probably isn\'t a great idea...')

    return element;
  }

  document.body.appendChild(component());
```

This becomes a problem when the module is executed in a CommonJS context where `this` is equal to `module.exports`. In this case you can override `this` using the [`imports-loader`](/loaders/imports-loader/):

__webpack.config.js__

``` diff
  const path = require('path');
  const webpack = require('webpack');

  module.exports = {
    entry: './src/index.js',
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'dist')
    },
+   module: {
+     rules: [
+       {
+         test: require.resolve('index.js'),
+         use: 'imports-loader?this=>window'
+       }
+     ]
+   },
    plugins: [
      new webpack.ProvidePlugin({
        join: ['lodash', 'join']
      })
    ]
  };
```


## Global Exports

Let's say a library creates a global variable that it expects its consumers to use. We can add a small module to our setup to demonstrate this:

__project__

``` diff
  webpack-demo
  |- package.json
  |- webpack.config.js
  |- /dist
  |- /src
    |- index.js
+   |- globals.js
  |- /node_modules
```

__src/globals.js__

``` js
var file = 'blah.txt';
var helpers = {
  test: function() { console.log('test something'); },
  parse: function() { console.log('parse something'); }
};
```

Now, while you'd likely never do this in your own source code, you may encounter a dated library you'd like to use that contains similar code to what's shown above. In this case, we can use [`exports-loader`](/loaders/exports-loader/), to export that global variable as a normal module export. For instance, in order to export `file` as `file` and `helpers.parse` as `parse`:

__webpack.config.js__

``` diff
  const path = require('path');
  const webpack = require('webpack');

  module.exports = {
    entry: './src/index.js',
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'dist')
    },
    module: {
      rules: [
        {
          test: require.resolve('index.js'),
          use: 'imports-loader?this=>window'
-       }
+       },
+       {
+         test: require.resolve('globals.js'),
+         use: 'exports-loader?file,parse=helpers.parse'
+       }
      ]
    },
    plugins: [
      new webpack.ProvidePlugin({
        join: ['lodash', 'join']
      })
    ]
  };
```

Now from within our entry script (i.e. `src/index.js`), we could `import { file, parse } from './globals.js';` and all should work smoothly.


## Loading Polyfills

Almost everything we've discussed thus far has been in relation to handling legacy packages. Let's move on to our second topic: __polyfills__.

There's a lot of ways to load polyfills. For example, to include the [`babel-polyfill`](https://babeljs.io/docs/usage/polyfill/) we might simply:

``` bash
npm install --save babel-polyfill
```

and `import` it so as to include it in our main bundle:

__src/index.js__

``` diff
+ import 'babel-polyfill';
+
  function component() {
    var element = document.createElement('div');

    element.innerHTML = join(['Hello', 'webpack'], ' ');

    return element;
  }

  document.body.appendChild(component());
```

T> Note that we aren't binding the `import` to a variable. This is because polyfills simply run on their own, prior to the rest of the code base, allowing us to then assume certain native functionality exists.

Now while this is one approach, __including polyfills in the main bundle is not recommended__ because this penalizes modern browsers users by making them download a bigger file with unneeded scripts.

Let's move our `import` to a new file and add the [`whatwg-fetch`](https://github.com/github/fetch) polyfill:

``` bash
npm install --save whatwg-fetch
```

__src/index.js__

``` diff
- import 'babel-polyfill';
-
  function component() {
    var element = document.createElement('div');

    element.innerHTML = join(['Hello', 'webpack'], ' ');

    return element;
  }

  document.body.appendChild(component());
```

__project__

``` diff
  webpack-demo
  |- package.json
  |- webpack.config.js
  |- /dist
  |- /src
    |- index.js
    |- globals.js
+   |- polyfills.js
  |- /node_modules
```

__src/polyfills.js__

```javascript
import 'babel-polyfill';
import 'whatwg-fetch';
```

__webpack.config.js__

``` diff
  const path = require('path');
  const webpack = require('webpack');

  module.exports = {
-   entry: './src/index.js',
+   entry: {
+     polyfills: './src/polyfills.js',
+     index: './src/index.js'
+   },
    output: {
-     filename: 'bundle.js',
+     filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist')
    },
    module: {
      rules: [
        {
          test: require.resolve('index.js'),
          use: 'imports-loader?this=>window'
        },
        {
          test: require.resolve('globals.js'),
          use: 'exports-loader?file,parse=helpers.parse'
        }
      ]
    },
    plugins: [
      new webpack.ProvidePlugin({
        join: ['lodash', 'join']
      })
    ]
  };
```

With that in place, we can add the logic to conditionally load our new `polyfills.bundle.js` file. How you make this decision depends on the technologies and browsers you need to support. We'll just do some simple testing to determine whether our polyfills are needed:

__dist/index.html__

``` diff
  <!doctype html>
  <html>
    <head>
      <title>Getting Started</title>
+     <script>
+       var modernBrowser = (
+         'fetch' in window &&
+         'assign' in Object
+       );
+
+       if ( !modernBrowser ) {
+         var scriptElement = document.createElement('script');
+
+         scriptElement.async = false;
+         scriptElement.src = '/polyfills.bundle.js';
+         document.head.appendChild(scriptElement);
+       }
+     </script>
    </head>
    <body>
      <script src="index.bundle.js"></script>
    </body>
  </html>
```

Now we can `fetch` some data within our entry script:

__src/index.js__

``` diff
  function component() {
    var element = document.createElement('div');

    element.innerHTML = join(['Hello', 'webpack'], ' ');

    return element;
  }

  document.body.appendChild(component());
+
+ fetch('https://jsonplaceholder.typicode.com/users')
+   .then(response => response.json())
+   .then(json => {
+     console.log('We retrieved some data! AND we\'re confident it will work on a variety of browser distributions.')
+     console.log(json)
+   })
+   .catch(error => console.error('Something went wrong when fetching this data: ', error))
```

If we run our build, another `polyfills.bundle.js` file will be emitted and everything should still run smoothly in the browser. Note that this set up could likely be improved upon but it should give you a good idea of how you can provide polyfills only to the users that actually need them.


## Further Optimizations

The `babel-preset-env` package uses [browserslist](https://github.com/browserslist/browserslist) to transpile only what is not supported in your browsers matrix. This preset comes with the [`useBuiltIns`](https://babeljs.io/docs/en/babel-preset-env#usebuiltins) option, `false` by default, which converts your global `babel-polyfill` import to a more granular feature by feature `import` pattern:

``` js
import 'core-js/modules/es7.string.pad-start';
import 'core-js/modules/es7.string.pad-end';
import 'core-js/modules/web.timers';
import 'core-js/modules/web.immediate';
import 'core-js/modules/web.dom.iterable';
```

See [the repository](https://github.com/babel/babel-preset-env) for more information.


## Node Built-Ins

Node built-ins, like `process`, can be polyfilled right directly from your configuration file without the use of any special loaders or plugins. See the [node configuration page](/configuration/node) for more information and examples.


## Other Utilities

There are a few other tools that can help when dealing with legacy modules.

The [`script-loader`](/loaders/script-loader/) evaluates code in the global context, similar to inclusion via a `script` tag. In this mode, every normal library should work. `require`, `module`, etc. are undefined.

W> When using the `script-loader`, the module is added as a string to the bundle. It is not minimized by `webpack`, so use a minimized version. There is also no `devtool` support for libraries added by this loader.

When there is no AMD/CommonJS version of the module and you want to include the `dist`, you can flag this module in [`noParse`](/configuration/module/#module-noparse). This will cause webpack to include the module without parsing it or resolving `require()` and `import` statements. This practice is also used to improve the build performance.

W> Any feature requiring the AST, like the `ProvidePlugin`, will not work.

Lastly, there are some modules that support multiple [module styles](/concepts/modules); e.g. a combination of AMD, CommonJS, and legacy. In most of these cases, they first check for `define` and then use some quirky code to export properties. In these cases, it could help to force the CommonJS path by setting `define=>false` via the [`imports-loader`](/loaders/imports-loader/).


# Progressive Web Application

T> This guide extends on code examples found in the [Output Management](/guides/output-management) guide.

Progressive Web Applications (or PWAs) are web apps that deliver an experience similar to native applications. There are many things that can contribute to that. Of these, the most significant is the ability for an app to be able to function when __offline__. This is achieved through the use of a web technology called [Service Workers](https://developers.google.com/web/fundamentals/primers/service-workers/).

This section will focus on adding an offline experience to our app. We'll achieve this using a Google project called [Workbox](https://github.com/GoogleChrome/workbox) which provides tools that help make offline support for web apps easier to setup.


## We Don't Work Offline Now

So far, we've been viewing the output by going directly to the local file system. Typically though, a real user accesses a web app over a network; their browser talking to a __server__ which will serve up the required assets (e.g. `.html`, `.js`, and `.css` files).

So let's test what the current experience is like using a simple server. Let's use the [http-server](https://www.npmjs.com/package/http-server) package: `npm install http-server --save-dev`. We'll also amend the `scripts` section of our `package.json` to add in a `start` script:

__package.json__

``` diff
{
  ...
  "scripts": {
-    "build": "webpack"
+    "build": "webpack",
+    "start": "http-server dist"
  },
  ...
}
```

If you haven't previously done so, run the command `npm run build` to build your project. Then run the command `npm start`. This should produce the following output:

``` bash
> http-server dist

Starting up http-server, serving dist
Available on:
  http://xx.x.x.x:8080
  http://127.0.0.1:8080
  http://xxx.xxx.x.x:8080
Hit CTRL-C to stop the server
```

If you open your browser to `http://localhost:8080` (i.e. `http://127.0.0.1`) you should see your webpack application being served from the `dist` directory. If you stop the server and refresh, the webpack application is no longer available.  

This is what we aim to change. Once we reach the end of this module we should be able to stop the server, hit refresh and still see our application.


## Adding Workbox

Let's add the Workbox webpack plugin and adjust the `webpack.config.js` file:

``` bash
npm install workbox-webpack-plugin --save-dev
```

__webpack.config.js__

``` diff
  const path = require('path');
  const HtmlWebpackPlugin = require('html-webpack-plugin');
  const CleanWebpackPlugin = require('clean-webpack-plugin');
+ const WorkboxPlugin = require('workbox-webpack-plugin');

  module.exports = {
    entry: {
      app: './src/index.js',
      print: './src/print.js'
    },
    plugins: [
      new CleanWebpackPlugin(['dist']),
      new HtmlWebpackPlugin({
-       title: 'Output Management'
+       title: 'Progressive Web Application'
-     })
+     }),
+     new WorkboxPlugin.GenerateSW({
+       // these options encourage the ServiceWorkers to get in there fast 
+       // and not allow any straggling "old" SWs to hang around
+       clientsClaim: true,
+       skipWaiting: true
+     })
    ],
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist')
    }
  };
```

With that in place, let's see what happens when we do an `npm run build`:

``` bash
...
                  Asset       Size  Chunks                    Chunk Names
          app.bundle.js     545 kB    0, 1  [emitted]  [big]  app
        print.bundle.js    2.74 kB       1  [emitted]         print
             index.html  254 bytes          [emitted]
precache-manifest.b5ca1c555e832d6fbf9462efd29d27eb.js  268 bytes          [emitted]
      service-worker.js       1 kB          [emitted]
...
```

As you can see, we now have 2 extra files being generated; `service-worker.js` and the more verbose `precache-manifest.b5ca1c555e832d6fbf9462efd29d27eb.js`. `service-worker.js` is the Service Worker file and `precache-manifest.b5ca1c555e832d6fbf9462efd29d27eb.js` is a file that `service-worker.js` requires so it can run. Your own generated files will likely be different; but you should have an `service-worker.js` file there.

So we're now at the happy point of having produced a Service Worker. What's next?


## Registering Our Service Worker

Let's allow our Service Worker to come out and play by registering it. We'll do that by adding the registration code below:

__index.js__

``` diff
  import _ from 'lodash';
  import printMe from './print.js';

+ if ('serviceWorker' in navigator) {
+   window.addEventListener('load', () => {
+     navigator.serviceWorker.register('/service-worker.js').then(registration => {
+       console.log('SW registered: ', registration);
+     }).catch(registrationError => {
+       console.log('SW registration failed: ', registrationError);
+     });
+   });
+ }
```

Once more `npm run build` to build a version of the app including the registration code. Then serve it with `npm start`. Navigate to `http://localhost:8080` and take a look at the console. Somewhere in there you should see:

``` bash
SW registered
```

Now to test it. Stop your server and refresh your page. If your browser supports Service Workers then you should still be looking at your application. However, it has been served up by your Service Worker and __not__ by the server.


## Conclusion

You have built an offline app using the Workbox project. You've started the journey of turning your web app into a PWA. You may now want to think about taking things further. A good resource to help you with that can be found [here](https://developers.google.com/web/progressive-web-apps/).


# TypeScript

T> This guide stems from the [_Getting Started_](/guides/getting-started/) guide.

[TypeScript](https://www.typescriptlang.org) is a typed superset of JavaScript that compiles to plain JavaScript. In this guide we will learn how to integrate TypeScript with webpack.


## Basic Setup

First install the TypeScript compiler and loader by running:

``` bash
npm install --save-dev typescript ts-loader
```

Now we'll modify the directory structure & the configuration files:

__project__

``` diff
  webpack-demo
  |- package.json
+ |- tsconfig.json
  |- webpack.config.js
  |- /dist
    |- bundle.js
    |- index.html
  |- /src
    |- index.js
+   |- index.ts
  |- /node_modules
```

__tsconfig.json__

Let's set up a simple configuration to support JSX and compile TypeScript down to ES5...

``` json
{
  "compilerOptions": {
    "outDir": "./dist/",
    "noImplicitAny": true,
    "module": "es6",
    "target": "es5",
    "jsx": "react",
    "allowJs": true
  }
}
```

See [TypeScript's documentation](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html) to learn more about `tsconfig.json` configuration options.

To learn more about webpack configuration, see the [configuration concepts](/concepts/configuration/).

Now let's configure webpack to handle TypeScript:

__webpack.config.js__

``` js
const path = require('path');

module.exports = {
  entry: './src/index.ts',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ]
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  }
};
```

This will direct webpack to _enter_ through `./index.ts`, _load_ all `.ts` and `.tsx` files through the `ts-loader`, and _output_ a `bundle.js` file in our current directory.


## Loader

[`ts-loader`](https://github.com/TypeStrong/ts-loader)

We use `ts-loader` in this guide as it makes enabling additional webpack features, such as importing other web assets, a bit easier.


## Source Maps

To learn more about source maps, see the [development guide](/guides/development).

To enable source maps, we must configure TypeScript to output inline source maps to our compiled JavaScript files. The following line must be added to our TypeScript configuration:

__tsconfig.json__

``` diff
  {
    "compilerOptions": {
      "outDir": "./dist/",
+     "sourceMap": true,
      "noImplicitAny": true,
      "module": "commonjs",
      "target": "es5",
      "jsx": "react",
      "allowJs": true
    }
  }
```

Now we need to tell webpack to extract these source maps and include in our final bundle:

__webpack.config.js__

``` diff
  const path = require('path');

  module.exports = {
    entry: './src/index.ts',
+   devtool: 'inline-source-map',
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: 'ts-loader',
          exclude: /node_modules/
        }
      ]
    },
    resolve: {
      extensions: [ '.tsx', '.ts', '.js' ]
    },
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'dist')
    }
  };
```

See the [devtool documentation](/configuration/devtool/) for more information.


## Using Third Party Libraries

When installing third party libraries from npm, it is important to remember to install the typing definition for that library. These definitions can be found at [TypeSearch](http://microsoft.github.io/TypeSearch/).

For example if we want to install lodash we can run the following command to get the typings for it:

``` bash
npm install --save-dev @types/lodash
```

For more information see [this blog post](https://blogs.msdn.microsoft.com/typescript/2016/06/15/the-future-of-declaration-files/).


## Importing Other Assets

To use non-code assets with TypeScript, we need to defer the type for these imports. This requires a `custom.d.ts` file which signifies custom definitions for TypeScript in our project. Let's set up a declaration for `.svg` files:

__custom.d.ts__

```typescript
declare module "*.svg" {
  const content: any;
  export default content;
}
```

Here we declare a new module for SVGs by specifying any import that ends in `.svg` and defining the module's `content` as `any`. We could be more explicit about it being a url by defining the type as string. The same concept applies to other assets including CSS, SCSS, JSON and more.


## Build Performance

W> This may degrade build performance.

See the [Build Performance](/guides/build-performance/) guide on build tooling.


# Environment Variables

To disambiguate in your `webpack.config.js` between [development](/guides/development) and [production builds](/guides/production) you may use environment variables.

The webpack command line [environment option](/api/cli/#environment-options) `--env` allows you to pass in as many environment variables as you like. Environment variables will be made accessible in your `webpack.config.js`. For example, `--env.production` or `--env.NODE_ENV=local` (`NODE_ENV` is conventionally used to define the environment type, see [here](https://dzone.com/articles/what-you-should-know-about-node-env).)

```bash
webpack --env.NODE_ENV=local --env.production --progress
```

T> Setting up your `env` variable without assignment, `--env.production` sets `--env.production` to `true` by default. There are also other syntaxes that you can use. See the [webpack CLI](/api/cli/#environment-options) documentation for more information.

There is one change that you will have to make to your webpack config. Typically, `module.exports` points to the configuration object. To use the `env` variable, you must convert `module.exports` to a function:

__webpack.config.js__

``` js
const path = require('path');

module.exports = env => {
  // Use env.<YOUR VARIABLE> here:
  console.log('NODE_ENV: ', env.NODE_ENV); // 'local'
  console.log('Production: ', env.production); // true

  return {
    entry: './src/index.js',
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'dist')
    }
  };
};
```


# Build Performance

This guide contains some useful tips for improving build/compilation performance.

---

## General

The following best practices should help, whether you're running build scripts in [development](/guides/development) or [production](/guides/production).


### Stay Up to Date

Use the latest webpack version. We are always making performance improvements. The latest stable version of webpack is:

[![latest webpack version](https://img.shields.io/npm/v/webpack.svg?label=webpack&style=flat-square&maxAge=3600)](https://github.com/webpack/webpack/releases)

Staying up-to-date with __Node.js__  can also help with performance. On top of this, keeping your package manager (e.g. `npm` or `yarn`) up-to-date can also help. Newer versions create more efficient module trees and increase resolving speed.


### Loaders

Apply loaders to the minimal number of modules necessary. Instead of:

```js
module.exports = {
  //...
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader'
      }
    ]
  }
};
```

Use the `include` field to only apply the loader modules that actually need to be transformed by it:

```js
module.exports = {
  //...
  module: {
    rules: [
      {
        test: /\.js$/,
        include: path.resolve(__dirname, 'src'),
        loader: 'babel-loader'
      }
    ]
  }
};
```


### Bootstrap

Each additional loader/plugin has a bootup time. Try to use as few tools as possible.


### Resolving

The following steps can increase resolving speed:

- Minimize the number of items in `resolve.modules`, `resolve.extensions`, `resolve.mainFiles`, `resolve.descriptionFiles`, as they increase the number of filesystem calls.
- Set `resolve.symlinks: false` if you don't use symlinks (e.g. `npm link` or `yarn link`).
- Set `resolve.cacheWithContext: false` if you use custom resolving plugins, that are not context specific.


### Dlls

Use the `DllPlugin` to move code that is changed less often into a separate compilation. This will improve the application's compilation speed, although it does increase complexity of the build process.


### Smaller = Faster

Decrease the total size of the compilation to increase build performance. Try to keep chunks small.

- Use fewer/smaller libraries.
- Use the `CommonsChunkPlugin` in Multi-Page Applications.
- Use the `CommonsChunkPlugin` in `async` mode in Multi-Page Applications.
- Remove unused code.
- Only compile the part of the code you are currently developing on.


### Worker Pool

The `thread-loader` can be used to offload expensive loaders to a worker pool.

W> Don't use too many workers, as there is a boot overhead for the Node.js runtime and the loader. Minimize the module transfers between worker and main process. IPC is expensive.


### Persistent cache

Enable persistent caching with the `cache-loader`. Clear cache directory on `"postinstall"` in `package.json`.


### Custom plugins/loaders

Profile them to not introduce a performance problem here.

---


## Development

The following steps are especially useful in _development_.


### Incremental Builds

Use webpack's watch mode. Don't use other tools to watch your files and invoke webpack. The built-in watch mode will keep track of timestamps and passes this information to the compilation for cache invalidation.

In some setups, watching falls back to polling mode. With many watched files, this can cause a lot of CPU load. In these cases, you can increase the polling interval with `watchOptions.poll`.


### Compile in Memory

The following utilities improve performance by compiling and serving assets in memory rather than writing to disk:

- `webpack-dev-server`
- `webpack-hot-middleware`
- `webpack-dev-middleware`

### stats.toJson speed

webpack 4 outputs a large amount of data with its `stats.toJson()` by default. Avoid retrieving portions of the `stats` object unless necessary in the incremental step. `webpack-dev-server` after v3.1.3 contained a substantial performance fix to minimize the amount of data retrieved from the `stats` object per incremental build step.

### Devtool

Be aware of the performance differences of the different `devtool` settings.

- `"eval"` has the best performance, but doesn't assist you for transpiled code.
- The `cheap-source-map` variants are more performant, if you can live with the slightly worse mapping quality.
- Use a `eval-source-map` variant for incremental builds.

=> In most cases, `cheap-module-eval-source-map` is the best option.


### Avoid Production Specific Tooling

Certain utilities, plugins, and loaders only make sense when building for production. For example, it usually doesn't make sense to minify and mangle your code with the `TerserPlugin` while in development. These tools should typically be excluded in development:

- `TerserPlugin`
- `ExtractTextPlugin`
- `[hash]`/`[chunkhash]`
- `AggressiveSplittingPlugin`
- `AggressiveMergingPlugin`
- `ModuleConcatenationPlugin`


### Minimal Entry Chunk

webpack only emits updated chunks to the filesystem. For some configuration options, (HMR, `[name]`/`[chunkhash]` in `output.chunkFilename`, `[hash]`) the entry chunk is invalidated in addition to the changed chunks.

Make sure the entry chunk is cheap to emit by keeping it small. The following code block extracts a chunk containing only the runtime with _all other chunks as children_:

```js
new CommonsChunkPlugin({
  name: 'manifest',
  minChunks: Infinity
});
```

### Avoid Extra Optimization Steps

webpack does extra algorithmic work to optimize the output for size and load performance. These optimizations are performant for smaller codebases, but can be costly in larger ones:

```js
module.exports = {
  // ...
  optimization: {
    removeAvailableModules: false,
    removeEmptyChunks: false,
    splitChunks: false,
  }
};
```

### Output Without Path Info

webpack has the ability to generate path info in the output bundle. However, this puts garbage collection pressure on projects that bundle thousands of modules. Turn this off in the `options.output.pathinfo` setting:

```js
module.exports = {
  // ...
  output: {
    pathinfo: false
  }
};
```

### Node.js Version

There has been a [performance regression](https://github.com/nodejs/node/issues/19769) in the latest stable versions of Node.js and its ES2015 `Map` and `Set` implementations. A fix has been merged into master, but a release has yet to be made. In the meantime, to get the most out of incremental build speeds, try to stick with version 8.9.x (the problem exists between 8.9.10 - 9.11.1). webpack has moved to using those ES2015 data structures liberally, and it will improve the initial build times as well.

### TypeScript Loader

Recently, `ts-loader` has started to consume the internal TypeScript watch mode APIs which dramatically decreases the number of modules to be rebuilt on each iteration. This `experimentalWatchApi` shares the same logic as the normal TypeScript watch mode itself and is quite stable for development use. Turn on `transpileOnly`, as well, for even faster incremental builds.

```js
module.exports = {
  // ...
  test: /\.tsx?$/,
  use: [
    {
      loader: 'ts-loader',
      options: {
        transpileOnly: true,
        experimentalWatchApi: true,
      },
    },
  ],
};
```

Note: the `ts-loader` documentation suggests the use of `cache-loader`, but this actually slows the incremental builds down with disk writes.

To gain typechecking again, use the [`ForkTsCheckerWebpackPlugin`](https://www.npmjs.com/package/fork-ts-checker-webpack-plugin).

There is a [full example](https://github.com/TypeStrong/ts-loader/tree/master/examples/fast-incremental-builds) on the ts-loader github repository.

---


## Production

The following steps are especially useful in _production_.

W> __Don't sacrifice the quality of your application for small performance gains!__ Keep in mind that optimization quality is, in most cases, more important than build performance.


### Multiple Compilations

When using multiple compilations, the following tools can help:

- [`parallel-webpack`](https://github.com/trivago/parallel-webpack): It allows for compilation in a worker pool.
- `cache-loader`: The cache can be shared between multiple compilations.


### Source Maps

Source maps are really expensive. Do you really need them?

---


## Specific Tooling Issues

The following tools have certain problems that can degrade build performance:


### Babel

- Minimize the number of preset/plugins


### TypeScript

- Use the `fork-ts-checker-webpack-plugin` for typechecking in a separate process.
- Configure loaders to skip typechecking.
- Use the `ts-loader` in `happyPackMode: true` / `transpileOnly: true`.


### Sass

- `node-sass` has a bug which blocks threads from the Node.js thread pool. When using it with the `thread-loader` set `workerParallelJobs: 2`.


# Content Security Policies

Webpack is capable of adding `nonce` to all scripts that it loads. To activate the feature set a `__webpack_nonce__` variable needs to be included in your entry script. A unique hash based nonce should be generated and provided for each unique page view this is why `__webpack_nonce__` is specified in the entry file and not in the configuration. Please note that `nonce` should always be a base64-encoded string.


## Examples

In the entry file:

``` js
// ...
__webpack_nonce__ = 'c29tZSBjb29sIHN0cmluZyB3aWxsIHBvcCB1cCAxMjM=';
// ...
```


## Enabling CSP

Please note that CSPs are not enabled by default. A corresponding header `Content-Security-Policy` or meta tag `<meta http-equiv="Content-Security-Policy" ...>` needs to be sent with the document to instruct the browser to enable the CSP. Here's an example of what a CSP header including a CDN white-listed URL might look like:

``` http
Content-Security-Policy: default-src 'self'; script-src 'self' https://trusted.cdn.com;
```

For more information on CSP and `nonce` attribute, please refer to __Further Reading__ section at the bottom of this page.


# Development - Vagrant

If you have a more advanced project and use [Vagrant](https://www.vagrantup.com/) to run your development environment in a Virtual Machine, you'll often want to also run webpack in the VM.

## Configuring the Project

To start, make sure that the `Vagrantfile` has a static IP;

```ruby
Vagrant.configure("2") do |config|
  config.vm.network :private_network, ip: "10.10.10.61"
end
```

Next, install webpack and webpack-dev-server in your project;

```bash
npm install --save-dev webpack webpack-dev-server
```

Make sure to have a `webpack.config.js` file. If you haven't already, use this as a minimal example to get started:

```js
module.exports = {
  context: __dirname,
  entry: './app.js'
};
```

And create a `index.html` file. The script tag should point to your bundle. If `output.filename` is not specified in the config, this will be `bundle.js`.

```html
<!doctype html>
<html>
  <head>
    <script src="/bundle.js" charset="utf-8"></script>
  </head>
  <body>
    <h2>Heey!</h2>
  </body>
</html>
```

Note that you also need to create an `app.js` file.

## Running the Server

Now, let's run the server:

```bash
webpack-dev-server --host 0.0.0.0 --public 10.10.10.61:8080 --watch-poll
```

By default the server will only be accessible from localhost. We'll be accessing it from our host PC, so we need to change `--host` to allow this.

webpack-dev-server will include a script in your bundle that connects to a WebSocket to reload when a change in any of your files occurs.
The `--public` flag makes sure the script knows where to look for the WebSocket. The server will use port `8080` by default, so we should also specify that here.

`--watch-poll` makes sure that webpack can detect changes in your files. By default webpack listens to events triggered by the filesystem, but VirtualBox has many problems with this.

The server should be accessible on `http://10.10.10.61:8080` now. If you make a change in `app.js`, it should live reload.

## Advanced Usage with nginx

To mimic a more production-like environment, it is also possible to proxy the webpack-dev-server with nginx.

In your nginx config file, add the following:

```nginx
server {
  location / {
    proxy_pass http://127.0.0.1:8080;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection "upgrade";
    error_page 502 @start-webpack-dev-server;
  }

  location @start-webpack-dev-server {
    default_type text/plain;
    return 502 "Please start the webpack-dev-server first.";
  }
}
```

The `proxy_set_header` lines are important, because they allow the WebSockets to work correctly.

The command to start webpack-dev-server can then be changed to this:

```bash
webpack-dev-server --public 10.10.10.61 --watch-poll
```

This makes the server only accessible on `127.0.0.1`, which is fine, because nginx takes care of making it available on your host PC.

## Conclusion

We made the Vagrant box accessible from a static IP, and then made webpack-dev-server publicly accessible so it is reachable from a browser. We then tackled a common problem that VirtualBox doesn't send out filesystem events, causing the server to not reload on file changes.


# Dependency Management

> es6 modules

> commonjs

> amd


## require with expression

A context is created if your request contains expressions, so the __exact__ module is not known on compile time.

Example:

```javascript
require('./template/' + name + '.ejs');
```

webpack parses the `require()` call and extracts some information:

```code
Directory: ./template
Regular expression: /^.*\.ejs$/
```

__context module__

A context module is generated. It contains references to __all modules in that directory__ that can be required with a request matching the regular expression. The context module contains a map which translates requests to module ids.

Example:

```json
{
  "./table.ejs": 42,
  "./table-row.ejs": 43,
  "./directory/folder.ejs": 44
}
```

The context module also contains some runtime logic to access the map.

This means dynamic requires are supported but will cause all possible modules to be included in the bundle.


## `require.context`

You can create your own context with the `require.context()` function.

It allows you to pass in a directory to search, a flag indicating whether subdirectories should be searched
too, and a regular expression to match files against.

webpack parses for `require.context()` in the code while building.

The syntax is as follows:

```javascript
require.context(directory, useSubdirectories = false, regExp = /^\.\//);
```

Examples:

```javascript
require.context('./test', false, /\.test\.js$/);
// a context with files from the test directory that can be required with a request endings with `.test.js`.
```

```javascript
require.context('../', true, /\.stories\.js$/);
// a context with all files in the parent folder and descending folders ending with `.stories.js`.
```

W> The arguments passed to `require.context` must be literals!


### context module API

A context module exports a (require) function that takes one argument: the request.

The exported function has 3 properties: `resolve`, `keys`, `id`.

- `resolve` is a function and returns the module id of the parsed request.
- `keys` is a function that returns an array of all possible requests that the context module can handle.

This can be useful if you want to require all files in a directory or matching a pattern, Example:

```javascript
function importAll (r) {
  r.keys().forEach(r);
}

importAll(require.context('../components/', true, /\.js$/));
```

```javascript
var cache = {};

function importAll (r) {
  r.keys().forEach(key => cache[key] = r(key));
}

importAll(require.context('../components/', true, /\.js$/));
// At build-time cache will be populated with all required modules.
```

- `id` is the module id of the context module. This may be useful for `module.hot.accept`.


# Public Path

The `publicPath` configuration option can be quite useful in a variety of scenarios. It allows you to specify the base path for all the assets within your application.


## Use Cases

There are a few use cases in real applications where this feature becomes especially neat. Essentially, every file emitted to your `output.path` directory will be referenced from the `output.publicPath` location. This includes child chunks (created via [code splitting](/guides/code-splitting/)) and any other assets (e.g. images, fonts, etc.) that are a part of your dependency graph.

### Environment Based

In development for example, we might have an `assets/` folder that lives on the same level of our index page. This is fine, but what if we wanted to host all these static assets on a CDN in production?

To approach this problem you can easily use a good old environment variable. Let's say we have a variable `ASSET_PATH`:

``` js
import webpack from 'webpack';

// Try the environment variable, otherwise use root
const ASSET_PATH = process.env.ASSET_PATH || '/';

export default {
  output: {
    publicPath: ASSET_PATH
  },

  plugins: [
    // This makes it possible for us to safely use env vars on our code
    new webpack.DefinePlugin({
      'process.env.ASSET_PATH': JSON.stringify(ASSET_PATH)
    })
  ]
};
```

### On The Fly

Another possible use case is to set the `publicPath` on the fly. webpack exposes a global variable called `__webpack_public_path__` that allows you to do that. So, in your application's entry point, you can simply do this:

```js
__webpack_public_path__ = process.env.ASSET_PATH;
```

That's all you need. Since we're already using the `DefinePlugin` on our
configuration, `process.env.ASSET_PATH` will always be defined so we can safely
do that.

W> Be aware that if you use ES6 module imports in your entry file the `__webpack_public_path__` assignment will be done after the imports. In such cases, you'll have to move the public path assignment to its own dedicated module and then import it on top of your entry.js:

```js
// entry.js
import './public-path';
import './app';
```


# Integrations

Let's start by clearing up a common misconception. webpack is a module bundler like [Browserify](http://browserify.org/) or [Brunch](http://brunch.io/). It is _not a task runner_ like [Make](https://www.gnu.org/software/make/), [Grunt](https://gruntjs.com/), or [Gulp](https://gulpjs.com/). Task runners handle automation of common development tasks such as linting, building, or testing your project. Compared to bundlers, task runners have a higher level focus. You can still benefit from their higher level tooling while leaving the problem of bundling to webpack.

Bundlers help you get your JavaScript and stylesheets ready for deployment, transforming them into a format that's suitable for the browser. For example, JavaScript can be [minified](/plugins/terser-webpack-plugin) or [split into chunks](/guides/code-splitting) and [lazy-loaded](/guides/lazy-loading) to improve performance. Bundling is one of the most important challenges in web development, and solving it well can remove a lot of pain from the process.

The good news is that, while there is some overlap, task runners and bundlers can play well together if approached in the right way. This guide provides a high-level overview of how webpack can be integrated into some of the more popular task runners.


## NPM Scripts

Often webpack users use npm [`scripts`](https://docs.npmjs.com/misc/scripts) as their task runner. This is a good starting point. Cross-platform support can become a problem, but there are several workarounds for that. Many, if not most users, get by with simple npm `scripts` and various levels of webpack configuration and tooling.

So while webpack's core focus is bundling, there are a variety of extensions that can enable you to use it for jobs typical of a task runner. Integrating a separate tool adds complexity, so be sure to weigh the pros and cons before going forward.


## Grunt

For those using Grunt, we recommend the [`grunt-webpack`](https://www.npmjs.com/package/grunt-webpack) package. With `grunt-webpack` you can run webpack or [webpack-dev-server](https://github.com/webpack/webpack-dev-server) as a task, get access to stats within [template tags](https://gruntjs.com/api/grunt.template), split development and production configurations and more. Start by installing `grunt-webpack` as well as `webpack` itself if you haven't already:

``` bash
npm install --save-dev grunt-webpack webpack
```

Then register a configuration and load the task:

__Gruntfile.js__

``` js
const webpackConfig = require('./webpack.config.js');

module.exports = function(grunt) {
  grunt.initConfig({
    webpack: {
      options: {
        stats: !process.env.NODE_ENV || process.env.NODE_ENV === 'development'
      },
      prod: webpackConfig,
      dev: Object.assign({ watch: true }, webpackConfig)
    }
  });

  grunt.loadNpmTasks('grunt-webpack');
};
```

For more information, please visit the [repository](https://github.com/webpack-contrib/grunt-webpack).


## Gulp

Gulp is also a fairly straightforward integration with the help of the [`webpack-stream`](https://github.com/shama/webpack-stream) package (a.k.a. `gulp-webpack`). In this case, it is unnecessary to install `webpack` separately as it is a direct dependency of `webpack-stream`:

``` bash
npm install --save-dev webpack-stream
```

Just `require('webpack-stream')` instead of `webpack` and optionally pass it an configuration:

__gulpfile.js__

``` js
var gulp = require('gulp');
var webpack = require('webpack-stream');
gulp.task('default', function() {
  return gulp.src('src/entry.js')
    .pipe(webpack({
      // Any configuration options...
    }))
    .pipe(gulp.dest('dist/'));
});
```

For more information, please visit the [repository](https://github.com/shama/webpack-stream).


## Mocha

The [`mocha-webpack`](https://github.com/zinserjan/mocha-webpack) utility can be used for a clean integration with Mocha. The repository offers more details on the pros and cons but essentially `mocha-webpack` is a simple wrapper that provides almost the same CLI as Mocha itself and provides various webpack functionality like an improved watch mode and improved path resolution. Here is a small example of how you would install it and use it to run a test suite (found within `./test`):

``` bash
npm install --save-dev webpack mocha mocha-webpack
mocha-webpack 'test/**/*.js'
```

For more information, please visit the [repository](https://github.com/zinserjan/mocha-webpack).


## Karma

The [`karma-webpack`](https://github.com/webpack-contrib/karma-webpack) package allows you to use webpack to pre-process files in [Karma](http://karma-runner.github.io/1.0/index.html). It also makes use of [`webpack-dev-middleware`](https://github.com/webpack/webpack-dev-middleware) and allows passing configurations for both. A simple example may look something like this:

``` bash
npm install --save-dev webpack karma karma-webpack
```

__karma.conf.js__

``` js
module.exports = function(config) {
  config.set({
    files: [
      { pattern: 'test/*_test.js', watched: false },
      { pattern: 'test/**/*_test.js', watched: false }
    ],
    preprocessors: {
      'test/*_test.js': [ 'webpack' ],
      'test/**/*_test.js': [ 'webpack' ]
    },
    webpack: {
      // Any custom webpack configuration...
    },
    webpackMiddleware: {
      // Any custom webpack-dev-middleware configuration...
    }
  });
};
```

For more information, please visit the [repository](https://github.com/webpack-contrib/karma-webpack).
