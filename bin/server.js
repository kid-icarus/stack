require('babel-register')

const config = require('app-config-chain').http
const server = require('../server')
const debug = require('debug')('app:bin:server')

server.listen(config.port, config.host, function () {
  debug('Server is now running at', `${config.host}:${config.port}`)
})
