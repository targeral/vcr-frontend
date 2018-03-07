const path = require('path')
const fs = require('fs')
const webpack = require('webpack')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')
const config = require('../config')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin')
// const workboxPlugin = require('workbox-webpack-plugin')

const lessRule = {
	test: /\.less$/,
	use: [
		'style-loader',
		'css-loader',
		'less-loader'
	]
}

module.exports = merge(baseWebpackConfig, {
  // entry: {
	// 	'static/js/app': './src/main.js',
	// 	'sw': './src/sw.js'
	// },
	output: {
		path: config.build.assetsRoot,
		publicPath: process.env.NODE_ENV === 'production' ? config.build.assetsPublicPath : config.dev.assetsPublicPath,
		filename: '[name].js',
	},
	devtool: 'inline-source-map',
	plugins: [
		new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: config.dev.env
      }
    }),
		new HtmlWebpackPlugin({
			inject: true,
			filename: path.join(__dirname, '../dist/index.html'),
			template: path.join(__dirname, '../index.html'),
			serviceWorkerLoader: `<script>${fs.readFileSync(path.join(__dirname,
        './service-worker-prod.js'), 'utf-8')}</script>`
		}),
		new FriendlyErrorsPlugin(),
		new SWPrecacheWebpackPlugin({
			cacheId: 'my-app',
			filename: 'sw.js',
			staticFileGlobs: ['dist/**/*.{js,html,css}'],
			minify: true,
			stripPrefix: 'dist/'
		})
	]
})