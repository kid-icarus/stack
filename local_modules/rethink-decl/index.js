import omit from 'lodash.omit'

var ourOptions = [
  'count',
  'offset',
  'page',
  'filter'
]

// TODO:
// security (pass in role)
// sort
// index search
// count (+ range header support)
export default (Model, opt) => {
  var filter = omit(opt, ourOptions)
  var count = +opt.count || 100
  var offset = +opt.offset || 0
  if (opt.page) offset += opt.page * count

  return Model
    .filter(filter)
    .slice(offset, offset + count)
}
