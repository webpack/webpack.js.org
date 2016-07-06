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
            { test: /\.js$/, exclude: /node_modules/, loader: 'babel!eslint' },
            { test: /\.scss$/, loader: 'style!css!sass' },
            { test: /\.css$/, loader: 'style!css' },
            { test: /\.md$/, loader: 'html!markdown' },
            { test: /\.(png|jpg|svg|gif)$/, loader: 'file!image-webpack' }
        ]
    },

    eslint: {
        configFile: Path.resolve('./.eslintrc.json')
    },

    sassLoader: {
        includePaths: [
            Path.resolve('./src')
        ]
    },

    resolve: {
        root: Path.resolve('./node_modules'),
        extensions: [ '.js', '.md', '.css', '.scss', '' ],
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
        contentBase: Path.normalize('dist/'),
        historyApiFallback: true
    },

	output: {
		path: Path.join('dist', 'build'),
		publicPath: Path.normalize('/build/'),
		filename: '[name].bundle.js'
	}
}
