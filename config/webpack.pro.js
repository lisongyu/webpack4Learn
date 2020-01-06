
// const merge = require("webpack-merge");
// const baseConfig = require("./webpack.base");
const proConfig = {
  //入口文件配置
  mode: 'production',
  devtool: 'cheap-module-source-map', //文件跟踪

  //开启tree shking
  
}

module.exports=proConfig
// module.exports=merge(baseConfig,proConfig)