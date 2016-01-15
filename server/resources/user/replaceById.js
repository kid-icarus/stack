import User from './model'

export default (opt, cb) => {
  if (!User.authorized(opt.user, 'replace')) {
    return cb({status: 403})
  }

  var change = User.lens(opt.user, 'write', opt.data)
  User.get(opt.id)
    .replace(change, {returnChanges: true})
    .run((err, res) => {
      cb(err, res && res.changes[0].new_val)
    })
}
