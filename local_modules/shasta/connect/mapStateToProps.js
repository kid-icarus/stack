import mapValues from 'lodash.mapvalues'
import lookup from './lookup'

export default (view) => (storeState) => {
  if (!view.cursors) return {} // nothing to do
  return mapValues(view.cursors, lookup.bind(null, storeState))
}
