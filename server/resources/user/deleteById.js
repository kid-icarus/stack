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
      error: 'You must be an admin to delete a user'
    })
  }

  User.delete(opt.id)
    .run((err, res) => {
      cb(err, res && res.changes[0].old_val)
    })
}
