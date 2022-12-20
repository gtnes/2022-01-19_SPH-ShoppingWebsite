const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: true
})

module.exports = {
  //关闭eslint
  lintOnSave: false,
  // 不打包MAP文件
  productionSourceMap:false,
  // webpack配置代理跨域
  devServer: {
    proxy: {
      // 请求路径中如果出现/api字段，会去请求api接口服务器
      '/api': {
        target: 'http://gmall-h5-api.atguigu.cn',  // api接口服务器地址
        // pathRewrite: { '^/api': '' },  // 路径重写：api接口服务器地址已经带api字段，所以不需要路重写
      },
    },
  },
  }