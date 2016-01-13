/* eslint spaced-comment:0 */
import path from 'path'

const basePath = path.resolve(__dirname, '../')
const config = {
  // core stuff
  env: process.env.NODE_ENV,

  paths: {
    base: basePath,
    public: '/',
    client: path.join(basePath, 'client'),
    dist: path.join(basePath, 'dist'),
    server: path.join(basePath, 'server')
  },

  // http stuff
  http: {
    host: '0.0.0.0',
    port: process.env.PORT || 3000
  },

  cookie: {
    name: 'x',
    secret: 'stack-cookie-secret-1337'
  },

  api: {
    path: '/v1'
  },

  // databases
  redis: {
    host: 'localhost',
    pass: '',
    index: 2
  },

  rethink: {
    db: 'stack'
  },

  // auth stuff
  facebook: {
    id: '946814205398323',
    secret: '568fa31830811386f09b195091cbb699'
  }
}

export default config
