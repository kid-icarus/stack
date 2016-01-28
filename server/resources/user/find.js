import User from './model'
import decl from 'rethink-decl'
import changeStream from 'rethinkdb-change-stream'

export default (opt, cb) => {
  /*
  if (!User.authorized('list', opt.user)) {
    return cb({status: 403})
  }
  */

  var q = decl(User, {
    tail: opt.tail,
    options: opt.options
  })

  if (opt.tail) {
    return changeStream(q)
  } else {
    q.run(cb)
  }
}
