const path = require("path");
var HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
module.exports = {
  //入口文件配置
  mode: 'development',
  devtool:'cheap-module-eval-source-map', //文件跟踪
  entry: {
    index: "./src/index.js"
  
  },
  output: {
    // publicPath: "./",
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js"
  },
  module: {
    rules: [{
        test: /\.(jpe?g|png)$/,
        use: {
          loader: 'url-loader',
          options: {
            name: "[name].[ext]",
            outputPath: "imgs/",
            limit: 2048
          }
        }
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader","postcss-loader"]
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader",
          "sass-loader"]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin(
      {
        filename:"[name].css"
      }
    ),
    new HtmlWebpackPlugin({
    title: 'My App',
    template: "./index.html",
      filename: "index.html",
      chunks:["index"]
     
    }
    )
   
]

}