import {sanitizeData} from 'palisade'
import mapValues from 'lodash.mapvalues'
import pipeSSE from './pipeSSE'

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
  res.status(err.status || 500)
  res.json({
    error: getError(err),
    fields: getErrorFields(err)
  })
  res.end()
}

export default (handler, Model) => (req, res, next) => {
  var stream
  var called = false
  var formatter = sanitizeData.bind(null, req.user)
  var opt = {
    id: req.params.id,
    user: req.user,
    data: req.body,
    options: req.query,
    _req: req,
    _res: res
  }

  // if returns a stream, pipe it through SSE
  // otherwise assume its going to call the cb
  try {
    stream = handler(opt, sendResponse)
  } catch (err) {
    sendResponse(err)
  }
  if (stream && stream.on) {
    pipeStream(stream)
  }

  // guts
  function pipeStream (stream) {
    if (called) return stream.end()
    called = true
    pipeSSE(stream, res, formatter)
  }

  function sendResponse (err, data) {
    if (called) return
    called = true
    if (err) return sendError(err, res)

    var transformedData = formatter(data)
    if (transformedData) {
      res.status(200)
      res.json(transformedData)
    } else {
      res.status(204)
    }
    res.end()
  }
}
