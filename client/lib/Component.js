import {PropTypes} from 'react'
import PureComponent from 'react-pure-render/component'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import actions from 'actions'

const mapStateToProps = (state) => ({ _store: state })

const mapDispatchToProps = (dispatch) => ({
  _actions: bindActionCreators(actions, dispatch)
})

const OurComponent = class Component extends PureComponent {
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
OurComponent.connect = connect(mapStateToProps, mapDispatchToProps)

export default OurComponent
