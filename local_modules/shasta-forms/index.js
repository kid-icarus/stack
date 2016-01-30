// shasta-forms
// experiemental, api will change [1/24/16]

// see `/client/views/CRM/PersonForm.js` for example

// TODO:
// - replace schema with expressing props on Field elements
// - create custom form element components

import React from 'react'
import jif from 'jif'
import classNames from 'classnames'
import startCase from 'lodash.startcase'
import { fromJS } from 'immutable'
import { reducer as formReducer, reduxForm } from 'redux-form'
import { Component, PropTypes } from 'shasta'
import buildSchema from 'redux-form-schema'

// recursively reduce form fields into a schema

let reduceSchema = (schema, field) => {
  // recurse if children is an array (if element has child elements)
  if (Array.isArray(field.props.children)) {
    return field.props.children.reduce(reduceSchema, schema)
  } else if (field.type.displayName === 'Field') {
    let fieldProps = Object.assign({}, field.props)
    // label is specified or uppercase name
    fieldProps.label = field.props.label || startCase(field.props.name)
    schema[fieldProps.name] = fieldProps
    return schema
  } else {
    return schema
  }
}

// Form
// redux-form form container that abstracts need for defining required props
// and provides fields to child *Field* elements via context

export class Form extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    fields: PropTypes.object,
    handleSubmit: PropTypes.func,
    onFormSubmit: PropTypes.func.isRequired,
    resetForm: PropTypes.func,
    submitting: PropTypes.bool,
    children: PropTypes.node,
    errors: PropTypes.object,
    className: PropTypes.string
  };
  getSchema (form) {
    return form.reduce(reduceSchema, {})
  }
  getForm () {
    // TODO: iterate through children looking for <Form>
    let form = this.props.children
    let schema = this.getSchema(form)
    class myForm extends Component {
      static propTypes = {
        actions: PropTypes.object
      };
      static childContextTypes = {
        fields: React.PropTypes.object
      };
      getChildContext () {
        return {fields: this.props.fields}
      }
      render () {
        // noValidate turns off browser validation
        // TODO: turn off our validation if they want it on
        return (<form className={this.props.className} onSubmit={this.props.handleSubmit(this.props.onFormSubmit)} noValidate>{form}</form>)
      }
    }

    // connect redux-form
    let formcom = connect(this.props.name, schema, myForm)
    return React.createElement(formcom, this.props)
  }
  render () {
    return (this.getForm())
  }
}

// Field
// wraps label, input and error handling into one component
// options are loaded from schema into parent form

// - name: name of the field, used for error handling, redux-form integration and auto-label
// - type: simple input type
// - noLabel: include (set to true) in tag if you want to not have a lable
// - label: set a label explicitly

// TODO:
// - support passing plain old inputs
// - support input components

export class Field extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    inputType: PropTypes.string,
    noLabel: PropTypes.bool,
    label: PropTypes.string
  };
  static contextTypes = {
    fields: PropTypes.object,
    doRender: PropTypes.bool
  };
  static defaultProps = {
    inputType: 'text'
  };
  render () {
    let label = this.props.label || startCase(this.props.name)
    let field = this.context.fields[this.props.name]
    let isError = (field.error && field.touched)
    return (
      // mixin error class if there's an error
      <div ref={this.props.name} className={classNames('field', {'error': isError})}>
        {(this.props.noLabel) ? null : <label>{label}</label>}
        <input type={this.props.inputType} {...field} {...this.props} style={{WebkitValidationBubbleMessage: {display: 'none'}}} />
        {
          jif(isError, () =>
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

// connect
// wraps redux-form decorator and provides some default values
// (http://erikras.github.io/redux-form/)

// * reduxMountPoint: where in the store forms should be mounted- default is 'form', we default to 'forms'
// * form: static.formName, simply the form's name
// * getFormState: convert to JS for redux-form to work with immutable.js

export const connect = (name, schema, form, opt = {}) => {
  // redux-form-schema decoration
  const {fields, validate} = buildSchema(schema)
  return reduxForm({
    reduxMountPoint: 'forms',
    form: name,
    fields: fields,
    validate: validate,
    getFormState: (state, cursor) => state.get(cursor).toJS(),
    ...opt
  })(form)
}

// reducer
// redux-form reducer wrapped to support immutable.js

export const reducer = (state, action) =>
  fromJS(formReducer(state ? state.toJS() : {}, action))

// export redux-form's getValues

export const getValues = reduxForm.getValues
