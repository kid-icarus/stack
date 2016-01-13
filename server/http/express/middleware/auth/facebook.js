import everyauth from 'everyauth'
import config from 'app-config-chain'
import p2c from 'promise-to-callback'
import User from 'resources/user/model'

const dataToUser = (data) => ({
  id: `fb-${data.id}`,
  name: data.name,
  email: data.email,
  facebook: {
    id: data.id,
    accessToken: data.accessToken
  }
})

const findOrCreateUser = (session, accessToken, {expires}, fbMeta) =>
  User.insert(
    dataToUser({...fbMeta, accessToken: accessToken})
  ,
    {conflict: 'update', returnChanges: true}
  ).then((data) => new User(data.changes[0].new_val))

const fb = everyauth.facebook
  .appId(config.facebook.id)
  .appSecret(config.facebook.secret)
  .mobile(true)
  .scope('email')
  .fields('id,name,email,picture')
  .findOrCreateUser(findOrCreateUser)
  .findUserById((id, cb) => p2c(User.get(id))(cb))

fb.redirectPath((req, res) => req.query.to || '/')

export default fb
