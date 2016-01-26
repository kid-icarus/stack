import mapValues from 'lodash.mapvalues'
import merge from 'lodash.merge'
import sendRequest from './sendRequest'

const result = (fn, arg) => typeof fn === 'function' ? fn(arg) : fn

// TODO:0 check entities cache in store and dont fetch if we have it already
export default (defaults = {}) => (opt = {}, instOpt = {}) => {
  if (!opt.requestId) {
    throw new Error('Missing requestId option!')
  }
  var options = merge({}, opt, defaults, instOpt)
  options = mapValues(options, (v) => result(v, options.params))

  if (!options.method) throw new Error('Missing method')
  if (!options.endpoint) throw new Error('Missing endpoint')

  return sendRequest(options)
}
