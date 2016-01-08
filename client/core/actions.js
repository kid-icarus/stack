import localReducers from 'glob-loader!../actions/.lookup'
import merge from 'lodash.merge'

export default Object.keys(localReducers).reduce((p, k) => {
  return merge(p, localReducers[k])
}, {})
