const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');

const cwd = process.cwd();

module.exports = (env) => ({
  mode: env === 'develop' ? 'development' : 'production',
  resolve: {
    extensions: ['.js', '.jsx', '.scss']
  },

  resolveLoader: {
    alias: {
      'page-loader': path.resolve(cwd, 'loaders/page-loader')
    }
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: [
          'babel-loader',
          {
            loader: 'eslint-loader',
            options: { fix: true }
          }
        ],
        include: [
          path.join(__dirname, 'src', 'components')
        ]
      },
      {
        test: /\.font.js$/,
        use: [
					MiniCssExtractPlugin.loader,
					'css-loader',
					{
						loader: 'fontgen-loader',
						options: { embed: true }
					}
        ]
      },
      {
        test: /\.css$/,
        use: [
					MiniCssExtractPlugin.loader,
					'css-loader'
        ]
      },
      {
        test: /\.scss$/,
        use: [
					MiniCssExtractPlugin.loader,
					'css-loader',
          {
						loader: 'postcss-loader',
						options: {
							plugins: () => [
								require('autoprefixer')
							],
						}
          },
					{
						loader: 'sass-loader',
						options: {
							includePaths: [ path.join('./src/styles/partials') ]
						}
					}
        ]
      },
      {
        test: /\.woff2?$/,
        use: {
          loader: 'file-loader',
          options: {
            prefix: 'font/'
          }
        }
      },
      {
        test: /\.(jpg|png|svg)$/,
        use: 'file-loader'
      },
      {
        test: /\.html$/,
        use: 'raw-loader'
      }
    ]
  },

  plugins: [
    new CopyWebpackPlugin([{
      from: './src/assets',
      to: './assets'
    }]),

    new MiniCssExtractPlugin({
      filename: '[chunkhash].css'
    })
  ]
});
