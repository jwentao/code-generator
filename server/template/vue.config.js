const { defineConfig } = require('@vue/cli-service')

const packageName = require('./package.json').name
const deployId = require('./package.json').deployId

module.exports = defineConfig({
  // publicPath: `https://cdn-app.myshopline.com/web/mirco/${packageName}`,
  publicPath: `https://cdn-app.myshopline.com/web/lowcode/${packageName}/${deployId}`,
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
