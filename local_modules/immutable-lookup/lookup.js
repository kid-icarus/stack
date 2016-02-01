const getLookupKey = (o, k, args) => {
  if (Array.isArray(k)) return k
  if (typeof k === 'function') return getLookupKey(o, k(...args), args)
  if (typeof k === 'string') return k.split('.')
  throw new Error(`Unknown lookup key: ${k}`)
}
// supports array of strings, strings with dot, or function
const lookup = (o, k, args) => o.getIn(getLookupKey(o, k, args))

export default lookup
