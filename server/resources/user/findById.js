import User from './model'

export default (opt, cb) => {
  if (!User.authorized(opt.user, 'read')) {
    return cb({status: 403})
  }

  User.get(opt.id).run(cb)
}
