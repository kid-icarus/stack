import through from 'through2'

export default (q) => {
  var stream = through.obj()

  q.then(feed => {
    if (!feed.each) {
      throw new Error('Passed in a query with no change feed')
    }
    stream.once('end', () => feed.close())

    feed.each((err, doc) => {
      if (err) return stream.emit('error', err)

      var old = doc.getOldValue()
      if (doc.isSaved() === false) {
        return stream.write({
          type: 'delete',
          data: {
            document: doc
          }
        })
      }

      if (old == null) {
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
          document: old,
          change: doc
        }
      })
    })
  }).error(err => stream.emit('error', err))

  return stream
}
