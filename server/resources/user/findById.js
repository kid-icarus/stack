import User from './model'
import changeStream from 'thinky-change-stream'

export default (opt, cb) => {
  if (!User.authorized(opt.user, 'read')) {
    return cb({status: 403})
  }

  var q = User.get(opt.id)

  if (opt.options.feed) {
    return changeStream(q)
  } else {
    q.run(cb)
  }
}
