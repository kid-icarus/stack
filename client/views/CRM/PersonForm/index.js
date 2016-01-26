import React from 'react'
import { PropTypes } from 'shasta'
import { Form, Field, FormComponent, shastaForm } from 'shasta-forms'

class PersonForm extends FormComponent {
  static formName = 'person';
  static propTypes = {
    title: PropTypes.string.isRequired,
    handleSubmit: PropTypes.func.isRequired
  };
  render () {
    return (
      <div>
        <h3>{this.props.title}</h3>
        <Form {...this.props} className='ui form'>
          <Field name='name' required={true} />
          <Field name='location' required={true} placeholder='San Francisco, CA' />
          <div className='field'>
            <label>Images</label>
            <Field name='smallImage' placeholder='//me.com/smallImage.png' noLabel />
            <Field name='largeImage' placeholder='//me.com/largeImage.png' noLabel />
          </div>
          <div className='six wide field'>
            <Field name='email' />
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

// form decorator
export default shastaForm(PersonForm)
