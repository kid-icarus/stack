import { createAction } from 'redux-actions'

// ------------------------------------
// Actions
// ------------------------------------
export const increment = createAction('incrementCounter')
export const decrement = createAction('decrementCounter')

export const double = () => {
  return (dispatch, getState) => {
    setTimeout(() => {
      dispatch(increment(getState().counter))
    }, 10)
  }
}
