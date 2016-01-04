import { CALL_API } from 'redux-api-middleware'
import { normalize, arrayOf } from 'normalizr'

// TODO: check entities cache in store and dont fetch if we have it already
const createAPIAction = (name, opt = {}) => (body, headers) => {
  var meta = {
    src: name
  }

  return {
    [CALL_API]: {
      endpoint: opt.endpoint,
      method: opt.method,
      body: body || opt.body,
      headers: headers || opt.headers,
      types: [
        {
          type: 'REQUEST',
          meta: meta,
          payload: (action, state) => ({ endpoint: action.endpoint })
        },
        {
          type: 'SUCCESS',
          meta: meta,
          payload: (action, state, res) => {
            const contentType = res.headers.get('Content-Type')
            if (contentType && ~contentType.indexOf('json')) {
              return res.json().then((json) => {
                return normalize(json, opt.collection ? arrayOf(opt.model) : opt.model)
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
