import request from 'superagent'
import { normalize, arrayOf } from 'normalizr'

const requestEventSource = (url, opt, dispatch) => {
  var src = new EventSource(url, opt)
  src.addEventListener('insert', ({data}) => {
    try {
      dispatch({
        type: 'tahoe.tail.add',
        meta: opt,
        payload: JSON.parse(data)
      })
    } catch (err) {
      dispatch({
        type: 'tahoe.failure',
        meta: opt,
        payload: err
      })
    }
  })
}

export default (opt) => (dispatch) => {
  dispatch({
    type: 'tahoe.request',
    payload: opt
  })

  var req = request[opt.method.toLowerCase()](opt.endpoint)

  if (opt.headers) {
    req = req.set(opt.headers)
  }
  if (opt.query) {
    req = req.query(opt.query)
  }
  if (opt.body) {
    req = req.send(opt.body)
  }
  if (opt.withCredentials) {
    req = req.withCredentials()
  }

  if (opt.tail) {
    return requestEventSource(req.url, opt, dispatch)
  }

  req.end((err, res) => {
    if (err) {
      return dispatch({
        type: 'tahoe.failure',
        meta: opt,
        payload: err
      })
    }

    // handle json responses
    if (res.type === 'application/json') {
      return dispatch({
        type: 'tahoe.success',
        meta: opt,
        payload: {
          raw: res.body,
          normalized: normalize(res.body, opt.collection
            ? arrayOf(opt.model)
            : opt.model)
        }
      })
    }

    console.log('unknown type', res)
  })
}
