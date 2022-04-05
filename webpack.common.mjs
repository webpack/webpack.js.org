import path from 'path';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import webpack from 'webpack';
import h from 'hastscript';
import remarkResponsiveTable from './src/remark-plugins/remark-responsive-table/remark-responsive-table.mjs';
import gfm from 'remark-gfm';
import slug from './src/remark-plugins/docschina-remark-slugger/index.mjs';
import cleanup from './src/remark-plugins/remark-cleanup-readme/index.mjs';
import aside from './src/remark-plugins/remark-custom-asides/index.mjs';
import autolink from 'remark-autolink-headings';
import refractor from 'remark-refractor';
import frontmatter from 'remark-frontmatter';
import { createRequire } from 'module';
import remarkEmoji from 'remark-emoji';
import { fileURLToPath } from 'url';
import remarkRemoveHeadingId from './src/remark-plugins/remark-remove-heading-id/index.mjs';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const require = createRequire(import.meta.url);

const mdPlugins = [
  gfm,
  slug,
  remarkResponsiveTable,
  remarkEmoji,
  cleanup,
  [
    aside,
    {
      mapping: {
        'T>': 'tip',
        'W>': 'warning',
        '?>': 'todo',
      },
    },
  ],
  [
    autolink,
    {
      behavior: 'append',
      content() {
        return [h('span.header-link')];
      },
    },
  ],
  refractor,
  remarkRemoveHeadingId
];

export default ({ ssg = false }) => ({
  context: path.resolve(__dirname, './src'),
  cache: {
    type: 'filesystem',
    buildDependencies: {
      config: [__filename],
    },
    cacheDirectory: path.resolve(__dirname, '.cache/webpack'),
  },
  resolve: {
    extensions: ['.js', '.jsx', '.scss'],
    fallback: {
      path: require.resolve('path-browserify'),
    },
  },
  module: {
    rules: [
      {
        test: /\.mdx$/,
        use: [
          'babel-loader',
          {
            loader: '@mdx-js/loader',
            options: {
              remarkPlugins: [...mdPlugins, [frontmatter]],
            },
          },
        ],
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'],
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          {
            loader: 'sass-loader',
            options: {
              sassOptions: {
                includePaths: [path.join('./src/styles/partials')],
              },
            },
          },
        ],
      },
      {
        test: /\.woff2?$/,
        type: 'asset/resource',
        generator: {
          filename: 'font/[name].[hash][ext][query]',
          emit: ssg !== true,
        },
      },
      {
        test: /\.(jpg|jpeg|png|ico)$/i,
        type: 'asset/resource',
        generator: {
          filename: '[name].[hash][ext][query]',
          emit: ssg !== true,
        },
      },
      {
        test: /\.svg$/i,
        type: 'asset/resource',
        exclude: [path.resolve(__dirname, 'src/styles/icons')],
        generator: {
          filename: '[name].[hash][ext][query]',
          emit: ssg !== true,
        },
      },
      {
        test: /\.svg$/i,
        use: ['@svgr/webpack'],
        include: [path.resolve(__dirname, 'src/styles/icons')],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css',
      experimentalUseImportModule: true,
    }),
    new webpack.DefinePlugin({
      // https://github.com/algolia/algoliasearch-client-javascript/issues/764
      'process.env.RESET_APP_DATA_TIMER': JSON.stringify(''), // fix for algoliasearch
    }),
  ],
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: '/',
    filename: '[name].bundle.js',
  },
});
