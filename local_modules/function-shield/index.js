export default (fn) => {
  if (typeof fn !== 'function') {
    throw new Error('shield can only protect a function - got ' + fn)
  }
  return () => fn()
}
