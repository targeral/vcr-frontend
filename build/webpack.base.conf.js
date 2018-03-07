/**
 * webpack 公共配置
 * @author targeral
 */

const path = require('path');
const config = require('../config');
const vueConfig = require('./vue-loader.config');

const resolve = dir => path.join(__dirname, '..', dir);

const vueRule = {
  test: /\.vue$/,
  loader: 'vue-loader',
  options: vueConfig
}

const eslintRule = {
	test: /\.(js|vue)$/,
	enforce: 'pre',
	loader: 'eslint-loader',
	include: [resolve('src')],
	exclude: /node_modules/,
	options: {
		formatter: require('eslint-friendly-formatter')
	}
}

const jsRule = {
	test: /\.js$/,
	loader: 'babel-loader',
  exclude: [/node_modules/, resolve('src/sw.js')],
  include: [resolve('src')]
}

// console.log(resolve('src/sw.js'))

const pictureRule = {
	test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
	loader: 'url-loader',
	options: {
		limit: 10000
	}
}

const fontRule = {
	test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
	loader: 'url-loader',
	options: {
		limit: 10000
	}
}



module.exports = {
  entry: {
    'static/js/app': './src/main.js',
		// 'sw': './src/sw.js'
  },
  output: {
    path: config.build.assetsRoot,
    publicPath:
      process.env.NODE_ENV === 'production'
        ? config.build.assetsPublicPath
        : config.dev.assetsPublicPath,
    filename: '[name].js'
  },
  resolve: {
    extensions: ['.js', '.vue', '.less', '.css'],
    alias: {
      vue$: 'vue/dist/vue.common.js',
      src: resolve('/src'),
      '@components': resolve('/src/components'),
      assets: resolve('/src/assets')
    }
  },
  module: {
    rules: [
			vueRule,
      eslintRule,
      jsRule,
      pictureRule,
      fontRule
		]
  }
};
