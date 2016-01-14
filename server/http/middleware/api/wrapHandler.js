const getError = (err) => {
  if (err.message) return err.message
  if (err.error) {
    if (err.error.message) return err.error.message
    return err.error
  }
  return err
}

const getErrorFields = (err) => {
  if (!err.errors) return
  return Object.keys(err.errors).reduce((p, k) => {
    p[k] = getError(err.errors[k])
    return p
  }, {})
}

export default (handler, Model) => (req, res, next) => {
  var called = false
  var opt = {
    id: req.params.id,
    user: req.user,
    data: req.body,
    options: req.query,
    _req: req,
    _res: res
  }

  var sendResponse = (err, data) => {
    if (called) return
    called = true
    if (err) {
      res.status(err.status || 500)
      res.json({
        error: getError(err),
        fields: getErrorFields(err)
      })
      return res.end()
    }

    if (typeof data !== 'undefined') {
      res.status(200)
      if (Model && Model.lens) {
        res.json(Model.lens(opt.user, data))
      } else {
        res.json(data)
      }
      return res.end()
    }

    res.status(200)
    res.end()
  }

  handler(opt, sendResponse)
}
