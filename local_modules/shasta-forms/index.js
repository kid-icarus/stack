import { fromJS } from 'immutable'
import { reducer as formReducer, reduxForm } from 'redux-form'

export const reducer = (state, action) =>
  fromJS(formReducer(state ? state.toJS() : {}, action))

export const Form = (opt = {}) =>
  reduxForm({
    ...opt,
    getFormState: (state, cursor) => state.get(cursor).toJS()
  })
