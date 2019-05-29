var webpack = require("webpack"),
  MiniCssExtractPlugin = require("mini-css-extract-plugin"),
  CopyWebpackPlugin = require("copy-webpack-plugin"),
  merge = require("webpack-merge"),
  common = require("./webpack.config"),
  path = require("path"),
  WorkboxPlugin = require('workbox-webpack-plugin');

var specific = {
  mode: "production",

  module: {
    rules: [
      {
        test: /\.scss$/,
        loaders: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"]
      },
      {
        test: /\.css$/,
        loaders: [MiniCssExtractPlugin.loader, "css-loader"]
      }
    ]
  },

  plugins: [
    new CopyWebpackPlugin([
      {
        from: path.join(__dirname, "../assets"),
        to: path.join(__dirname, "../dist/assets")
      },
      {
        from: path.resolve(__dirname, "./netlify.redirects"),
        to: "_redirects",
        toType: "file"
      }
    ]),
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify("production")
    }),
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[name].css"
    }),
    // new WorkboxPlugin.GenerateSW({
        //     // these options encourage the ServiceWorkers to get in there fast 
        //     // and not allow any straggling "old" SWs to hang around
        //     clientsClaim: true,
        //     skipWaiting: true
        // })
  ],

  output: {
    publicPath: "/"
  }
};

module.exports = merge(common, specific);
