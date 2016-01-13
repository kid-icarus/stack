var path = require('path')
require('app-module-path').addPath(path.join(__dirname, '../../server'))

require('babel-register')
require('./server')
