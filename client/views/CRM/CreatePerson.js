import React, {PropTypes} from 'react'
import { Component } from 'shasta'
import PersonForm from './PersonForm'
import './index.sass'
// import PersonForm from './PersonForm'

export class CreatePerson extends Component {
  handleSubmit (data) {
    console.log('handle submit')
    console.log(data)
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
