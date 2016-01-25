import through from 'through2'

export default (q) => {
  var stream = through.obj()

  q.then(feed => {
    stream.once('end', () => feed.close())

    feed.each((err, doc) => {
      if (err) return stream.emit('error', err)

      if (doc.isSaved() === false) {
        return stream.write({
          type: 'delete',
          data: {
            document: doc
          }
        })
      }

      if (doc.getOldValue() == null) {
        return stream.write({
          type: 'insert',
          data: {
            document: doc
          }
        })
      }

      return stream.write({
        type: 'update',
        data: {
          document: doc.getOldValue(),
          change: doc
        }
      })
    })
  }).error(err => stream.emit('error', err))

  return stream
}
