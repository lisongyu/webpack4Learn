const path = require("path");
var HtmlWebpackPlugin = require('html-webpack-plugin');
const {
  CleanWebpackPlugin
} = require("clean-webpack-plugin");

const merge = require("webpack-merge");
const devConfig = require("./webpack.dev");
const proConfig = require("./webpack.pro");


const baseConfig = {
  entry: {
    index: "./src/index.js"

  },
  output: {
    // publicPath: "./",
    path: path.resolve(__dirname, "./dist"),
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
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: "babel-loader"

      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader", "postcss-loader"]
      },
      {
        test: /\.scss$/,
        use: [
          "style-loader",
          "css-loader",
          "postcss-loader",
          "sass-loader"
        ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: 'My App',
      template: "./index.html",
      filename: "index.html",
      chunks: ["index"]

    })

  ]

}

// module.exports=baseConfig
module.exports = env => {
  if (env && env.production) {
    return merge(baseConfig, proConfig)
  } else {
    return merge(baseConfig, devConfig);
  }
}