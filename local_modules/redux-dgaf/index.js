import {PropTypes} from 'react'
import PureComponent from 'react-pure-render/component'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

const mapStateToProps = (state) => ({ _store: state })

const mapDispatchToProps = (actions) => (dispatch) => {
  return {
    _actions: actions ? bindActionCreators(actions, dispatch) : {}
  }
}

class DGAFComponent extends PureComponent {
  static propTypes = {
    _store: PropTypes.object.isRequired,
    _actions: PropTypes.object.isRequired
  }

  getCollection (type) {
    return this.getCollectionIds(type).map((id) => this.getEntity(type, id))
  }

  getCollectionIds (type) {
    var entities = this.store.entities[type] || {}
    return Object.keys(entities)
  }
  getEntity (type, id) {
    var entities = this.store.entities[type] || {}
    return entities[id]
  }

  get actions () {
    return this.props._actions
  }

  get store () {
    return this.props._store
  }
}
DGAFComponent.connect = (actions, view) => connect(mapStateToProps, mapDispatchToProps(actions))(view)

export default DGAFComponent
