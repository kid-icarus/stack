// import { createAction } from 'redux-actions'
import { CALL_API } from 'redux-api-middleware'
import { normalize, Schema, arrayOf } from 'normalizr'
const organization = new Schema('organization')

// TODO: break this out into a lib util
// TODO: check entities cache in store and dont fetch if we have it already
export const getOrgs = function () {
  let meta = {
    src: 'getOrgs'
  }

  let action = {
    [CALL_API]: {
      endpoint: 'https://api.github.com/users/contra/orgs',
      method: 'GET',
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
              return res.json().then((json) =>
                normalize(json, arrayOf(organization))
              )
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

  return action
}
