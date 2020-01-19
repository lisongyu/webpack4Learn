
var HtmlWebpackPlugin = require('html-webpack-plugin');
const {
  CleanWebpackPlugin
} = require("clean-webpack-plugin");

const merge = require("webpack-merge");
const devConfig = require("./webpack.dev");
const proConfig = require("./webpack.pro");


const baseConfig = {
  entry: {
    
    main: "./src/index.js"

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

      }
     
    ]
  },
  optimization: {
    //帮助我们自动做代码分割
    splitChunks: {
      chunks:"all", //默认支持异步，我们使用all
      cacheGroups:{
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          name:'vendors'//设置名字
      },
        default:false
      }

    }
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: 'My App',
      template: "./index.html",
      filename: "index.html"
    

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