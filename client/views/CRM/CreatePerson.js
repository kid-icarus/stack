import React from 'react'
import { Component } from 'shasta'
import PersonForm from './PersonForm'
import './index.sass'

class CreatePerson extends Component {
  static contextTypes = {
    router: React.PropTypes.object.isRequired
  };
  handleSubmit (data) {
    this.actions.people.create(data)
    this.context.router.replace('/crm')
  }
  render () {
    return (
      <div>
        <PersonForm onSubmit={this.handleSubmit} />
      </div>
    )
  }
}

export default Component.connect(CreatePerson, require('core/actions'))
