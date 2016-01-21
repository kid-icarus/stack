# shasta

## Ideals

- Everything should be as simple as possible
- Everything should be immutable
- Everything should work easily and be simple to understand

## Opinions

- Everything is immutable via immutable.js
  - All components are pure
  - PropTypes include immutable validators

- Easy to understand options object instead of functional composition
  - Replace `compose(applyMiddleware(middleware), devtools)(createStore)(combineReducers(reducers), initialState)` with `createStore({middleware: [], initialState: {}, reducer: fn})`

- Namespaced/nested actions and reducers
  - `createTodos` becomes `todos.create` in actions and reducers

- Default middleware
  - thunk

- Dead simple Component API
  - defaultState + auto-binding to reduce boilerplate
  - `this.actions` for accessing and dispatching actions
  - Never write mapDispatchToProps or mapStateToProps
    - All actions always provided from connect
    - Define the data you need on your view via cursors
  - `this.props` for accessing defined `cursors`

- Ecosystem of plug-and-play modules
  - router
  - logger
  - api access
  - local storage
  - etc.
