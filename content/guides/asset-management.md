---
title: Asset Management
sort: 3
contributors:
  - skipjack
  - michael-ciniawsky
  - TheDutchCoder
---

If you've been following the guides fromt he start, you will now have a small project that shows "Hello webpack", but it would be nice to make it a little more complex by adding a couple of different assets and see how webpack handles these.

Prior to webpack, front-end developers would use tools like grunt and gulp to process these assets and move them from their `/src` folder into their `/dist` or `/build` directory. The same idea was used for JavaScript modules, but tools like webpack will __dynamically bundle__ all dependencies (creating what's known as a [dependency graph](/concepts/dependency-graph)). This is great because every module now _explicitly states its dependencies_ and we'll avoid bundling modules that aren't in use. Even better: assets that are never used, will also never get processed and put in the `dist` folder, great for saving some bytes of data in your distribution!

One of the coolest webpack features is that you can also _include any other type of file_, besides JavaScript, for which there is a loader. This means that the same benefits listed above for JavaScript (e.g. explicit dependencies) can be applied to everything used in building a website or web app. Let's start with CSS, as you may already be familiar with that setup.


## Loading CSS

In order to `import` a CSS file from within a JavaScript module, you need to install and add the [style-loader](/loaders/style-loader) and [css-loader](/loaders/css-loader) to your [`module` configuration](/configuration/module):

``` bash
npm install --save-dev style-loader css-loader
```

Now open your `weback.config.js` file that we created earlier and adjust it so that we can tell webpack to also handle our CSS files.

__webpack.config.js__

```diff
var path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
+ module: {
+   rules: [
+     {
+       test: /\.css$/,
+       use: [
+         'style-loader',
+         'css-loader'
+       ]
+     }
+   ]
+ }
};
```

T> webpack uses a regular expression to determine which files it should look for and serve to a specific loader. In this case any file that ends with `.css` will be served to the `style-loader` and the `css-loader`.

This enables you to `import './style.css'` into the file that depends on that styling. Now, when that module is run, a `<style>` tag with the stringified css will be inserted into the `<head>` of your html file.

Let's try it out by adding a new `style.css` file to our project and import it in our `index.js`:

```diff
 |- package.json
 |- webpack.config.js
 |- dist
   |- bundle.js
   |- index.html
 |- /src
+  |- style.css
   |- index.js
 |- /node_modules

```

__src/style.css__

```css
.hello {
  color: red;
}
```

__src/index.js__

```dif
import _ from 'lodash';
+ import './style.css'

function component () {
  var element = document.createElement('div');

  // Lodash, currently included via a script, is required for this line to work
  element.innerHTML = _.join(['Hello', 'webpack'], ' ');
+   element.classList.add('hello');

  return element;
}

document.body.appendChild(component());
```

Now run your build command:

```bash
npm run build

Hash: 9a3abfc96300ef87880f
Version: webpack 2.6.1
Time: 834ms
    Asset    Size  Chunks                    Chunk Names
bundle.js  560 kB       0  [emitted]  [big]  main
   [0] ./~/lodash/lodash.js 540 kB {0} [built]
   [1] ./src/style.css 1 kB {0} [built]
   [2] ./~/css-loader!./src/style.css 191 bytes {0} [built]
   [3] ./~/css-loader/lib/css-base.js 2.26 kB {0} [built]
   [4] ./~/style-loader/lib/addStyles.js 8.7 kB {0} [built]
   [5] ./~/style-loader/lib/urls.js 3.01 kB {0} [built]
   [6] (webpack)/buildin/global.js 509 bytes {0} [built]
   [7] (webpack)/buildin/module.js 517 bytes {0} [built]
   [8] ./src/index.js 351 bytes {0} [built]
```

Open up `index.html` in your browser again and you should see that `Hello webpack` is now styled in red. If you want to see what webpack did, inspect the page (don't view the page source, as it won't show you the result) and look at the page's head tags. It should contain our style block that we imported in `index.js`:

```html
<html>
  <head>
    <title>webpack 2 demo</title>
    <style type="text/css">
    .hello {
      color: red;
    }
    </style>
  </head>
  <body>
    <script src="./bundle.js"></script>
    <div class="hello">Hello webpack</div>
  </body>
</html>
```

T> Note that you can also [split your CSS](/guides/code-splitting-css) for better load times in production. On top of that, loaders exist for pretty much any flavor of CSS you can think of -- [postcss](/loaders/postcss-loader), [sass](/loaders/sass-loader), and [less](/loaders/less-loader) to name a few.


## Loading Images

So now we're pulling in our CSS, but what about our images like backgrounds and icons? Using the [file-loader](/loaders/file-loader) we can easily incorporate those in our system as well:

``` bash
npm install --save-dev file-loader
```

__webpack.config.js__

```diff
var path = require('path');

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
      }
+      {
+        test: /\.(png|svg|jpg|gif)$/,
+        use: [
+          'file-loader'
+        ]
+      }
    ]
  }
};

```

Now, when you `import someImage from './my-image.png'`, that image will be processed and added to your `output` directory _and_ the `someImage` variable will contain the final url of that image after processing. When using the [css-loader](/loaders/css-loader), as shown above, a similar process will occur for `url('./my-image.png')` within your CSS. The loader will recognize this is a local file, and replace the `'./my-image.png'` path with the final path to the image in your `output` directory. The [html-loader](/loaders/html-loader) handles `<img src="./my-image.png" />` in the same manner.

Let's add an image to our project and see how this works, you can use any image you like:

```diff
 |- package.json
 |- webpack.config.js
 |- dist
   |- bundle.js
   |- index.html
 |- /src
+   |- icon.png
   |- style.css
   |- index.js
 |- /node_modules
```

__src/index.js__

```diff
import _ from 'lodash';
import './style.css'
+ import Icon from './icon.png'

function component () {
  var element = document.createElement('div');

  // Lodash, currently included via a script, is required for this line to work
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

```diff
.hello {
  color: red;
+   background: url('./icon.png');
}
```

Let's create a new build and open up the index.html file again:

```bash
npm run build

Hash: 854865050ea3c1c7f237
Version: webpack 2.6.1
Time: 895ms
                               Asset     Size  Chunks                    Chunk Names
5c999da72346a995e7e2718865d019c8.png  11.3 kB          [emitted]
                           bundle.js   561 kB       0  [emitted]  [big]  main
   [0] ./src/icon.png 82 bytes {0} [built]
   [1] ./~/lodash/lodash.js 540 kB {0} [built]
   [2] ./src/style.css 1 kB {0} [built]
   [3] ./~/css-loader!./src/style.css 242 bytes {0} [built]
   [4] ./~/css-loader/lib/css-base.js 2.26 kB {0} [built]
   [5] ./~/style-loader/lib/addStyles.js 8.7 kB {0} [built]
   [6] ./~/style-loader/lib/urls.js 3.01 kB {0} [built]
   [7] (webpack)/buildin/global.js 509 bytes {0} [built]
   [8] (webpack)/buildin/module.js 517 bytes {0} [built]
   [9] ./src/index.js 503 bytes {0} [built]
```

If all went well, you should now see your icon as a repeating background, as well as an `img` element behind our `Hello webpack` text. If you inspect this element, you'll see that actual filename has changed to something like `5c999da72346a995e7e2718865d019c8.png`. This means webpack found our file in the `src` folder and processed it!

T> A logical next step from here is minifying and optimizing your images. Check out the [image-webpack-loader](https://github.com/tcoopman/image-webpack-loader) and [url-loader](/loaders/url-loader) for more on how you can enhance your image loading process.


## Loading Fonts

So what about other assets like fonts? The file and url loaders will take any file you load through them and output it to your build directory. This means we can use them for any kind of file, including fonts. Let's adjust our `webpack.config.js` file to instruct it to handle font files:

__webpack.config.js__

```diff
var path = require('path');

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

```diff
 |- package.json
 |- webpack.config.js
 |- dist
   |- bundle.js
   |- index.html
 |- /src
+   |- MyFont.woff
+   |- MyFont.woff2
   |- icon.png
   |- style.css
   |- index.js
 |- /node_modules
```

With the loader configured and the fonts in place, you can use the fonts in `@font-face` declarations like you're used to. webpack will automatically serve these files to the loader, just like it did with the images:

__src/style.css__

```diff
+ @font-face {
+   font-family: 'MyFont';
+   src:  url('./MyFont.woff2') format('woff2'),
+         url('./MyFont.woff') format('woff');
+   font-weight: 600;
+   font-style: normal;
}

.hello {
  color: red;
+   font-family: 'MyFont';
  background: url('./icon.png');
}

```

Now run a new build and let's see if webpack handled our fonts:

```bash
npm run build

Hash: b4aef94169088c79ed1c
Version: webpack 2.6.1
Time: 775ms
                                Asset     Size  Chunks                    Chunk Names
 5c999da72346a995e7e2718865d019c8.png  11.3 kB          [emitted]
11aebbbd407bcc3ab1e914ca0238d24d.woff   221 kB          [emitted]
                            bundle.js   561 kB       0  [emitted]  [big]  main
   [0] ./src/icon.png 82 bytes {0} [built]
   [1] ./~/lodash/lodash.js 540 kB {0} [built]
   [2] ./src/style.css 1 kB {0} [built]
   [3] ./~/css-loader!./src/style.css 420 bytes {0} [built]
   [4] ./~/css-loader/lib/css-base.js 2.26 kB {0} [built]
   [5] ./src/MyFont.woff 83 bytes {0} [built]
   [6] ./~/style-loader/lib/addStyles.js 8.7 kB {0} [built]
   [7] ./~/style-loader/lib/urls.js 3.01 kB {0} [built]
   [8] (webpack)/buildin/global.js 509 bytes {0} [built]
   [9] (webpack)/buildin/module.js 517 bytes {0} [built]
  [10] ./src/index.js 503 bytes {0} [built]
```

Open up `index.html` again and see if our `Hello webpack` text has changed to the new font. If all is well, you should see the changes. Awesome! This is really starting to come together now, isn't it?


## Loading Data

Another useful asset that can be loaded is data, like JSON files, CSVs, TSVs, and XML. Support for JSON is actually built-in, similar to NodeJS, meaning `import MyData from './data.json'` will work by default. To import CSVs, TSVs, and XML you could use the [csv-loader](https://github.com/theplatapi/csv-loader) and [xml-loader](https://github.com/gisikw/xml-loader). Let's handle loading all three:

``` bash
npm install --save-dev csv-loader xml-loader
```

__webpack.config.js__

```diff
var path = require('path');

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

```diff
 |- package.json
 |- webpack.config.js
 |- dist
   |- bundle.js
   |- index.html
 |- /src
+   |- data.xml 
   |- MyFont.woff
   |- MyFont.woff2
   |- icon.png
   |- style.css
   |- index.js
 |- /node_modules
```

__src/data.xml__

```xml
<?xml version="1.0" encoding="UTF-8"?>
<note>
  <to>Mary</to>
  <from>John</from>
  <heading>Reminder</heading>
  <body>Call Cindy on Tuesday</body>
</note>
```

Now you can `import` any one of those four types of data (JSON, CSV, TSV, XML) and the `MyData` variable you import it to will contain parsed JSON for easy consumption:

__src/index.js__

```diff
import _ from 'lodash';
import './style.css'
import Icon from './icon.png'
+ import MyData from './data.xml'

function component () {
  var element = document.createElement('div');

  // Lodash, currently included via a script, is required for this line to work
  element.innerHTML = _.join(['Hello', 'webpack'], ' ');
  element.classList.add('hello');

  // Add the image to our existing div.
  var myIcon = new Image();
  myIcon.src = Icon;

  element.appendChild(myIcon);

+   console.log(MyData);

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

```diff
 |- package.json
 |- webpack.config.js
 |- dist
   |- bundle.js
   |- index.html
 |- /src
-   |- data.xml 
-   |- MyFont.woff
-   |- MyFont.woff2
-   |- icon.png
-   |- style.css
   |- index.js
 |- /node_modules
```

__webpack.config.js__

```diff
var path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
-  module: {
-    rules: [
-      {
-        test: /\.css$/,
-        use: [
-          'style-loader',
-          'css-loader'
-        ]
-      },
-      {
-        test: /\.(png|svg|jpg|gif)$/,
-        use: [
-          'file-loader'
-        ]
-      },
-      {
-        test: /\.(woff|woff2|eot|ttf|otf)$/,
-        use: [
-          'file-loader'
-        ]
-      },
-      {
-        test: /\.(csv|tsv)$/,
-        use: [
-          'csv-loader'
-        ]
-      },
-      {
-        test: /\.xml$/,
-        use: [
-          'xml-loader'
-        ]
-      }
-    ]
-  }
};

```

__src/index.js__

```diff
import _ from 'lodash';
import './style.css'
import Icon from './icon.png'
import MyData from './data.xml'

function component () {
  var element = document.createElement('div');
-
-  // Lodash, currently included via a script, is required for this line to work
-  element.innerHTML = _.join(['Hello', 'webpack'], ' ');
-  element.classList.add('hello');
-
-  // Add the image to our existing div.
-  var myIcon = new Image();
-  myIcon.src = Icon;
-
-  element.appendChild(myIcon);
-
-  console.log(MyData);
+  element.innerHTML = 'Hello webpack'

  return element;
}

document.body.appendChild(component());
```


## Next guide
Let's move on to [Output Management](https://webpack.js.org/guides/output-management/)


## Further Reading

- [Loading Fonts](https://survivejs.com/webpack/loading/fonts/) on SurviveJS
