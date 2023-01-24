const webpack = require("webpack");
const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const sveltePreprocess = require("svelte-preprocess");

const mode = process.env.NODE_ENV || "development";
const prod = mode === "production";

module.exports = {
  entry: prod ? "./src/render.ts" : "./src/launch.ts",
  output: {
    path: path.resolve(__dirname, prod ? "dist" : "public"),
    filename: "[name].js",
    globalObject: 'this',
    library: prod ? { name: 'calendar_header', type: "umd" } : undefined,
  },
  resolve: {
    extensions: [".js", ".ts", ".svelte"],
  },
  module: {
    rules: [
      // prod ? {
      //   test: require.resolve('./src/render.ts'),
      //   loader: 'expose-loader',
      //   options: {
      //     exposes: ['render'],
      //   },
      // } : {},
      {
        test: /\.svelte$/,
        use: [
          {
            loader: "svelte-loader",
            options: {
              compilerOptions: {
                dev: !prod,
              },
              emitCss: prod,
              hotReload: !prod,
              preprocess: sveltePreprocess({}),
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        // required to prevent errors from Svelte on Webpack 5+
        test: /node_modules\/svelte\/.*\.mjs$/,
        resolve: {
          fullySpecified: false,
        },
      },
      {
        test: /\.ts$/,
        use: {
          loader: "ts-loader",
          options: {
            configFile: prod ? "tsconfig.prod.json" : "tsconfig.json",
            transpileOnly: prod,
          },
        },
        exclude: /node_modules/,
      },
    ],
  },
  mode,
  plugins: prod ? [new MiniCssExtractPlugin({filename: "index.css"})] : [new HtmlWebpackPlugin()],
  devtool: prod ? false : "source-map",
  devServer: {
    static: {
      directory: path.join(__dirname, "public"),
    },
    port: 8080,
    hot: true,
  },
};
