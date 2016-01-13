import rethink from 'connections/rethink'
import lens from 'thinky-lens'
const {type, r} = rethink

const User = rethink.createModel('User', {
  // core fields
  id: type.string(),
  role: type.string().enum([
    'pleb',
    'admin'
  ]).default('pleb'),
  times: {
    created: type.date().default(r.now()),
    lastModified: type.date().default(r.now()),
    lastLogin: type.date().default(r.now())
  },

  // auth info
  facebook: {
    id: type.string(),
    accessToken: type.string()
  },

  // user info
  name: type.string(),
  email: type.string().email(),
  location: type.string()
})

// security
lens(User, {
  id: ['public'],
  role: ['admin', 'self'],
  times: ['admin', 'self'],
  facebook: ['admin'],
  name: ['public'],
  email: ['admin', 'self'],
  location: ['public']
})

// other junk
User.pre('save', (next) => {
  this.times.lastModified = Date.now()
  next()
})

export default User
