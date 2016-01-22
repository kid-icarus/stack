import React, {Component, PropTypes} from 'react'
import {reduxForm} from 'redux-form'

class PersonForm extends Component {
  static propTypes = {
    fields: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired
  };

  render () {
    const {
      fields: {name, smallImage, largeImage, location, email, twitter, facebook, instagram},
        handleSubmit
      } = this.props
    return (
      <form className='ui form' onSubmit={handleSubmit}>
        <h3 className='ui dividing header'>New Person</h3>
        <div className='field'>
          <label>Name</label>
          <div className='field'>
            <input type='text' placeholder='Name' {...name} />
          </div>
          <label>Location</label>
          <div className='field'>
            <input type='text' placeholder='Los Angeles, CA' {...location} />
          </div>
          <label>Images</label>
          <div className='field'>
            <input type='text' placeholder='http://me.com/small.png' {...smallImage} />
          </div>
          <div className='field'>
            <input type='text' placeholder='http://me.com/large.png' {...largeImage} />
          </div>
        </div>
        <div className='field'>
          <label>Social</label>
          <div className='six wide field'>
            <input type='text' placeholder='Email' {...email} />
          </div>
          <div className='six wide field'>
            <input type='text' placeholder='Twitter' {...twitter} />
          </div>
          <div className='six wide field'>
            <input type='text' placeholder='Facebook' {...facebook} />
          </div>
          <div className='six wide field'>
            <input type='text' placeholder='Instagram' {...instagram} />
          </div>
        </div>
        <button className='ui button' onClick={handleSubmit}>Submit</button>
      </form>
    )
  }
}

export default reduxForm({
  form: 'simple',
  fields: ['name', 'smallImage', 'largeImage', 'location', 'email', 'twitter', 'facebook', 'instagram'],
  getFormState: (state, reduxMountPoint) => state.get(reduxMountPoint).toJS()
})(PersonForm)
