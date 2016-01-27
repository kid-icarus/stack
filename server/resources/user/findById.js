import User from './model'
import changeStream from 'rethinkdb-change-stream'

export default (opt, cb) => {
  if (!User.authorized(opt.user, 'read')) {
    return cb({status: 403})
  }

  var q = User.get(opt.id)

  if (opt.tail) {
    return changeStream(q.changes())
  } else {
    q.run(cb)
  }
}
