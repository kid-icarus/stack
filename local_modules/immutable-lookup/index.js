import mapValues from 'lodash.mapvalues'
import lookup from './lookup'

export default (cursors, storeState) =>
  mapValues(cursors, lookup.bind(null, storeState))
