import User from './model'
import changeStream from 'rethinkdb-change-stream'

export default (opt, cb) => {
  if (!User.authorized('read', opt.user)) {
    return cb({status: 403})
  }

  var q = User.get(opt.id)

  if (opt.tail) {
    return changeStream(q.changes())
  } else {
    q.run(cb)
  }
}
