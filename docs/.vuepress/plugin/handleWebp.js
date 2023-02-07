module.exports = {
  chainWebpack: (config) => {
    config.module
      .rule('url-loader')
      .test(/\.(png|jpe?g|gif|webp)(\?.*)?$/)
      .use('url-loader')
      .loader('url-loader')
      .end()
  },
}
