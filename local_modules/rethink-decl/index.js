import omit from 'lodash.omit'

var ourOptions = [
  'limit',
  'offset',
  'page',
  'filter',
  'feed'
]

export default (Model, opt) => {
  var filter = omit(opt, ourOptions)
  var limit = +opt.limit || 100
  var offset = +opt.offset || 0
  if (opt.page) offset += opt.page * limit

  var q = Model.filter(filter)
  if (!opt.feed) {
    q = q.slice(offset, offset + limit)
  }

  if (opt.feed) {
    q = q.changes()
  }

  return q
}
