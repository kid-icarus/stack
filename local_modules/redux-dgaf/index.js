import {PropTypes} from 'react'
import PureComponent from 'react-pure-render/component'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

const mapStateToProps = (state) => ({ __store: state })

const mapDispatchToProps = (actions) => (dispatch) => {
  return {
    __actions: actions ? bindActionCreators(actions, dispatch) : {}
  }
}

class DGAFComponent extends PureComponent {
  static propTypes = {
    __store: PropTypes.object.isRequired,
    __actions: PropTypes.object.isRequired
  }

  constructor (props) {
    super(props)

    // autobind all fns like old react
    Object.getOwnPropertyNames(this.constructor.prototype)
      .filter((prop) => typeof this[prop] === 'function')
      .forEach((method) => this[method] = this[method].bind(this))
  }

  getCollection (type) {
    return this.getCollectionIds(type).map((id) => this.getEntity(type, id))
  }
  getCollectionIds (type) {
    var entities = this.rootState.entities[type] || {}
    return Object.keys(entities)
  }
  getEntity (type, id) {
    var entities = this.rootState.entities[type] || {}
    return entities[id]
  }

  get actions () {
    return this.props.__actions
  }

  get rootState () {
    return this.props.__store
  }
}
DGAFComponent.connect = (actions, view) => connect(mapStateToProps, mapDispatchToProps(actions))(view)

export default DGAFComponent
