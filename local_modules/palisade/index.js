import lens from 'object-lens'
import intersection from 'lodash.intersection'
import map from 'lodash.map'
import mapValues from 'lodash.mapvalues'

export const sanitizeData = (user, data) => {
  // check if the user can even see the doc
  if (data && data.authorized &&
    !data.authorized(user, 'read')) {
    return
  }
  // single instance w/ lens
  if (data && data.lens) {
    return data.lens(user, 'read')
  }

  // array of instances w/ lens
  if (Array.isArray(data)) {
    return map(data, sanitizeData.bind(null, user))
  }

  if (typeof data === 'object') {
    return mapValues(data, sanitizeData.bind(null, user))
  }

  return data
}

const getRoles = (user, data) => {
  var roles = ['public']
  if (user) roles.push('loggedIn')
  if (user && user.role) roles.push(user.role)
  if (user && data && user.id === data.id) roles.push('self')
  return roles
}

export default (Model, rules) => {
  Model.security = rules
  Model.defineStatic('authorized', (user, type) => {
    if (!rules.document || !rules.document[type]) return true // default public
    return intersection(getRoles(user), rules.document[type]).length !== 0
  })
  Model.defineStatic('lens', (user, type, data) => {
    if (data == null) return data
    if (!rules[type]) return data // no schema, default to public

    if (Array.isArray(data)) {
      return map(data, Model.lens.bind(null, user, type))
    }
    var roles = getRoles(user, data)
    return lens(rules[type], roles, data)
  })
  Model.define('authorized', function (user, type) {
    return Model.authorized(user, type)
  })
  Model.define('lens', function (user, type) {
    return Model.lens(user, type, this)
  })
  return Model
}
