const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  chainWebpack: (config) => {
    config.module.rule('media').test(/\.(vtt|mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/);
  }
})
