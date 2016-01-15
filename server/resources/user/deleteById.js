import User from './model'

export default (opt, cb) => {
  if (!User.authorized(opt.user, 'delete')) {
    return cb({status: 403})
  }

  User.delete(opt.id)
    .run((err, res) => {
      cb(err, res && res.changes[0].old_val)
    })
}
