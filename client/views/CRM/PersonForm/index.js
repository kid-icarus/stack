import React from 'react'
import { PropTypes, Component } from 'shasta'
import { Form, Field, shastaForm } from 'shasta-forms'
// import { fields, validate } from './schema'
// import schema from './schema'
import buildSchema from 'redux-form-schema'

// Schema - define form fields
let schema = {
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
}

const {fields, validate} = buildSchema(schema)

class PersonForm extends Component {
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
          <Field name='location' />
          <div className='field'>
            <label>Images</label>
            <Field name='smallImage' noLabel />
            <Field name='largeImage' noLabel />
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
export default shastaForm({
  name: 'person',
  fields: fields,
  validate: validate
})(PersonForm)
