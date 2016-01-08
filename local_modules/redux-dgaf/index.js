import {PropTypes} from 'react'
import PureComponent from 'react-pure-render/component'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

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

  return {
    storeState,
    ...cursorData
  }
}
const mapDispatchToProps = (actions) => (dispatch) =>
  ({actions: actions ? bindActionCreators(actions, dispatch) : {}})

class DGAFComponent extends PureComponent {
  static propTypes = {
    storeState: PropTypes.object.isRequired,
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

  // global state accessors
  get $actions () {
    return this.props.actions
  }
  get $state () {
    return this.props.storeState
  }
  get $entities () {
    return this.$state.get('entities')
  }
  get $requests () {
    return this.$state.get('requests')
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
