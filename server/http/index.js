const http = require('http')
const app = require('./express')

const httpServer = http.createServer(app)

module.exports = httpServer
