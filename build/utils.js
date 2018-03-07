const path = require('path')
const config = require('../config')
// const fs = require('fs')

exports.assetsPath = _path => {
  const assetsSubDirectory = process.env.NODE_ENV === 'production' ? config.build.assetsSubDirectory : config.dev.assetsSubDirectory
  return path.posix.join(assetsSubDirectory, _path)
}
