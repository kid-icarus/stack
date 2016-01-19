import User from './model'

export default (opt, cb) => {
  if (!User.authorized(opt.user, 'create')) {
    return cb({status: 403})
  }

  var doc = User.lens(opt.user, 'write', opt.data)
  User.insert(doc, {returnChanges: true}).execute((err, res) => {
    cb(err, res && new User(res.changes[0].new_val))
  })
}
