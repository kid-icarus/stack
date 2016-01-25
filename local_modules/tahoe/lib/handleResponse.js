import { normalize, arrayOf } from 'normalizr'

const normalizeText = (str) => ({ raw: str })
const getJSONNormalizer = (opt) => (json) => ({
  raw: json,
  normalized: normalize(json, opt.collection ? arrayOf(opt.model) : opt.model)
})

export default (options) => (action, state, res) => {
  const contentType = res.headers.get('Content-Type')
  if (contentType && contentType.indexOf('json') !== -1) {
    return res.json().then(getJSONNormalizer(options))
  } else {
    return res.text().then(normalizeText)
  }
}
