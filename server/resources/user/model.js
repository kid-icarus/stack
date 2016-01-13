import rethink from 'connections/rethink'
const {type, r} = rethink

const User = rethink.createModel('User', {
  // core fields
  id: type.string().required(),
  role: type.string().enum([
    'pleb',
    'admin'
  ]).default('pleb'),
  times: {
    created: type.date().default(r.now()),
    lastModified: type.date().default(r.now()),
    lastLogin: type.date().default(r.now())
  },

  // user info
  name: type.string().required(),
  email: type.string().email(),
  location: type.string()
})

export default User
