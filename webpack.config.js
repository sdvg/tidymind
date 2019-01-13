/* "Fake" Webpack config to support IDE */
module.exports = {
  resolve: {
    alias: {
      '@': path.resolve('./src'),
    },
  },
}
