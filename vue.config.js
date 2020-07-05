module.exports = {
    publicPath: "https://products.katuura.info/onpuPractice/",
  css: {
    loaderOptions: {
      scss: {
        prependData: '@import "./src/assets/sass/prepends.scss";'
      }
    }
  }
};
