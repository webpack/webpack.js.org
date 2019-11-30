---
title: Asset Modules
contributors:
  - smelukov
---

Asset Modules - is a special type of modules that allows to use assets file (fonts, icons, etc) out of the box

Prior webpack 5 the frontend-developers was using:

- [`raw-loader`](/loaders/raw-loader) to import any file as a string
- [`url-loader`](/loaders/url-loader) to inline any file into the bundle as a data-url resource
- [`file-loader`](/loaders/file-loader) to emit any file into the output directory

Asset Modules feature replaces all of these loaders by adding 4 new module types:

- `asset/resource` emits a separate file and exports the URL (like `url-loader`)
- `asset/inline` exports a data-url of the asset (like `url-loader`)
- `asset/source` exports the source code of the asset (like `raw-loader`)
- `asset` automatically chooses between data-url and separate file (like `url-loader` with limit)

> For now, this feature available only with `experiments.asset: true` in your configuration

__webpack.config.js__

``` diff
const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist')
  },
+ experiments: {
+   asset: true
+ }
};
```

## Resource assets

__webpack.config.js__

``` diff
const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist')
  },
  experiments: {
    asset: true
  },
+ module: {
+   rules: [
+     {
+       test: /\.png/,
+       type: 'asset/resource'
+     }
+   ]
+ }
};
```

__src/index.js__

``` js
import mainImage from './images/main.png';

// ...

img.src = mainImage; // '/dist/151cfcfa1bd74779aadb.png'
```

All `png` files will be emitted to the output directory and their paths will be injected into the bundles. Just like with `file-loader`

### Custom output filename

By default, `asset/resource` modules are emitting with `[hash][ext]` filename into output directory.

You can modify this template by setting `output.assetModuleFilename` in your configuration:

__webpack.config.js__

``` diff
const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
+   assetModuleFilename: 'images/[hash][ext]'
  },
  experiments: {
    asset: true
  },
  module: {
    rules: [
      {
        test: /\.png/,
        type: 'asset/resource'
      }
    ]
  }
};
```

## Inlined assets

__webpack.config.js__

``` diff
const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist')
  },
  experiments: {
    asset: true
  },
  module: {
    rules: [
      {
-       test: /\.png/,
-       type: 'asset/resource'
+       test: /\.svg/,
+       type: 'asset/inline'
      }
    ]
  }
};
```

__src/index.js__

``` diff
- import mainImage from './images/main.png';
+ import metroMap from './images/matro.svg';

// ...

- img.src = mainImage; // '/dist/151cfcfa1bd74779aadb.png'
+ block.style.background = `url(${metroMap}); // url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDo...vc3ZnPgo=)
```

All `svg` files will be injected into the bundles as data-url. Just like with `url-loader`

### Custom data-url generator

By default, data-url is a file content encoded with base64.

If you want to use a custom encoding algorithm, you may specify a custom function to encode a file content:

__webpack.config.js__

``` diff
const path = require('path');
+ const svgToMiniDataURI = require('mini-svg-data-uri');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist')
  },
  experiments: {
    asset: true
  },
  module: {
    rules: [
      {
        test: /\.svg/,
        type: 'asset/inline',
+       generator: {
+         dataUrl: content => {
+           content = content.toString();
+           return svgToMiniDataURI(content);
+         }
+       }
      }
    ]
  }
};
```

This one will use `mini-svg-data-uri` package to encode all `svg` files.

## Source assets

__webpack.config.js__

``` diff
const path = require('path');
- const svgToMiniDataURI = require('mini-svg-data-uri');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist')
  },
  experiments: {
    asset: true
  },
  module: {
    rules: [
      {
-       test: /\.svg/,
-       type: 'asset/inline',
-       generator: {
-         dataUrl: content => {
-           if (typeof content !== "string") {
-             content = content.toString();
-           }
-
-           return svgToMiniDataURI(content);
-         }
-       }
+       test: /\.txt/,
+       type: 'asset/source',
      }
    ]
  }
};
```

__src/example.txt__

``` text
Hello world
```

__src/index.js__

``` diff
- import metroMap from './images/matro.svg';
+ import examleText from './example.txt';

// ...

- block.style.background = `url(${metroMap}); // url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDo...vc3ZnPgo=)
+ block.textContent = examleText; // 'Hello world'
```

All `txt` files will be injected into the bundles as is. Just like with `raw-loader`

## General asset type

__webpack.config.js__

``` diff
const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist')
  },
  experiments: {
    asset: true
  },
  module: {
    rules: [
      {
+       test: /\.txt/,
+       type: 'asset',
      }
    ]
  }
};
```

This one will automatically chooses between `resource` and `inline` by a condition.

Followed by default condition, for all the files with size less than 8kb will be applied `inline` module type, and `resource` otherwise.
You can change this condition by setting a `parser.dataUrlCondition.maxSize` option on the module rule of your webpack configuration:

__webpack.config.js__

``` diff
const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist')
  },
  experiments: {
    asset: true
  },
  module: {
    rules: [
      {
        test: /\.txt/,
        type: 'asset',
+       parser: {
+         dataUrlCondition: {
+           maxSize: 4 * 1024 // 4kb
+         }
+       }
      }
    ]
  },
};
```

Followed by this condition, for all the files with size less than 4kb will be applied `inline` module type, and `resource` otherwise.

Also you can specify a function to decide to inline or not:

__webpack.config.js__

``` diff
const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist')
  },
  experiments: {
    asset: true
  },
  module: {
    rules: [
      {
        test: /\.txt/,
        type: 'asset',
        parser: {
-         dataUrlCondition: {
-           maxSize: 4 * 1024 // 4kb
-         }
+         dataUrlCondition(source, { filename, module }) {
+           content = content.toString();
+           return content.includes('some marker');
+         }
        }
      }
    ]
  }
};
```
