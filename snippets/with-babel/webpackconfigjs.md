<code>

    module.exports = function () {
        return {
            entry: './main.js',
            output: {
                path: './dist',
                filename: 'bundle.js'
            },
            module: {
                loaders: [{
                    test: /\.js$/,
                    exclude: /node_modules/,
                    loader: 'babel-loader',
                    query: {
                        presets: ['es2015']
                    }
                }]
            }
        }
    }

</code>