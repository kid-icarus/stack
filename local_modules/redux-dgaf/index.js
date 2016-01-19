import {PropTypes} from 'react'
import PureComponent from 'react-pure-render/component'
import { connect } from 'react-redux'

// supports array of strings, strings with dot, or function
const lookup = (o, k) =>
  o.getIn(
    Array.isArray(k)
    ? k
    : (typeof k === 'function'
      ? k()
      : k.split('.'))
  )

const mapStateToProps = (view) => (storeState) => {
  let cursorData = {}
  if (view.cursors) {
    cursorData = Object.keys(view.cursors).reduce((p, k) => {
      p[k] = lookup(storeState, view.cursors[k])
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
