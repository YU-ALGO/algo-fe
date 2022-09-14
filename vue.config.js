const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  devServer: {
    allowedHosts: ['downbit.r-e.kr']
  },
  transpileDependencies: true,
  lintOnSave: false
})
