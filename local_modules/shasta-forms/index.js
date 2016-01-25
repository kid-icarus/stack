/*
  shasta-forms
  highly experiemental, api will change [1/24/16]

  - create a simple object schema of allowed fields + validations
  (https://github.com/Lighthouse-io/redux-form-schema)
  - use <Form {...this.props}> to create a form
  - use <Field> to create a managed input
  - decorate with shastaForm
  see /client/views/CRM/PersonForm.js for example

  TODO: create custom form element components

*/

import React from 'react'
import jif from 'jif'
import classNames from 'classnames'
import startCase from 'lodash.startcase'
import { fromJS } from 'immutable'
import { reducer as formReducer, reduxForm } from 'redux-form'
import { Component, PropTypes } from 'shasta'
import buildSchema from 'redux-form-schema'

/*
  Form component
  redux-form form container that abstracts need for defining required props
  and provides fields to child Field elements via context
*/

export class Form extends Component {
  static propTypes = {
    fields: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    resetForm: PropTypes.func.isRequired,
    submitting: PropTypes.bool.isRequired,
    children: PropTypes.node,
    errors: PropTypes.object
  };
  static childContextTypes = {
    fields: React.PropTypes.object
  };
  getChildContext () {
    return {fields: this.props.fields}
  }
  render () {
    return (
      <form className='ui form' onSubmit={this.props.handleSubmit}>
        {this.props.children}
      </form>
    )
  }
}

/*
  Field component
  wraps label, input and error handling into one component
  options are loaded from schema into parent form

  * name: name of the field, used for error handling, redux-form integration and auto-label
  * noLabel: include (set to true) in tag if you want to not have a lable
  * label: set a label explicitly
*/

export class Field extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    type: PropTypes.string,
    noLabel: PropTypes.bool,
    label: PropTypes.string
  };
  static contextTypes = {
    fields: React.PropTypes.object
  };
  static defaultProps = {
    type: 'text'
  };
  render () {
    let field = this.context.fields[this.props.name]
    let label = this.props.label || startCase(this.props.name)
    return (
      // mixin error class if there's an error */}
      <div className={classNames('field', {'error': (field.error && field.touched)})}>
        {/* noLabel */}
        {(this.props.noLabel) ? null : <label>{label}</label>}
        {/* acutal input */}
        <input type={this.props.type} {...field} {...this.props} />
        {
          jif((field.error && field.touched), () =>
            <div
              className='ui basic red pointing prompt label transition visible'>
              {field.error}
            </div>
          )
        }
      </div>
    )
  }
}

/*
  shastaForm decorator
  wraps redux-form decorator and provides some default values
  (http://erikras.github.io/redux-form/)

  * reduxMountPoint: where in the store forms should be mounted- default is 'form', we default to 'forms'
  * form: opt.name - name is an alias for 'form', simply the name of the form
  * getFormState: convert to JS for redux-form to work with immutable.js
*/

export const shastaForm = (opt = {}) => {
  console.log(opt.schema)
  // redux-form-schema decoration
  const {fields, validate} = buildSchema(opt.schema)
  console.log(fields, validate)
  return reduxForm({
    reduxMountPoint: 'forms',
    form: opt.name,
    fields: fields,
    validate: validate,
    getFormState: (state, cursor) => state.get(cursor).toJS(),
    ...opt
  })
}

/*
  reducer
  redux-form reducer wrapped to support immutable.js
*/

export const reducer = (state, action) =>
  fromJS(formReducer(state ? state.toJS() : {}, action))

// export redux-form's getValues
export const getValues = reduxForm.getValues
