import update from 'update-object'

function setFunky (o, rk, k, v) {
  if (!k) {
    o[rk] = v
  } else {
    o[k] = {[rk]: v}
  }
  return o
}

function updater () {
  var updates = {}
  var chain
  var push = (k, v) => {
    if (typeof v === 'undefined') {
      v = k
      k = undefined
    }
    setFunky(updates, '$push', k, Array.isArray(v) ? v : [v])
    return chain
  }
  var unshift = (k, v) => {
    if (typeof v === 'undefined') {
      v = k
      k = undefined
    }
    setFunky(updates, '$unshift', k, Array.isArray(v) ? v : [v])
    return chain
  }
  var splice = (k, v) => {
    if (typeof v === 'undefined') {
      v = k
      k = undefined
    }
    setFunky(updates, '$splice', k, Array.isArray(v) ? v : [v])
    return chain
  }
  var set = (k, v) => {
    if (typeof v === 'undefined') {
      v = k
      k = undefined
    }
    setFunky(updates, '$set', k, v)
    return chain
  }
  var merge = (k, v) => {
    if (typeof v === 'undefined') {
      v = k
      k = undefined
    }
    setFunky(updates, '$merge', k, v)
    return chain
  }
  var apply = (k, v) => {
    if (typeof v === 'undefined') {
      v = k
      k = undefined
    }
    setFunky(updates, '$apply', k, v)
    return chain
  }
  var run = (o) => {
    return update(o, updates)
  }
  chain = {
    push,
    unshift,
    splice,
    set,
    merge,
    apply,
    run
  }
  return chain
}

export default updater
