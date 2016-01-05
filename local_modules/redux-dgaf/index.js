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

  entity (type) {
    var getIds = this.getEntityIds.bind(this, type)
    var getById = this.getEntityById.bind(this, type)
    return {
      getIds: getIds,
      getById: getById,

      // functional helpers
      length: () => getIds().length,
      toArray: () => getIds().map((id, ...rest) => getById(id))
    }
  }

  getEntityIds (type) {
    var entities = this.getStore().entities[type] || {}
    return Object.keys(entities)
  }
  getEntityById (type, id) {
    var entities = this.getStore().entities[type] || {}
    return entities[id]
  }

  getActions () {
    return this.props._actions
  }

  getStore () {
    return this.props._store
  }
}
DGAFComponent.connect = (actions, view) => connect(mapStateToProps, mapDispatchToProps(actions))(view)

export default DGAFComponent
