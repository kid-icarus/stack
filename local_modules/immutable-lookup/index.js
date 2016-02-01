import mapValues from 'lodash.mapvalues'
import lookup from './lookup'

// takes an object where key is anything you want
// and value (aka cursor) is either
// - a dot delimited string
// - array of strings
// - function that returns an array of strings
// it will then dive into an immutable object and grab all of these cursors
// and return the same object, but where the values are the resolved data
export default (cursors, storeState, props) =>
  mapValues(cursors, (v, k) =>
    lookup(storeState, v, [storeState, props])
  )
