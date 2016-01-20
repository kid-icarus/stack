import omit from 'lodash.omit'

var ourOptions = [
  'count',
  'offset',
  'page',
  'filter',
  'feed'
]

export default (Model, opt) => {
  var filter = omit(opt, ourOptions)
  var count = +opt.count || 100
  var offset = +opt.offset || 0
  if (opt.page) offset += opt.page * count

  var q = Model.filter(filter)
  if (!opt.feed) {
    q = q.slice(offset, offset + count)
  }

  if (opt.feed) {
    q = q.changes()
  }

  return q
}
