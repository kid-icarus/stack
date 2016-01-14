import User from './model'

export default (opt, cb) => {
  if (!opt.user) {
    return cb({
      status: 403,
      error: 'Not logged in'
    })
  }
  if (opt.role !== 'admin') {
    return cb({
      status: 403,
      error: 'You must be an admin to replace a user'
    })
  }

  var change = User.lens(opt.user, opt.data)
  User.get(opt.id)
    .replace(change, {returnChanges: true})
    .run((err, res) => {
      cb(err, res && res.changes[0].new_val)
    })
}
