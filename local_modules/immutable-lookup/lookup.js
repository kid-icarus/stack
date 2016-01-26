// supports array of strings, strings with dot, or function
export default (o, k) =>
  o.getIn(
    Array.isArray(k)
    ? k
    : (typeof k === 'function'
      ? k()
      : k.split('.'))
  )
