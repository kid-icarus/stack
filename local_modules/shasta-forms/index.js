/*
  #shasta-forms
  experiemental, api will change [1/24/16]

  see `/client/views/CRM/PersonForm.js` for example

  TODO:
  - replace schema with expressing props on Field elements
  - create custom form element components
*/

import React from 'react'
import jif from 'jif'
import classNames from 'classnames'
import startCase from 'lodash.startcase'
import { fromJS } from 'immutable'
import { reducer as formReducer, reduxForm } from 'redux-form'
import { Component, PropTypes } from 'shasta'
import buildSchema from 'redux-form-schema'
import {render} from 'react-dom'
import merge from 'lodash.merge'

/*
  ###FormComponent
  Component to extend when using shasta-forms
*/

export class FormComponent extends Component {
  static propTypes = {
    fields: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    resetForm: PropTypes.func.isRequired,
    submitting: PropTypes.bool.isRequired,
    children: PropTypes.node,
    errors: PropTypes.object,
    className: PropTypes.string
  };
  constructor (props, context) {
    super(props, context)
    this.schema = {}
  }
  static childContextTypes = {
    addField: PropTypes.func
  };
  // *getSchema*
  // returns schema to build validation
  getSchema () {
    return this.schema
  }
  getChildContext () {
    return {
      // *addField*
      // builds schema for form
      addField: (field) => {
        this.schema = merge(this.schema, field)
      }
    }
  }
}

/*
  ###Form
  *redux-form* form container that abstracts need for defining required props
  and provides fields to child **Field** elements via context
*/

export class Form extends Component {
  static propTypes = {
    fields: PropTypes.object,
    handleSubmit: PropTypes.func,
    children: PropTypes.node,
    className: PropTypes.string
  };
  static childContextTypes = {
    fields: React.PropTypes.object
  };
  getChildContext () {
    return {fields: this.props.fields}
  }
  render () {
    return (
      <form {...this.props} onSubmit={this.props.handleSubmit}>
        {this.props.children}
      </form>
    )
  }
}

/*
  ###Field
  wraps label, input and error handling into one component
  options are loaded from schema into parent form

  - *name*: name of the field, used for error handling, redux-form integration and auto-label
  - *type*: simple input type
  - *noLabel*: include (set to true) in tag if you want to not have a lable
  - *label*: set a label explicitly

  TODO:
  - support passing plain old inputs
  - support input components
*/

export class Field extends Component {
  componentWillMount () {
    if (this.props) {
      let label = this.props.label || startCase(this.props.name)
      let obj = Object.assign({label: label}, this.props)
      this.context.addField({
        [this.props.name]: obj
      })
    }
  }
  static propTypes = {
    name: PropTypes.string.isRequired,
    inputType: PropTypes.string,
    noLabel: PropTypes.bool,
    label: PropTypes.string
  };
  static contextTypes = {
    fields: PropTypes.object,
    doRender: PropTypes.bool,
    addField: PropTypes.func
  };
  static defaultProps = {
    inputType: 'text'
  };
  render () {
    let label, field
    if (this.props && this.context.fields) {
      label = this.props.label || startCase(this.props.name)
      field = this.context.fields[this.props.name]
    } else {
      label = ''
      field = {}
    }
    let isError = (field.error && field.touched)
    return (
      // mixin error class if there's an error
      <div className={classNames('field', {'error': isError})}>
        {/* noLabel */}
        {(this.props.noLabel) ? null : <label>{label}</label>}
        {/* acutal input */}
        <input type={this.props.inputType} {...field} {...this.props} />
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

/*
  ###connect
  wraps redux-form decorator and provides some default values
  (http://erikras.github.io/redux-form/)

  * reduxMountPoint: where in the store forms should be mounted- default is 'form', we default to 'forms'
  * form: static.formName, simply the form's name
  * getFormState: convert to JS for redux-form to work with immutable.js
*/

export const connect = (form, opt = {}) => {
  let el = React.createElement(form)
  let container = document.createElement('div')
  container.id = 'formContainer'
  // container.style = 'display: none'
  document.body.appendChild(container)
  let schemaNode = render(el, document.getElementById('formContainer'))
  let schema = schemaNode.getSchema()
  document.body.removeChild(container)
  // redux-form-schema decoration
  const {fields, validate} = buildSchema(schema)
  return reduxForm({
    reduxMountPoint: 'forms',
    form: form.formName,
    fields: fields,
    validate: validate,
    getFormState: (state, cursor) => state.get(cursor).toJS(),
    ...opt
  })(form)
}

/*
  ###reducer
  redux-form reducer wrapped to support immutable.js
*/

export const reducer = (state, action) =>
  fromJS(formReducer(state ? state.toJS() : {}, action))

/*
   ####export redux-form's getValues
*/

export const getValues = reduxForm.getValues
