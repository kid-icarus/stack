import map from 'through2-map'

export default (stream, res, formatter) => {
  res.status(200)
  res.type('text/event-stream')
  res.set('Cache-control', 'no-cache')

  stream
    .pipe(map.obj(({type, data}) =>
      `${type}: ${JSON.stringify(formatter ? formatter(data) : data)}\n\n`
    ))
    .pipe(res)

  res.once('close', () => stream.end())
}
