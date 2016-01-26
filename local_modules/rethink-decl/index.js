import omit from 'lodash.omit'

var ourOptions = [
  'limit',
  'offset',
  'page',
  'filter',
  'tail'
]

export default (Model, {tail, options}) => {
  var filter = omit(options, ourOptions)
  var limit = +options.limit || 100
  var offset = +options.offset || 0
  if (options.page) offset += options.page * limit

  var q = Model.filter(filter)
  if (tail) {
    q = q.changes()
  } else {
    q = q.slice(offset, offset + limit)
  }

  return q
}
