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
                    test: /\.css$/,
                    exclude: /node_modules/,
                    loader: 'style-loader!css-loader'
                }]
            }
        }
    }

</code>