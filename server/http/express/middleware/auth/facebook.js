import everyauth from 'everyauth'
import config from 'app-config-chain'
import User from 'resources/user/model'

const dataToUser = (data) => ({
  name: data.name,
  email: data.email,
  facebook: {
    id: data.id,
    accessToken: data.accessToken
  }
})

const findOrCreateUser = (session, accessToken, {expires}, fbMeta) => {
  var potentialUser = dataToUser({
    ...fbMeta,
    accessToken: accessToken
  })
  console.log(potentialUser)
  User.get()
}

const fb = everyauth.facebook
  .appId(config.facebook.id)
  .appSecret(config.facebook.secret)
  .mobile(true)
  .scope('email')
  .fields('id,name,email,picture')
  .findOrCreateUser(findOrCreateUser)

fb.redirectPath((req, res) => {
  console.log(123, req.query.redirect_uri)
  return '/'
})

export default fb
