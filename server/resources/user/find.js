import User from './model'

export default (opt, cb) => {
  if (!opt.user) {
    return cb({
      status: 403,
      error: 'Not logged in'
    })
  }

  User.filter(opt.options).run(cb)
}
