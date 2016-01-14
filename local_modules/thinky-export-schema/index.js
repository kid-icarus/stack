const exportSchema = (schema) =>
  Object.keys(schema).reduce((p, k) => {
    var v = schema[k]
    if (v._schema) {
      p[k] = exportSchema(v._schema)
    } else {
      p[k] = v.constructor.name.replace(/^Type/, '')
    }
    return p
  }, {})

export default (model) => exportSchema(model._schema._schema)
