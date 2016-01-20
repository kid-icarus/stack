import fs from 'fs'
import path from 'path'

const rethinkCert = fs.readFileSync(path.join(__dirname, './rethinkdb.ca'), 'utf8')

const config = {
  // databases
  redis: process.env.REDIS_URL,

  rethink: {
    host: 'aws-us-east-1-portal.6.dblayer.com',
    port: 11244,
    db: 'stack',
    authKey: 'OIFhzghBKMA9VWmTSGvnbyapDDy135d8W9qu3Zrarfk',
    ssl: {
      ca: rethinkCert
    },
    enforce_extra: 'remove'
  },

  // auth stuff
  facebook: {
    id: '946814122064998',
    secret: 'eb7e35157c197272800fe946ee05dc84',
    scope: [
      'email',
      'public_profile',
      'user_about_me',
      'user_birthday',
      'user_location'
    ]
  }
}

export default config
