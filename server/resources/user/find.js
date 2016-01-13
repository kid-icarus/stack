// TODO

export default (opt, cb) => {
  console.log('api user', opt.user)
  if (!opt.user) {
    return cb({
      status: 403,
      error: 'Not logged in'
    })
  }

  cb(null, {test: 123})
}
