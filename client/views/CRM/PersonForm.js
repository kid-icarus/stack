import React from 'react'
import { PropTypes } from 'shasta'
import { Form, FormComponent } from 'shasta-forms'
export const fields = ['name', 'location', 'smallImage', 'largeImage', 'email', 'twitter', 'facebook', 'instagram', 'id']

class PersonForm extends FormComponent {
  static propTypes = {
    title: PropTypes.string.isRequired
  };
  render () {
    const {title, fields, handleSubmit} = this.props
    return (
      <div>
      <h3>{title}</h3>
      <form className='ui form' onSubmit={handleSubmit}>
        <input type='hidden' {...fields.id} />
        <div className='field'>
          <label>Name</label>
          <div className='field'>
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
  fields: fields
})(PersonForm)
