import { CALL_API } from 'redux-api-middleware'
import { normalize, arrayOf } from 'normalizr'
import { apiMiddleware } from 'redux-api-middleware'
import mapValues from 'lodash.mapvalues'
import merge from 'lodash.merge'
import url from 'url'
import * as reducers from './reducers'

// TODO:0 check entities cache in store and dont fetch if we have it already
const result = (fn, arg) => typeof fn === 'function' ? fn(arg) : fn

const normalizeText = (str) => ({ raw: str })
const getJSONNormalizer = (opt) => (json) => ({
  raw: json,
  normalized: normalize(json, opt.collection ? arrayOf(opt.model) : opt.model)
})
const getBody = (body) =>
  typeof body === 'undefined' || typeof body === 'string'
    ? body
    : JSON.stringify(body)

const getEndpoint = (endpoint, query) => {
  var parsed = url.parse(endpoint, true)
  delete parsed.search
  if (query) {
    merge(parsed.query, query)
  }
  return url.format(parsed)
}

const createAction = (defaults = {}) => ({cursor}, ropt = {}) => {
  if (!cursor) {
    throw new Error('Missing cursor option!')
  }
  var options = mapValues(merge({
    cursor: cursor
  }, defaults, ropt), (v) =>
    result(v, ropt.params)
  )

  return {
    [CALL_API]: {
      endpoint: getEndpoint(options.endpoint, options.query),
      method: options.method,
      body: getBody(options.body),
      headers: options.headers,
      credentials: options.credentials,
      types: [
        {
          type: 'tahoe.request',
          meta: options,
          payload: (action) => ({
            endpoint: action.endpoint
          })
        },
        {
          type: 'tahoe.success',
          meta: options,
          payload: (action, state, res) => {
            const contentType = res.headers.get('Content-Type')
            if (contentType && contentType.indexOf('json') !== -1) {
              return res.json().then(getJSONNormalizer(options))
            } else {
              return res.text().then(normalizeText)
            }
          }
        },
        {
          type: 'tahoe.failure',
          meta: options
        }
      ]
    }
  }
}

export default {
  createAction,
  reducers: reducers,
  middleware: apiMiddleware
}
