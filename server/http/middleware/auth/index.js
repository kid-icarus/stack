import {compose} from 'compose-middleware'
import passport from 'passport'
import fb from './facebook'

export default compose([
  passport.initialize(),
  passport.session(),
  fb
])
