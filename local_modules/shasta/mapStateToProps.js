import mapValues from 'lodash.mapvalues'
import lookup from './lookup'

export default (view) => (storeState) => {
  if (view.cursors) {
    return mapValues(view.cursors, (v) =>
      lookup(storeState, v)
    )
  }
  return {}
}
