const compose = require('composable-middleware')
const errorHandler = require('errorhandler')
const pmx = require('pmx')

module.exports = (req, res, next) =>
  compose(
    errorHandler(),
    pmx.expressErrorHandler(),
    (err, req, res, next) => {
      console.error(err)
      res.status(500)
      res.end()
      next()
    }
  )
