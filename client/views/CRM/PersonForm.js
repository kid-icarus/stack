import React, {Component, PropTypes} from 'react'
import {reduxForm} from 'redux-form'
import {
  Form, Fields, Field, Input, Label, Icon
} from 'react-semantify'

class PersonForm extends Component {
  static propTypes = {
    fields: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired
  };

  render () {
    const { fields: {firstName, lastName}, handleSubmit } = this.props
    return (
      <Form onSubmit={handleSubmit}>
        <Fields>

          <Field>
            <Label>First Name</Label>
            <Input>
              <input type='text' placeholder='First Name' {...firstName}/>
            </Input>
          </Field>

          <Field>
            <Label>Last Name</Label>
            <Input>
              <input type='text' placeholder='First Name' {...lastName}/>
            </Input>
          </Field>
        </Fields>
        <div>
          <button onClick={handleSubmit}>Submit</button>
        </div>
      </Form>
    )
  }
}

export default reduxForm({
  form: 'simple',
  fields: ['firstName', 'lastName'],
  getFormState: (state, reduxMountPoint) => state.get(reduxMountPoint).toJS()
})(PersonForm)
