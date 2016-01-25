import React from 'react'
import { PropTypes, Component } from 'shasta'
import { Form, Field, shastaForm } from 'shasta-forms'

class PersonForm extends Component {
  static formName = 'person';
  /*
    schema - this will probably go away in favor of declaring directly on tags
    <Field name='name' required='true' validate={{length: {min: 0, max: 40}}} />
  */
  static schema = {
    name: {
      label: 'Name',
      required: true,
      validate: { length: {min: 0, max: 5} }
    },
    location: {label: 'Location', required: true},
    smallImage: {label: '', required: true},
    largeImage: {label: '', required: true},
    email: {label: 'Email', required: true, type: 'email'},
    twitter: {label: 'Twitter', required: true},
    facebook: {label: 'Facebook', required: true},
    instagram: {label: 'Instagram', required: true}
  };
  static propTypes = {
    title: PropTypes.string.isRequired,
    handleSubmit: PropTypes.func.isRequired
  };
  render () {
    return (
      <div>
        <h3>{this.props.title}</h3>
        <Form {...this.props}>
          <Field name='name' />
          <Field name='location' placeholder='San Francisco, CA' />
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
