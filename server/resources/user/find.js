import User from './model'
import decl from 'rethink-decl'

export default (opt, cb) => {
  if (!opt.user) {
    return cb({
      status: 403,
      error: 'Not logged in'
    })
  }

  decl(User, opt.options).run(cb)
}
