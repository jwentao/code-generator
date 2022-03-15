const { defineConfig } = require('@vue/cli-service')

const packageName = require('./package.json').name

module.exports = defineConfig({
  publicPath: `https://cdn-app.myshopline.com/web/mirco/${packageName}`,
  transpileDependencies: true,
  devServer: {
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  },
  configureWebpack: {
    output: {
      library: `${packageName}-[name]`,
      libraryTarget: 'umd',
      chunkLoadingGlobal: `webpackJsonp_${packageName}` // todo need test
    }
  }
})
