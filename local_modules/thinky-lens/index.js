import lens from 'object-lens'

export default (Model, schema) => {
  Model.defineStatic('lens', (user, data) => {
    if (data == null) return data

    var roles = ['public']
    if (user && user.role) roles.push(user.role)
    if (user && user.id === data.id) roles.push('self')

    if (Array.isArray(data)) {
      return data.map(Model.lens.bind(null, user))
    }
    return lens(schema, roles, data)
  })
  Model.define('lens', (user) => Model.lens(user, this))
  return Model
}
