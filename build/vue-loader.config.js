module.exports = {
  loader: {
    css: 'vue-style-loader!css-loader',
    less: 'vue-style-loader!css-loader!less-loader'
  },
  extractCSS: process.env.NODE_ENV === 'production',
  preserveWhitespace: false,
  postcss: [
    require('autoprefixer')({
      browsers: ['last 3 versions']
    })
  ],
  postLoaders: {
    html: 'babel-loader'
  }
}
