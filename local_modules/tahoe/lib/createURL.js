import url from 'url'
import merge from 'lodash.merge'

export default (uri, query = {}) => {
  var parsed = url.parse(uri, true)
  delete parsed.search
  merge(parsed.query, query)
  return url.format(parsed)
}
