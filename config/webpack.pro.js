
// const merge = require("webpack-merge");
// const baseConfig = require("./webpack.base");
const path = require("path");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const proConfig = {
  //入口文件配置
  mode: 'production',
  devtool: 'cheap-module-source-map', //文件跟踪
  output: {
    // publicPath: "./",
    path: path.resolve(__dirname, "../dist"),
    filename: "[name].[contenthash].js",
    chunkFilename:"[name].[contenthash].js"

  },

  //开启tree shking
  module:{
    rules:[
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader"]
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader",
          "sass-loader"
        ]
      }
    ]

  },

  plugins: [
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
     //添加插件
     new OptimizeCSSAssetsPlugin({})
  ]
  
}

module.exports=proConfig
// module.exports=merge(baseConfig,proConfig)