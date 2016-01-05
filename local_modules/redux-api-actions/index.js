import { CALL_API } from 'redux-api-middleware'
import { normalize, arrayOf } from 'normalizr'

// TODO: check entities cache in store and dont fetch if we have it already

const result = (fn, arg) => typeof fn === 'function' ? fn(arg) : fn

const createAPIAction = (name, opt = {}) => (ropt = {}) => {
  var meta = {
    src: name,
    requestId: result(ropt.requestId || opt.requestId, ropt.options)
  }

  return {
    [CALL_API]: {
      endpoint: result(ropt.endpoint || opt.endpoint, ropt.options),
      method: result(ropt.method || opt.method, ropt.options),
      body: result(ropt.body || opt.body, ropt.options),
      headers: result(ropt.headers || opt.headers, ropt.options),
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
            if (contentType && ~contentType.indexOf('json')) {
              return res.json().then((json) => {
                var casting = opt.collection ? arrayOf(opt.model) : opt.model
                return {
                  raw: json,
                  normalized: normalize(json, casting)
                }
              })
            }
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

export default createAPIAction
