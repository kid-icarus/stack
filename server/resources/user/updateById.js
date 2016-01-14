import User from './model'

export default (opt, cb) => {
  if (!opt.user) {
    return cb({
      status: 403,
      error: 'Not logged in'
    })
  }

  if (opt.id !== opt.user.id) {
    return cb({
      status: 403,
      error: 'You can only modify your own profile'
    })
  }

  var change = User.lens(opt.user, opt.data)
  delete change.id

  User.get(opt.id)
    .update(change, {returnChanges: true})
    .run((err, res) => {
      cb(err, res && res.changes[0].new_val)
    })
}
