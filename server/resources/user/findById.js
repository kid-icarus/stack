import User from './model'

export default (opt, cb) => {
  if (!opt.user) {
    return cb({
      status: 403,
      error: 'Not logged in'
    })
  }

  User.get(opt.id).run(cb)
}
