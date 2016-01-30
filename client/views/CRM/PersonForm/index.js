import React from 'react'
import { PropTypes, Component } from 'shasta'
import { Form, Field } from 'shasta-forms'

// PersonForm
// example shasta-forms usage

class PersonForm extends Component {
  static propTypes = {
    title: PropTypes.string,
    handleSubmit: PropTypes.func
  };
  static contextTypes = {
    router: PropTypes.object.isRequired
  };
  handleSubmit (data) {
    this.actions.people.save(data)
    this.context.router.replace('/crm')
  }
  render () {
    return (
      <div>
        <h3>{this.props.title}</h3>
        <Form name='person' className='ui form' onFormSubmit={this.handleSubmit}>
          {/* simply define a Field, with options like required */}
          <Field
            name='name'
            required />
          <Field name='location' required placeholder='San Francisco, CA' />
          <div className='field'>
            <label>Images</label>
            <Field name='smallImage' placeholder='//me.com/smallImage.png' noLabel />
            <Field name='largeImage' placeholder='//me.com/largeImage.png' noLabel />
          </div>
          <div className='six wide field'>
            {/* type='email' gives you email validation */}
            <Field name='email' type='email' />
            <Field name='twitter' />
            <Field name='facebook' />
            <Field name='instagram' />
          </div>
          <button type='submit' className='ui button'>Submit</button>
        </Form>
      </div>
    )
  }
}

// connect the Component
export default Component.connect(PersonForm, require('core/actions'))
