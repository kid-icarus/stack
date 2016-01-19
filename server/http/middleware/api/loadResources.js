import pluralize from 'pluralize'
import requireDir from 'require-dir'
import mapValues from 'lodash.mapvalues'
import methods from './methods'

export default (opt) => {
  const resources = requireDir(opt.path, {recurse: true})

  const getPath = (resourceName, methodName) => {
    var plural = pluralize.plural(resourceName)
    var methodInfo = methods[methodName]

    var path = `${opt.prefix}/${plural}`
    if (!methodInfo.plural) {
      path += '/:id'
    }

    return path
  }

  const getEndpoints = (handlers, resourceName) =>
    Object.keys(handlers)
      .filter((methodName) => !!methods[methodName])
      .map((methodName) => {
        var handler = handlers[methodName]
        if (typeof handler !== 'function') {
          throw new Error(`"${resourceName}" handler "${methodName}" did not export a function`)
        }

        return {
          name: methodName,
          method: methods[methodName].method,
          path: getPath(resourceName, methodName),
          plural: methods[methodName].plural,
          handler: handler,
          model: handlers.model
        }
      })

  return mapValues(resources, getEndpoints)
}
