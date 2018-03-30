const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')
const config = require('../config')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const workboxPlugin = require('workbox-webpack-plugin')

const lessRule = {
	test: /\.less$/,
	use: ExtractTextPlugin.extract({
		fallback: 'style-loader',
		use: [
			'css-loader',
			'postcss-loader',
			{
				loader: 'less-loader',
				options: {
					javascriptEnabled: true
				}
			}
		]
	})
}

module.exports = merge(baseWebpackConfig, {
  entry: {
		app: './src/main.js',
		// sw: './src/sw.js'
	},
	output: {
		path: config.build.assetsRoot,
		publicPath: process.env.NODE_ENV === 'production' ? config.build.assetsPublicPath : config.dev.assetsPublicPath,
		filename: '[name].js',
		chunkFilename: '[name].chunk.js'
	},
	module: {
		rules: [
			lessRule
		]
	},
	devtool: 'inline-source-map',
	plugins: [
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: config.dev.env
			}
		}),
		new ExtractTextPlugin('vcr.css'),
		new HtmlWebpackPlugin({
			inject: true,
			filename: path.join(__dirname, '../dist/index.html'),
			template: path.join(__dirname, '../index.html')
		}),
		new FriendlyErrorsPlugin()
	]
})