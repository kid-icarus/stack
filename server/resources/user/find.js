import User from './model'
import decl from 'rethink-decl'
import changeStream from 'thinky-change-stream'

export default (opt, cb) => {
  if (!User.authorized(opt.user, 'list')) {
    return cb({status: 403})
  }

  var q = decl(User, opt.options)

  if (opt.options.feed) {
    return changeStream(q)
  } else {
    q.run(cb)
  }
}
