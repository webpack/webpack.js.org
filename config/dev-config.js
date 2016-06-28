// Import Dependencies
import Path from 'path'
import Webpack from 'webpack'

// Export the dev configuration
export default {
    target: 'web',
    devtool: 'source-map',

    context: Path.resolve('./src'),
    entry: {
        index: './app'
    },

    module: {
        loaders: [
            { test: /\.js$/, exclude: /node_modules/, loader: 'babel' },
            { test: /\.scss$/, loader: 'style!css!sass' }
        ]
    },

    sassLoader: {
        includePaths: [
            Path.resolve('./src')
        ]
    },

    resolve: {
        root: Path.resolve('./node_modules'),
        extensions: [ '.js', '.scss', '' ],
        alias: {
            Components: Path.resolve('./src/components'),
            Utilities: Path.resolve('./src/utilities')
        }
    },

    resolveLoader: {
        root: Path.resolve('./node_modules')
    },

    devServer: {
        port: 8080,
        inline: true,
        compress: true,
        contentBase: 'dist/',
        historyApiFallback: true
    },

    output: {
        path: '/dist/build',
        publicPath: '/build/',
        filename: '[name].bundle.js'
    }
}