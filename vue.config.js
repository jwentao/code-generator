module.exports = {
  runtimeCompiler: true,
  css: {
    loaderOptions: {
      scss: {
        prependData: '@import "~@/styles/variables.scss";'
      }
    }
  }
};
