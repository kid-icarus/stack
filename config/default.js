/* eslint spaced-comment:0 */
import path from 'path'

const basePath = path.resolve(__dirname, '../')
const config = {
  env: process.env.NODE_ENV,
  cookie: {
    name: 'x',
    secret: 'stack-cookie-secret-1337'
  },

  paths: {
    base: basePath,
    public: '/',
    client: path.join(basePath, 'client'),
    dist: path.join(basePath, 'dist'),
    server: path.join(basePath, 'server')
  },

  http: {
    host: '0.0.0.0',
    port: process.env.PORT || 3000
  },

  api: {
    path: '/v1'
  },

  redis: {
    host: 'localhost',
    pass: '',
    index: 2
  },

  rethink: {
    db: 'stack'
  }
}

export default config
