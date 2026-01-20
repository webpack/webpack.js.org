// Import External Dependencies
import path from "node:path";
import { fileURLToPath } from "node:url";
import CssMinimizerPlugin from "css-minimizer-webpack-plugin";
import { merge } from "webpack-merge";
import { InjectManifest } from "workbox-webpack-plugin";

// Load Common Configuration
import ProdAssetsManifest from "./src/ProdAssetsManifest.mjs";
import common from "./webpack.common.mjs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default (env) =>
  merge(common(env), {
    mode: "production",
    entry: {
      index: {
        import: "./index.jsx",
        filename: "index.[contenthash].js",
      },
    },
    output: {
      filename: "[name].[contenthash].js",
    },
    optimization: {
      splitChunks: {
        cacheGroups: {
          vendors: {
            test: /node_modules/,
            chunks: "initial",
            enforce: true,
            filename: "vendor.[contenthash].js",
          },
        },
      },
      minimizer: [
        "...",
        new CssMinimizerPlugin({
          minify: CssMinimizerPlugin.lightningCssMinify,
        }),
      ],
    },
    plugins: [
      new InjectManifest({
        swSrc: path.join(__dirname, "src/sw.js"),
        swDest: "sw.js",
        // exclude license
        exclude: [/license\.txt/i],
      }),
      new ProdAssetsManifest(),
    ],
  });
