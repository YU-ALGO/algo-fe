const { defineConfig } = require('@vue/cli-service')
const path = require('path')

module.exports = defineConfig({
  devServer: {
    allowedHosts: ['algo.r-e.kr', 'web.algo.r-e.kr', 'be2.algo.r-e.kr']
  },
  transpileDependencies: true,
  lintOnSave: false,
  configureWebpack: {
    resolve: {
      alias: {
        '@': path.join(__dirname, 'src/'),
        '@compo': path.join(__dirname, 'src/components/'),
        '@views': path.join(__dirname, 'src/views/'),
      },
    },
  },
})
