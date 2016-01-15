import lens from 'object-lens'
import intersection from 'lodash.intersection'

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
      return data.map(Model.lens.bind(null, user, type))
    }
    var roles = getRoles(user, data)
    return lens(rules[type], roles, data)
  })
  Model.define('authorized', (user, type) => Model.authorized(user, type))
  Model.define('lens', (user, type) => Model.lens(user, type, this))
  return Model
}
