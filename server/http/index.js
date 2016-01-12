import http from 'http'
import expressApp from './express'

const httpServer = http.createServer(expressApp)

export default httpServer
