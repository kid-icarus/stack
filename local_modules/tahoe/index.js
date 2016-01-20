import { CALL_API } from 'redux-api-middleware'
import { normalize, arrayOf } from 'normalizr'
import { apiMiddleware } from 'redux-api-middleware'
import * as reducers from './reducers'

// TODO: check entities cache in store and dont fetch if we have it already
const result = (fn, arg) => typeof fn === 'function' ? fn(arg) : fn

const getNormalizer = (opt) => (json) => ({
  raw: json,
  normalized: normalize(json, opt.collection ? arrayOf(opt.model) : opt.model)
})

const createAPIAction = (opt = {}) => (ropt = {}) => {
  var meta = {
    cursor: result(ropt.cursor || opt.cursor, ropt.options)
  }

  return {
    [CALL_API]: {
      endpoint: result(ropt.endpoint || opt.endpoint, ropt.options),
      method: result(ropt.method || opt.method, ropt.options),
      body: result(ropt.body || opt.body, ropt.options),
      headers: result(ropt.headers || opt.headers, ropt.options),
      credentials: result(ropt.credentials || opt.credentials, ropt.options),
      types: [
        {
          type: 'REQUEST',
          meta: meta,
          payload: (action) => { action.endpoint }
        },
        {
          type: 'SUCCESS',
          meta: meta,
          payload: (action, state, res) => {
            const contentType = res.headers.get('Content-Type')
            const normalize = getNormalizer(opt)
            if (!contentType || contentType.indexOf('json') === -1) return
            return res.json().then(normalize)
          }
        },
        {
          type: 'FAILURE',
          meta: meta
        }
      ]
    }
  }
}

export default {
  createAPIAction,
  reducers: reducers,
  middleware: apiMiddleware
}
