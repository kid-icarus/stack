import User from './model'
import decl from 'rethink-decl'

export default (opt, cb) => {
  if (!User.authorized(opt.user, 'list')) {
    return cb({status: 403})
  }

  decl(User, opt.options).run(cb)
}
