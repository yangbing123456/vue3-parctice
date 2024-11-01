## webpack 的基本使用

1. 在 index.html 里面 引入 我们的main.js
<script src="../src/main.js"></script>

2. 安装webpack
   npm i webpack webpack-cli -D

<!-- npx 这个指令 可以将 node-modules 里面的bin目录临时添加为环境变量，这样就可以访问里面的内容 -->
<!-- 打包 -->
<!-- development 开发模式  这个模式值编译js代码 -->
<!-- production 生产模式 这个模式不仅可以编译js代码  还可以压缩js -->

npx webpack ./src/main.js --mode=development

## webpack 5大核心概念

1. entry 入口 （webpack 从那个文件开始打包 可以是单入口，也可以是多入口）
2. output 输出 （webpack 打包到那里去 如何命名等）
3. loader 编译器 （本身只能处理js,json 编译其他资源 需要借助loader）
4. plugin 插件 （扩展webpack的功能）
5. 两种模式： development 开发模式 和 production 生产模式

## webpack的基本配置

在项目里新建一个 webpack.config.js

vue项目 在下面新建 vue.config.js 文件，在文件里面引入 webpack

<script>
  const path = require('path') // nodejs 核心模块 专门用来处理路径问题
  module.exports = {
    entry:'./src/main.js',
    output:{
      // __dirname nodejs 变量，代表当前文件的文件夹目录
      path:path.resovle(__dirname,'dist'), // 文件输出的路径
      filename:'main.js'  // 文件名
    },
    module:{
      rules:[
        // loader 配置
      ]
    },
    plugins:[
      // 插件配置
    ],
    mode:'development'
  }
</script>

## devserve 热更新

devserve:{
host:'',
port:'',
mode:''
}
