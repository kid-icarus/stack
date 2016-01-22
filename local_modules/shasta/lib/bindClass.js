export default (c) =>
   Object.getOwnPropertyNames(c.constructor.prototype)
    .filter((prop) => typeof c[prop] === 'function')
    .forEach((method) => c[method] = c[method].bind(c))
