import path from 'path';
import webpack from 'webpack';
import { merge } from 'webpack-merge';
import HTMLPlugin from 'html-webpack-plugin';
import DirectoryTreePlugin from 'directory-tree-webpack-plugin';
import common from './webpack.common.mjs';
import {
  enhance,
  filter,
  sort,
} from './src/utilities/content-tree-enhancers.mjs';
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default (env) =>
  merge(common(env), {
    experiments: {
      lazyCompilation: true,
    },
    mode: 'development',
    devtool: 'source-map',
    entry: {
      index: './index.jsx',
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new ReactRefreshWebpackPlugin(),
      new HTMLPlugin({
        template: 'index.html',
        favicon: 'favicon.ico',
      }),
      new DirectoryTreePlugin({
        dir: 'src/content',
        path: 'src/_content.json',
        extensions: /\.mdx?/,
        enhance,
        filter,
        sort,
      }),
    ],
    devServer: {
      static: path.resolve(__dirname, './dist'),
      port: 3000,
      hot: true,
      compress: true,
      historyApiFallback: true,
    },
  });
