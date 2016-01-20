import through from 'through2'

export default (q) => {
  var stream = through.obj()

  q.then(feed => {
    feed.each((err, doc) => {
      if (err) return stream.emit('error', err)

      if (doc.isSaved() === false) {
        return stream.write({
          type: 'delete',
          previous: doc
        })
      }

      if (doc.getOldValue() == null) {
        return stream.write({
          type: 'insert',
          current: doc
        })
      }

      return stream.write({
        type: 'update',
        previous: doc.getOldValue(),
        current: doc
      })
    })
  }).error(err => stream.emit('error', err))

  stream.once('end', () => q.then(feed => feed.close()))

  return stream
}
