import {PropTypes} from 'react'
import PureComponent from 'react-pure-render/component'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

const mapStateToProps = (state) => ({ _store: state })

const mapDispatchToProps = (actions) => (dispatch) => ({
  _actions: bindActionCreators(actions, dispatch)
})

class DGAFComponent extends PureComponent {
  static propTypes = {
    _store: PropTypes.shape({
      entities: PropTypes.object.isRequired,
      counter: PropTypes.number.isRequired
    }),
    _actions: PropTypes.shape({
      double: PropTypes.func.isRequired,
      increment: PropTypes.func.isRequired,
      decrement: PropTypes.func.isRequired,
      zero: PropTypes.func.isRequired,
      getOrgs: PropTypes.func.isRequired
    })
  }

  entities (type) {
    var entities = this.store().entities[type] || {}
    return Object.keys(entities)
  }
  entity (type, id) {
    var entities = this.store().entities[type] || {}
    return entities[id]
  }

  actions () {
    return this.props._actions
  }

  store () {
    return this.props._store
  }
}
DGAFComponent.connect = (actions, view) => connect(mapStateToProps, mapDispatchToProps(actions))(view)

export default DGAFComponent
