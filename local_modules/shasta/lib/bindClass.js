import forOwn from 'lodash.forown'

export default (c) =>
  forOwn(c.constructor.prototype, (v, k, o) => {
    if (typeof v === 'function') o[k] = v.bind(o)
  })
