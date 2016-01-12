const http = require('http')
const expressApp = require('./express')

const httpServer = http.createServer(expressApp)

module.exports = httpServer
