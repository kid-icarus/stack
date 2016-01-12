const {compose} = require('compose-middleware')
const errorHandler = require('errorhandler')
const pmx = require('pmx')

module.exports = compose([
  errorHandler(),
  pmx.expressErrorHandler(),
  (err, req, res, next) => {
    console.error(err)
    res.status(500)
    res.end()
    next()
  }
])
