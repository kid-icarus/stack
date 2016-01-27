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
  if (user && user.roles) roles = roles.concat(user.roles)
  if (user && data && user.id === data.id) roles.push('self')
  return roles
}

// Security Schema:
// All values should be an array of roles
// - document
//   - read
//   - create
//   - update
//   - replace
//   - delete
// - read
//   - $fieldName
// - write
//   - $fieldName

// user roles come from:
// - 'public' (always)
// - 'loggedIn' (if user object exists)
// - 'self' (if document.id === user.id)
// - '{user.role}' (if user object provided has a `role` field that is a string)
// - '{user.roles}' (if user object provided has a `roles` field that is an array)

// Model.security:
// - the security rules you passed in

// Model.authorized(user, type):
// - user = requesting users object, optional
// - type = type of access, possibles: read, create, update, replace, delete
// if rules.document is not defined, return false
// if rules.document[type] is not defined, return false
// if rules.document[type] does not include any of the users roles, return false
// if rules.document[type] includes at least one of the users roles, return true

// Model.lens(user, type, data)
// - user = requesting users object, optional
// - type = type of access, possibles: read, write
// - data = data to be sanitized, can be an object or array
// if data is not an object or array, return it
// if rules[type] is not defined, return null
// return object where all fields the user doesnt have access to are removed

export default (Model, rules) => {
  Model.security = rules
  Model.defineStatic('authorized', (user, type) => {
    if (!rules.document || !rules.document[type]) return false
    return intersection(getRoles(user), rules.document[type]).length !== 0
  })
  Model.defineStatic('lens', (user, type, data) => {
    if (data == null) return data
    if (!rules[type]) return null

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
