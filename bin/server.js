require('babel-register')

const config = require('app-config-chain')
const server = require('../server/app')
const debug = require('debug')('app:bin:server')

const host = config.server_host
const port = config.server_port

console.log('Listening to', host, port)

server.listen(port, host, function () {
  debug('Server is now running at ' + host + ':' + port + '.')
})
