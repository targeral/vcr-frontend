const webpack = require('webpack')
const merge = require('webpack-merge')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const config = require('../config')
const baseWebpackConfig = require('./webpack.base.conf')
const utils = require('./utils')


let webpackConfig = merge(baseWebpackConfig, {
  module: {
    rules: [
      {
        test: /\.less$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'less-loader']
        })
      }
    ]
  },
  output: {
    path: config.build.assetsRoot,
    filename: utils.assetsPath('js/[name].js'),
    chunkFilename: utils.assetsPath('js/[name].[chunkhash].min.js')
  },
	// devtool: 'source-map',
	plugins: [
    // short-circuits all Vue.js warning code
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: '"production"'
			}
    }),
    new CleanWebpackPlugin(['dist'], {
      root: process.cwd()
    }),
    // minify with dead-code elimination
		// new UglifyJsPlugin({
    //   exclude: '/src/sw.js',
    //   // sourceMap: true,
    //   uglifyOptions: {
    //     compress: {
    //       warnings: false
    //     }
    //   }
    // }),
    new ExtractTextPlugin(utils.assetsPath('css/app.min.css')),
    new HtmlWebpackPlugin({
      filename: config.build.index,
      template: 'index.html',
      inject: true,
      // minify: {
      //     removeComments: true,
      //     collapseWhitespace: true,
      //     removeAttributeQuotes: true
      //         // more options:
      //         // https://github.com/kangax/html-minifier#options-quick-reference
      // },
      // necessary to consistently work with multiple chunks via CommonsChunkPlugin
      chunksSortMode: 'dependency'
    }),
		// optimize module ids by occurrence count
		new webpack.optimize.OccurrenceOrderPlugin()
	]
})

// if (config.build.productionGzip) {
//     const CompressionWebpackPlugin = require('compression-webpack-plugin')

//     webpackConfig.plugins.push(
//         new CompressionWebpackPlugin({
//             asset: '[path].gz[query]',
//             algorithm: 'gzip',
//             test: new RegExp(
//                 '\\.(' +
//                 config.build.productionGzipExtensions.join('|') +
//                 ')$'
//             ),
//             threshold: 10240,
//             minRatio: 0.8
//         })
//     )
// }

module.exports = webpackConfig