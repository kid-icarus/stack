import React from 'react'
import { PropTypes, Component } from 'shasta'
import { Form, FormComponent } from 'shasta-forms'
// export const fields = ['name', 'location', 'smallImage', 'largeImage', 'email', 'twitter', 'facebook', 'instagram', 'id']

// import { fields, validate } from './schema'
import classNames from 'classnames'

import schema from './schema'
import buildSchema from 'redux-form-schema'

const {fields, validate} = buildSchema(schema)

console.log('schema')
console.log(schema)

let frm = (schema, fields) => {
  return {
    Field: class Field extends Component {
      render () {
        console.log('in field')
        console.log(fields)
        console.log(schema)
        return (
        <label>Name</label>
        )
      }
    }
  }
}

const {Field} = frm(schema, fields)
console.log('field')
console.log(Field)

class PersonForm extends FormComponent {
  static propTypes = {
    title: PropTypes.string.isRequired
  };
  render () {
    const {title, fields, handleSubmit, errors} = this.props
    console.log(errors)
    console.log(fields.name)
    return (
      <div>
        <h3>{title}</h3>
        <form className='ui form' onSubmit={handleSubmit}>
          <input type='hidden' {...fields.id} />

          <Field name='name' />

          <div className={classNames('field', {'error': fields.name.error})}>
            <label>Name</label>
            <input type='text' placeholder='Name' {...fields.name} />
          </div>

            <label>Location</label>
            <div className='field'>
              <input type='text' placeholder='Los Angeles, CA' {...fields.location} />
            </div>
            <label>Images</label>
            <div className='field'>
              <input type='text' placeholder='http://me.com/small.png' {...fields.smallImage} />
            </div>
            <div className='field'>
              <input type='text' placeholder='http://me.com/large.png' {...fields.largeImage} />
            </div>
          <div className='field'>
            <label>Social</label>
            <div className='six wide field'>
              <input type='text' placeholder='Email' {...fields.email} />
            </div>
            <div className='six wide field'>
              <input type='text' placeholder='Twitter' {...fields.twitter} />
            </div>
            <div className='six wide field'>
              <input type='text' placeholder='Facebook' {...fields.facebook} />
            </div>
            <div className='six wide field'>
              <input type='text' placeholder='Instagram' {...fields.instagram} />
            </div>
          </div>
          <button className='ui button' onClick={handleSubmit}>Submit</button>
        </form>
      </div>
    )
  }
}

export default Form({
  name: 'person',
  fields: fields,
  validate: validate
})(PersonForm)
