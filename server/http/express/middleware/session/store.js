const session = require('express-session')
const config = require('app-config-chain')
const SessionStore = require('connect-redis')(session)

module.exports = new SessionStore({
  host: config.redis.host,
  port: config.redis.port,
  pass: config.redis.pass,
  db: config.redis.index
})
