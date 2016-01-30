// wraps a function to block all arguments
// useful when passing things as event handlers
export default (fn) => {
  if (typeof fn !== 'function') {
    throw new Error('shield can only protect a function - got ' + fn)
  }
  return () => fn()
}
