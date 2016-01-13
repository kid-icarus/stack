import {Router} from 'express'
import passport from 'passport'
import {Strategy} from 'passport-facebook'
import config from 'app-config-chain'
import p2c from 'promise-to-callback'
import User from 'resources/user/model'

const dataToUser = (data) => new User({
  id: `fb-${data.id}`,
  name: data.name,
  email: data.email,
  times: {
    lastLogin: Date.now()
  },
  facebook: {
    id: data.id,
    accessToken: data.accessToken
  }
})

const findOrCreateUser = (accessToken, refreshToken, profile, done) => {
  User.insert(
    dataToUser({...profile._json, accessToken: accessToken})
  ,
    {conflict: 'update', returnChanges: true}
  ).run((err, res) => {
    done(err, res && new User(res.changes[0].new_val))
  })
}

const userToString = (user, cb) => cb(null, user.id)
const stringToUser = (id, cb) => User.get(id).run(cb)

// init the passport junk
const strategy = new Strategy({
  clientID: config.facebook.id,
  clientSecret: config.facebook.secret,
  callbackURL: '/auth/facebook/callback',
  enableProof: true,
  display: 'touch',
  scope: [
    'email',
    'public_profile',
    'user_about_me',
    'user_birthday',
    'user_location'
  ]
}, findOrCreateUser)

passport.use(strategy)
passport.serializeUser(userToString)
passport.deserializeUser(stringToUser)

const start = passport.authenticate('facebook', {
  display: 'touch'
})

const callback = passport.authenticate('facebook', {
  display: 'touch',
  failureRedirect: '/login'
})

// init the router
const router = Router({mergeParams: true})
router.get('/auth/facebook/start', (req, res, next) => {
  if (req.session) req.session.redirectTo = null
  if (!req.query.to) return next()
  if (req.session) req.session.redirectTo = req.query.to
  next()
}, start)

router.get('/auth/facebook/callback', callback, (req, res) => {
  if (req.session && req.session.redirectTo) {
    return res.redirect(`/${req.session.redirectTo}`)
  }
  res.redirect('/')
})

export default router
