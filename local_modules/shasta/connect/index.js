import { connect } from 'react-redux'
import mapStateToProps from './mapStateToProps'
import mapDispatchToProps from './mapDispatchToProps'

export default (view, actions) => {
  if (!view) {
    throw new Error('Missing view argument in connect(view, actions)')
  }
  if (!actions) {
    throw new Error('Missing actions argument in connect(view, actions)')
  }
  return connect(
    mapStateToProps(view),
    mapDispatchToProps(actions)
  )(view)
}
