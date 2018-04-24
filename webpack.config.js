const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const RedirectWebpackPlugin = require('redirect-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');

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
    }),
    new RedirectWebpackPlugin({
      redirects: {
        'support': '/contribute/',
        'writers-guide': '/contribute/writers-guide/',
        'get-started': '/guides/getting-started/',
        'get-started/install-webpack': '/guides/installation/',
        'get-started/why-webpack': '/guides/why-webpack/',
        'pluginsapi': '/api/plugins/',
        'pluginsapi/compiler': '/api/compiler-hooks/',
        'pluginsapi/template': '/api/template/',
        'api/passing-a-config': '/configuration/configuration-types/',
        'api/plugins/compiler': '/api/compiler-hooks/',
        'api/plugins/compilation': '/api/compilation/',
        'api/plugins/module-factories': '/api/module-methods/',
        'api/plugins/parser': '/api/parser/',
        'api/plugins/tapable': '/api/tapable/',
        'api/plugins/template': '/api/template/',
        'api/plugins/resolver': '/api/resolver/',
        'development': '/contribute/',
        'development/plugin-patterns': '/contribute/plugin-patterns/',
        'development/release-process': '/contribute/release-process/',
        'development/how-to-write-a-loader': '/contribute/writing-a-loader/',
        'development/how-to-write-a-plugin': '/contribute/writing-a-plugin/',
        'guides/code-splitting-import': '/guides/code-splitting/',
        'guides/code-splitting-require': '/guides/code-splitting/',
        'guides/code-splitting-async': '/guides/code-splitting/',
        'guides/code-splitting-css': '/guides/code-splitting/',
        'guides/code-splitting-libraries': '/guides/code-splitting/',
        'guides/why-webpack': '/comparison/',
        'guides/production-build': '/guides/production/',
        'migrating': '/migrate/3/'
      },
    }),
    new WebpackPwaManifest({
      name: 'webpack.js.org',
      short_name: 'webpack',
      description: 'webpack is a module bundler. Its main purpose is to bundle JavaScript files for usage in a browser, yet it is also capable of transforming, bundling, or packaging just about any resource or asset.',
      background_color: '#ffffff',
      icons: [
        {
          src: path.resolve('src/assets/icon-square-big.png'),
          sizes: [96, 128, 192, 256, 384, 512] // multiple sizes
        },
        {
          src: path.resolve('src/assets/icon-square-big.png'),
          size: '1024x1024' // you can also use the specifications pattern
        }
      ]
    }),
  ]
});
