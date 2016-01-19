export const http = {
  method: 'GET',
  instance: false
}

export default (opt, cb) => {
  cb(null, {test: 123})
}
