import { http } from 'app-config-chain'
import server from '../../server'
import _debug from 'debug'

const debug = _debug('app:bin:server')

server.listen(http.port, http.host, function () {
  debug('Server is now running at', `${http.host}:${http.port}`)
})
