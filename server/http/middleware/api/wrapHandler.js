import {Errors} from 'connections/rethink'
import mapValues from 'lodash.mapvalues'
import map from 'lodash.map'

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
  return mapValues(err.errors, getError)
}

const sendError = (err, res) => {
  if (err instanceof Errors.DocumentNotFound) {
    return res.status(204).end()
  }
  res.status(err.status || 500)
  res.json({
    error: getError(err),
    fields: getErrorFields(err)
  })
  res.end()
}

const transformData = (user, data) => {
  // if the user cant see the doc
  if (data && data.authorized && !data.authorized(user, 'read')) {
    return
  }
  // single instance w/ lens
  if (data && data.lens) {
    return data.lens(user, 'read')
  }
  // array of instances w/ lens
  if (Array.isArray(data)) {
    return map(data, transformData.bind(null, user))
  }
  return data
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
    if (err) return sendError(err, res)
    var transformedData = transformData(opt.user, data)

    if (transformedData) {
      res.status(200)
      res.json(transformedData)
    } else {
      res.status(204)
    }
    res.end()
  }

  try {
    handler(opt, sendResponse)
  } catch (err) {
    sendResponse(err)
  }
}
