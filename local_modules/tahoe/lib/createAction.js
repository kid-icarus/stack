import { CALL_API } from 'redux-api-middleware'
import mapValues from 'lodash.mapvalues'
import merge from 'lodash.merge'
import handleResponse from './handleResponse'
import createURL from './createURL'

const result = (fn, arg) => typeof fn === 'function' ? fn(arg) : fn
const getBody = (body) =>
  typeof body === 'undefined' || typeof body === 'string'
    ? body
    : JSON.stringify(body)

// TODO:0 check entities cache in store and dont fetch if we have it already
export default (defaults = {}) => ({requestId}, ropt = {}) => {
  if (!requestId) {
    throw new Error('Missing requestId option!')
  }
  var options = mapValues(merge({
    requestId: requestId
  }, defaults, ropt), (v) => result(v, ropt.params))

  var requestType = {
    type: 'tahoe.request',
    meta: options,
    payload: (action) => ({
      endpoint: action.endpoint
    })
  }
  var successType = {
    type: 'tahoe.success',
    meta: options,
    payload: handleResponse(options)
  }
  var failureType = {
    type: 'tahoe.failure',
    meta: options
  }

  return {
    [CALL_API]: {
      endpoint: createURL(options.endpoint, options.query),
      method: options.method,
      body: getBody(options.body),
      headers: options.headers,
      credentials: options.credentials,
      types: [requestType, successType, failureType]
    }
  }
}
