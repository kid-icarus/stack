import {compose} from 'compose-middleware'
import {Router} from 'express'
import passport from 'passport'
import User from 'resources/user/model'
import fb from './facebook'

const router = Router({mergeParams: true})

router.get('/auth/logout', (req, res) => {
  req.logout()
  res.redirect('/')
})

router.get('/initialState.js', (req, res) => {
  var initialState = {
    me: req.user ? User.lens(req.user, 'read', req.user) : null
  }
  res.status(200)
  res.type('text/javascript')
  res.send(`window.__INITIAL_STATE__= (${JSON.stringify(initialState)});`)
  res.end()
})

export default compose([
  passport.initialize(),
  passport.session(),
  fb,
  router
])
