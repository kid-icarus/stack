import {PropTypes} from 'react'
import PureComponent from 'react-pure-render/component'
import { connect } from 'react-redux'

const mapStateToProps = (view) => (storeState) => {
  // really simple immutable cursor impl
  // path is either an array of a string
  let cursorData = {}
  if (view.cursors) {
    cursorData = Object.keys(view.cursors).reduce((p, k) => {
      var path = view.cursors[k]
      if (!Array.isArray(path)) {
        path = path.split('.')
      }
      p[k] = storeState.getIn(path)
      return p
    }, cursorData)
  }

  return cursorData
}
const mapDispatchToProps = (getActions) => (dispatch) =>
  ({actions: getActions ? getActions(dispatch) : {}})

class DGAFComponent extends PureComponent {
  static propTypes = {
    actions: PropTypes.object
  };

  constructor (props, context) {
    super(props, context)

    if (this.constructor.defaultState) {
      this.state = this.constructor.defaultState
    }

    // autobind all fns like old react
    Object.getOwnPropertyNames(this.constructor.prototype)
      .filter((prop) => typeof this[prop] === 'function')
      .forEach((method) => this[method] = this[method].bind(this))
  }

  // sugar accessors
  get actions () {
    return this.props.actions
  }
}
DGAFComponent.connect = (view, actions) => {
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

export default DGAFComponent
