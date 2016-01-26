import React from 'react'
import { PropTypes } from 'shasta'
import { FormComponent, Form, Field, connect } from 'shasta-forms'

// ##PersonForm
// #### example shasta-forms usage

// extend form component
class PersonForm extends FormComponent {
  // name of form (required)
  static formName = 'person';
  static propTypes = {
    title: PropTypes.string,
    handleSubmit: PropTypes.func
  };
  render () {
    return (
      <div>
        <h3>{this.props.title}</h3>
        <Form {...this.props} className='ui form'>
          // simply define a Field, with options like *required*
          <Field name='name' required />
          <Field name='location' required placeholder='San Francisco, CA' />
          <div className='field'>
            <label>Images</label>
            <Field name='smallImage' placeholder='//me.com/smallImage.png' noLabel />
            <Field name='largeImage' placeholder='//me.com/largeImage.png' noLabel />
          </div>
          <div className='six wide field'>
            <Field name='email' type='email' />
            <Field name='twitter' />
            <Field name='facebook' />
            <Field name='instagram' />
          </div>
          <button className='ui button' onClick={this.props.handleSubmit}>Submit</button>
        </Form>
      </div>
    )
  }
}

// connect the form
export default connect(PersonForm)
