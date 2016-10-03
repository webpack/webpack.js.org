{
    "node": {
        "__filename": true
    },
    "entry": {
        "main": "/Users/kylemathews/programs/webpack.js.org/.intermediate-representation/app"
    },
    "debug": true,
    "profile": false,
    "devtool": false,
    "output": {
        "path": "/Users/kylemathews/programs/webpack.js.org/public",
        "filename": "bundle-for-css.js",
        "publicPath": "/"
    },
    "resolveLoader": {
        "root": [
            "/Users/kylemathews/programs/webpack.js.org/node_modules",
            "/Users/kylemathews/programs/webpack.js.org/node_modules/gatsby/node_modules"
        ],
        "modulesDirectories": [
            "node_modules"
        ]
    },
    "plugins": [
        {
            "definitions": {
                "process.env": {
                    "NODE_ENV": "\"production\""
                }
            }
        },
        {
            "filename": "styles.css",
            "options": {
                "allChunks": true
            },
            "id": 1
        }
    ],
    "resolve": {
        "extensions": [
            "",
            ".js",
            ".jsx",
            ".cjsx",
            ".coffee"
        ],
        "root": [
            "/Users/kylemathews/programs/webpack.js.org",
            "/Users/kylemathews/programs/gatsby/dist/isomorphic"
        ],
        "modulesDirectories": [
            "/Users/kylemathews/programs/webpack.js.org/node_modules",
            "/Users/kylemathews/programs/webpack.js.org/node_modules/gatsby/node_modules",
            "node_modules"
        ]
    },
    "postcss": [
        null,
        {
            "version": "5.2.2",
            "plugins": [
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null
            ],
            "postcssPlugin": "postcss-cssnext",
            "postcssVersion": "5.2.2"
        }
    ],
    "module": {
        "loaders": [
            {
                "test": {},
                "loaders": [
                    "coffee",
                    "cjsx"
                ]
            },
            {
                "test": {},
                "exclude": {},
                "loader": "babel",
                "query": {
                    "presets": [
                        "/Users/kylemathews/programs/webpack.js.org/node_modules/babel-preset-es2015/lib/index.js",
                        "/Users/kylemathews/programs/webpack.js.org/node_modules/babel-preset-stage-1/lib/index.js",
                        "/Users/kylemathews/programs/webpack.js.org/node_modules/babel-preset-react/lib/index.js"
                    ],
                    "plugins": [
                        "/Users/kylemathews/programs/webpack.js.org/node_modules/babel-plugin-add-module-exports/lib/index.js"
                    ],
                    "cacheDirectory": true
                }
            },
            {
                "test": {},
                "loader": "coffee"
            },
            {
                "test": {},
                "loaders": [
                    "json"
                ]
            },
            {
                "test": {},
                "loaders": [
                    "url-loader?limit=10000"
                ]
            },
            {
                "test": {},
                "loader": "url-loader?limit=10000&minetype=application/font-woff"
            },
            {
                "test": {},
                "loader": "file-loader"
            },
            {
                "test": {},
                "loader": "file-loader"
            },
            {
                "test": {},
                "loader": "/Users/kylemathews/programs/gatsby/node_modules/extract-text-webpack-plugin/loader.js?{\"remove\":true}!css?minimize!postcss",
                "exclude": {}
            },
            {
                "test": {},
                "loader": "/Users/kylemathews/programs/gatsby/node_modules/extract-text-webpack-plugin/loader.js?{\"omit\":1,\"extract\":true,\"remove\":true}!style!css?modules&minimize&importLoaders=1!postcss"
            },
            {
                "test": {},
                "loader": "/Users/kylemathews/programs/gatsby/node_modules/extract-text-webpack-plugin/loader.js?{\"remove\":true}!css?minimize!postcss!sass"
            }
        ]
    }
}