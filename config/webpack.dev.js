
const webpack = require("webpack");
const merge = require("webpack-merge");
const baseConfig = require("./webpack.base");
const devConfig = {
  //入口文件配置
  // mode: 'development',
  mode: 'development',
  devtool: 'cheap-module-eval-source-map', //文件跟踪
 
  devServer: {
    contentBase: './dist', //资源目录
    open: true, //自动打开浏览器
    port: 8081, //端口
    hot: true,
    hotOnly: true,
    proxy: {
      "/api": {
        target: "http://localhost:9092"
      }
    }
  },

  //开启tree shking
  optimization: {
    usedExports: true
  },
  plugins: [
   
    //热替换
    new webpack.HotModuleReplacementPlugin()


  ]

}

module.exports=merge(baseConfig,devConfig)