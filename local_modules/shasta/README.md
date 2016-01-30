# shasta

## Ideals

- Everything should be as simple as possible
- Everything should be immutable
- Everything should work easily and be simple to understand

## Opinions

- Everything is immutable via immutable.js
  - All components are pure
  - PropTypes include immutable validators

- Easy to understand objects instead of functional composition
  - Replace `compose(applyMiddleware(middleware), devtools)(createStore)(combineReducers(reducers), initialState)` with `createStore({middleware: [], initialState: {}, reducer: fn})`

- Namespaced/nested actions and reducers
  - `createTodos` becomes `todos.create` in actions and reducers

- Default middleware
  - thunk


- Dead simple Component API
  - Use ES6 classes (not using them is deprecated anyways)
    - If you haven't already migrated, [here's how](http://www.newmediacampaigns.com/blog/refactoring-react-components-to-es6-classes)
  - defaultState to do what getInitialState used to do, and mimic what defaultProps does currently
  - auto-bind component function's scope like old react
  - `this.actions` for accessing and dispatching actions
  - Never write mapDispatchToProps or mapStateToProps
    - All actions always provided from connect
    - Define the data you need on your view via storeProps

- Ecosystem of plug-and-play modules
  - router
  - logger
  - api access
  - local storage
  - etc.
