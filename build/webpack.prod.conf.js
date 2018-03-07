const fs = require('fs')
const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin')
const workboxPlugin = require('workbox-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const config = require('../config')
const baseWebpackConfig = require('./webpack.base.conf')
const utils = require('./utils')
const dist = 'dist/'

// SW WebpackPlugin config
const SWWebpackPlugin = new SWPrecacheWebpackPlugin({
  cacheId: 'my-app',
  filename: 'sw.js',
  staticFileGlobs: ['dist/**/*.{js,html,css}'],
  minify: true,
  stripPrefix: 'dist/',
  runtimeCaching: [
    {
      urlPattern: /^https:\/\/api\.github\.com\//,
      handler: 'cacheFirst'
    }
  ]
})

const SWHtmlTpl = `<script>${fs.readFileSync(
  path.join(__dirname, './service-worker-prod.js'),
  'utf-8'
)}</script>`

const WBCustomWebpackPlugin = new workboxPlugin({
  globDirectory: dist,
  globPatterns: ['**/*.{html,js,css}'],
  swSrc: './src/sw.js',
  swDest: path.join(dist, 'sw.js')
})

// workbox WebpackPlugin config
const WBWebpackPlugin = new workboxPlugin({
  globDirectory: dist,
  globPatterns: ['**/*.{html,js,css}'],
  swDest: path.join(dist, 'sw.js'),
  // clientsClaim: true,
  // skipWaiting: true,
  // runtimeCaching: [
  //   {
  //     urlPattern: new RegExp('https://api.github.com/'),
  //     handler: 'staleWhileRevalidate'
  //   }
  // ]
})

const WBHtmlTpl = `<script>${fs.readFileSync(
  path.join(__dirname, './workbox-sw.js'),
  'utf-8'
)}</script>`

// const WBCustomWebpackPlugin = new workboxPlugin({
//   globDirectory: dist,
//   globPatterns: ['**/*.{html,js,css}'],
//   swSrc: './src/sw.js',
//   swDest: path.join(dist, 'sw.js')
// })

let webpackConfig = merge(baseWebpackConfig, {
  entry: {
    // 'sw': './src/sw.js'
  },
  module: {
    rules: [
      {
        test: /\.less$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: ["css-loader", "less-loader"]
        })
      }
    ]
  },
  output: {
    path: config.build.assetsRoot,
    filename: "[name].js"
  },
  // devtool: 'source-map',
  plugins: [
    // short-circuits all Vue.js warning code
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: '"production"'
      }
    }),
    new CleanWebpackPlugin(["dist"], {
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
    new ExtractTextPlugin(utils.assetsPath("css/app.min.css")),
    new HtmlWebpackPlugin({
      filename: config.build.index,
      template: "index.html",
      inject: true,
      serviceWorkerLoader: WBHtmlTpl,
      // minify: {
      //     removeComments: true,
      //     collapseWhitespace: true,
      //     removeAttributeQuotes: true
      //         // more options:
      //         // https://github.com/kangax/html-minifier#options-quick-reference
      // },
      // necessary to consistently work with multiple chunks via CommonsChunkPlugin
      chunksSortMode: "dependency"
    }),
    // optimize module ids by occurrence count
    // new webpack.optimize.OccurrenceOrderPlugin(),
    // SWWebpackPlugin
    WBWebpackPlugin
    // WBCustomWebpackPlugin
  ]
});

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