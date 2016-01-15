import rethink from 'connections/rethink'
import addSecurity from 'thinky-security'
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
}, {
  enforce_extra: 'remove'
})

// security
// adds .lens and .authorized to User
// which api loader will use for security
addSecurity(User, {
  document: {
    read: ['public'],
    list: ['loggedIn'],
    create: ['admin'],
    update: ['admin', 'self'],
    replace: ['admin'],
    delete: ['admin']
  },
  read: {
    id: ['public'],
    role: ['admin', 'self'],
    times: ['admin', 'self'],
    facebook: ['admin'],
    name: ['public'],
    email: ['admin', 'self'],
    location: ['loggedIn']
  },
  write: {
    id: ['admin'],
    role: ['admin'],
    times: ['admin'],
    facebook: ['admin'],
    name: ['admin', 'self'],
    email: ['admin', 'self'],
    location: ['admin', 'self']
  }
})

// other junk
User.pre('save', (next) => {
  this.times.lastModified = Date.now()
  next()
})

export default User
