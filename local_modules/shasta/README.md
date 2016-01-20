# Opinions

- Completely immutable central store (via immutable.js)
  - All components are pure
- Namespaced + nested actions and reducers
- Never write mapDispatchToProps or mapStateToProps
  - All actions always provided from connect
  - Define the data you need on your view via cursors
- Everything should be as simple as possible

# Features

- PropTypes for Immutable by default
- Dead simple Component API
  - defaultState + auto-binding to reduce boilerplate
  - `this.actions` for accessing and dispatching actions
  - `this.props` for accessing defined `cursors`
- Ecosystem of plug-and-play modules
  - router
  - logger
  - api access
  - local storage
  - etc.
