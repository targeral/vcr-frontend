const path = require('path');

const build = {
    env: {
        NODE_ENV: '"production"'
    },
    index: path.resolve(__dirname, '../dist/index.html'),
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    productionSourceMap: true,
    productionGzip: false,
    productionGzipExtensions: ['js', 'css']
};

const dev = {
    env: {
        NODE_ENV: '"development"'
    },
    port: 8000,
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    cssSourceMap: false
};

module.exports = {
    build,
    dev
}