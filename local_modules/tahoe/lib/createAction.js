import mapValues from 'lodash.mapvalues'
import merge from 'lodash.merge'
import sendRequest from './sendRequest'

const result = (fn, arg) => typeof fn === 'function' ? fn(arg) : fn

// TODO:0 check entities cache in store and dont fetch if we have it already

/*
app must have redux-thunk installed
possible options:
- tail (default false)(boolean)
- method (required)(get, post, put, delete, or patch)
- params (object)
- endpoint (required)(url tring)
- model (required)(normalizr model)
- collection (default false)(boolean)

all options can either be a value, or a function that returns a value.
if you define a function, it will receive options.params as an argument
*/

export default (defaults = {}) => (opt = {}, instOpt = {}) => {
  if (!opt.requestId) {
    throw new Error('Missing requestId option!')
  }

  // merge our multitude of option objects together
  // defaults = options defined in createAction
  // instOpt = options defined in action creator
  // opt = requestId / tail options
  var options = merge({}, opt, defaults, instOpt)
  options = mapValues(options, (v) => result(v, options.params))

  if (!options.method) throw new Error('Missing method')
  if (!options.endpoint) throw new Error('Missing endpoint')

  return sendRequest(options)
}
