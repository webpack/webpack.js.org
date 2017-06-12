---
title: Asset Management
sort: 3
contributors:
  - skipjack
  - michael-ciniawsky
---

So you're all set up with webpack -- transforming and linting your JavaScript modules, generating an html file with the [`HTMLWebpackPlugin`](/plugins/html-webpack-plugin), and even loading some css through your JavaScript modules with the [css-loader](/loaders/css-loader). But wait, your site requires a whole bunch of other assets like images (e.g. `.png`, `.jpg`, `.svg`), fonts (e.g. `.woff`, `.woff2`, `.eot`), and data (e.g. `.json`, `.xml`, `.csv`)!

Prior to webpack, front-end developers would use tools like grunt and gulp to process these "web assets" and move them from their `/src` folder into their `/dist` or `/build` directory. The same idea was used for JavaScript modules, but, as you likely already know, tools like webpack will now "enter" your application and __dynamically bundle__ all dependencies (creating what's known as a [dependency graph](/concepts/dependency-graph)). This is great because every module now _explicitly states its dependencies_ and we'll avoid bundling modules that aren't in use.

One of the coolest webpack features is that you can also _include any other type of file_, besides JavaScript, for which there is a loader. This means that the same benefits listed above for JavaScript (e.g. explicit dependencies) can be applied to everything used in building a website or web app. Let's start with CSS, as you may already be familiar with that setup...


## Loading CSS

In order to `import` a CSS file from within a JavaScript module, you simply need to install and add the [style-loader](/loaders/style-loader) and [css-loader](/loaders/css-loader) to your [`module` configuration](/configuration/module)...

``` bash
npm install --save-dev style-loader css-loader
```

__webpack.config.js__

``` js
module.exports = {
  //...
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      }
    ]
  },
  //...
}
```

This enables you to `import './style.css'` into the file that depends on that styling. Now, when that module is run, a `<style>` tag with the stringified css will be inserted into the `<head>` of your html file.

T> Note that you can also [split your CSS](/guides/code-splitting-css) for better load times in production. On top of that, loaders exist for pretty much any flavor of CSS you can think of -- [postcss](/loaders/postcss-loader), [sass](/loaders/sass-loader), and [less](/loaders/less-loader) to name a few.


## Loading Images

So now we're pulling in our CSS, but what about our backgrounds and icons? Using the [file-loader](/loaders/file-loader) we can easily incorporate those in our system as well:

``` bash
npm install --save-dev file-loader
```

__webpack.config.js__

``` js
module.exports = {
  //...
  module: {
    rules: [
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          'file-loader'
        ]
      }
    ]
  },
  //...
}
```

Now, when you `import Image from './my-image.png'`, that image will be processed and added to your `output` directory _and_ the `Image` variable will contain the final url of that image after processing. When using the [css-loader](/loaders/css-loader), as shown above, a similar process will occur for `url('./my-image.png')` within your CSS. The loader will recognize this is a local file, and replace the `'./my-image.png'` path with the final path to the image in your `output` directory. The [html-loader](/loaders/html-loader) handles `<img src="./my-image.png" />` in the same manner.

T> The next step is minifying and optimizing your images. Check out the [image-webpack-loader](https://github.com/tcoopman/image-webpack-loader) and [url-loader](/loaders/url-loader) for more on how you can enhance your image loading process.


## Loading Fonts

So what about other assets like fonts? The file and url loaders will take any file you load through them and output it to your build directory. This means we can use them for any kind of file, including fonts:

__webpack.config.js__

``` js
module.exports = {
  //...
  module: {
    rules: [
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          'file-loader'
        ]
      }
    ]
  },
  //...
}
```

With this in place you can define a font like so...

``` css
@font-face {
  font-family: 'MyFont';
  src:  url('./font.woff2') format('woff2'),
        url('./font.woff') format('woff');
  font-weight: 600;
  font-style: normal;
}
```

and the relative paths (e.g. `'./font.woff2'`) will be replaced with the final path/filename in your build directory.


## Loading Data

Another useful asset that can be loaded is data, like JSON files, CSVs, TSVs, and XML. Support for JSON is actually built-in, similar to NodeJS, meaning `import Data from './data.json'` will work by default. To import CSVs, TSVs, and XML you could use the [csv-loader](https://github.com/theplatapi/csv-loader) and [xml-loader](https://github.com/gisikw/xml-loader). Let's handle loading all three:

``` bash
npm install --save-dev csv-loader xml-loader
```

__webpack.config.js__

``` js
module.exports = {
  //...
  module: {
    rules: [
      {
        test: /\.(csv|tsv)$/,
        use: 'csv-loader'
      },
      {
        test: /\.xml$/,
        use: 'xml-loader',
      }
    ]
  },
  //...
}
```

Now you can `import` any one of those four types of data (JSON, CSV, TSV, XML) and the `Data` variable you import it to will contain parsed JSON for easy consumption:

``` js
import Data from './data.csv'

Data.forEach((row, index) => {
  console.log(`Row ${index}: `, row)
})
```

T> This can be especially helpful when implementing some sort of data visualization using a tool like [d3](https://github.com/d3). Instead of making an ajax request and parsing the data at runtime you can load it into your module during the build process so that the parsed data is ready to go as soon as the module hits the browser.


## Global Assets

The coolest part of everything mentioned above, is that loading assets this way allows you to group modules and assets together in a more intuitive way. Instead of relying on a global `/assets` directory that contains everything, you can group assets with the code that uses them:

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


## Further Reading

- [Loading Fonts](https://survivejs.com/webpack/loading/fonts/) on SurviveJS
