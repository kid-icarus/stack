const config = require('app-config-chain')
const compress = require('compression')
const methodOverride = require('method-override')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
// const session = require('express-session')
const {compose} = require('compose-middleware')

module.exports = compose([
  compress(),
  methodOverride(),
  bodyParser.json({
    strict: true,
    limit: '10mb'
  }),
  cookieParser(config.cookie.secret)/*,
  session({
    store: sessionStore,
    key: config.cookie.name,
    secret: config.cookie.secret,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 31536000000
    }
  })*/
])
