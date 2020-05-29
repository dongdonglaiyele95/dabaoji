module.exports = {
  context: path.resolve(__dirname),
  entry: {
    app: ["babel-polyfill", "./src/main.js"],
    externals: {
      'vue': 'Vue',
      'vuex': 'Vuex',
      'vue-router': 'VueRouter',
      'element-ui': 'Element',
      'axios': 'axios',
    }
  }
}
