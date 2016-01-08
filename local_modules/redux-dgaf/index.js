import {PropTypes} from 'react'
import PureComponent from 'react-pure-render/component'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

const mapStateToProps = (state) => ({__store: state})
const mapDispatchToProps = (actions) => (dispatch) =>
  ({__actions: actions ? bindActionCreators(actions, dispatch) : {}})

class DGAFComponent extends PureComponent {
  static propTypes = {
    __store: PropTypes.object.isRequired,
    __actions: PropTypes.object.isRequired
  };

  constructor (props, context) {
    super(props, context)

    if (this.constructor.initialState) {
      this.state = this.constructor.initialState
    }

    // autobind all fns like old react
    Object.getOwnPropertyNames(this.constructor.prototype)
      .filter((prop) => typeof this[prop] === 'function')
      .forEach((method) => this[method] = this[method].bind(this))
  }

  // global state accessors
  get $actions () {
    return this.props.__actions
  }
  get $state () {
    return this.props.__store
  }
  get $entities () {
    return this.props.__store.get('entities')
  }
  get $requests () {
    return this.props.__store.get('requests')
  }
}
DGAFComponent.connect = (actions, view) => connect(mapStateToProps, mapDispatchToProps(actions))(view)

export default DGAFComponent
