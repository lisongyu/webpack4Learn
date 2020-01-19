
var HtmlWebpackPlugin = require('html-webpack-plugin');
const { entries } = require("./entrys");
const {
  CleanWebpackPlugin
} = require("clean-webpack-plugin");

const merge = require("webpack-merge");
const devConfig = require("./webpack.dev");
const proConfig = require("./webpack.pro");


const baseConfig = {
  // entry: {
  //   main: "./src/index.js",
  //   list:'./src/list.js',
  //   detail:'./src/detail.js'
   
  // },
  entry:entries(),
  

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
  

}
const makePlugins=(configs)=>{
  const plugins=[
    new CleanWebpackPlugin()
  ]

  
  Object.keys(configs.entry).forEach(item=>{
    plugins.push(
      new HtmlWebpackPlugin({
        title: 'My App',
        template: "./index.html",
        filename: `${item}.html`,
        chunks:['vendors',item]
      })
    )
   
  })

  return plugins
 
}

const plugins=[
 
  new HtmlWebpackPlugin({
    title: 'My App',
    template: "./index.html",
    filename: "index.html",
    chunks:['vendors','main']
  }),
  new HtmlWebpackPlugin({
    title: 'My List',
    template: "./index.html",
    filename: "list.html",
    chunks:['vendors','list']
  })
]

baseConfig.plugins=makePlugins(baseConfig);

// module.exports=baseConfig
module.exports = env => {
  if (env && env.production) {
    return merge(baseConfig, proConfig)
  } else {
    return merge(baseConfig, devConfig);
  }
}