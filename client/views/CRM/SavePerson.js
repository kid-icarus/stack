import React from 'react'
import { Component, PropTypes } from 'shasta'
import PersonForm from './PersonForm'
import './index.sass'

class CreatePerson extends Component {
  static contextTypes = {
    router: PropTypes.object.isRequired
  };
  static propTypes = {
    params: PropTypes.object,
    people: PropTypes.map.isRequired
  };
  static storeProps = {
    people: 'people'
  };
  getModel (cursor, idName = 'id') {
    return this.props[cursor].get(this.props.params[idName])
  }
  handleSubmit (data) {
    this.actions.people.save(data)
    this.context.router.replace('/crm')
  }
  render () {
    let model = this.getModel('people')
    let title = 'New Person'
    let initialValues = {}
    if (model) {
      initialValues = {initialValues: model.toJS()}
      title = model.get('name')
    }
    return (
      <PersonForm
        onSubmit={this.handleSubmit}
        title={title}
        {...initialValues} />
    )
  }
}

export default Component.connect(CreatePerson, require('core/actions'))
