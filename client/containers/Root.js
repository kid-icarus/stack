import { Provider } from 'react-redux'
import { Router } from 'react-router'
import React, { View, StyleSheet } from 'react-native-web'

const styles = StyleSheet.create({
  root: {
    height: '100%',
    width: '100%'
  }
})

export default class Root extends React.Component {
  static propTypes = {
    history: React.PropTypes.object.isRequired,
    routes: React.PropTypes.element.isRequired,
    store: React.PropTypes.object.isRequired
  }

  render () {
    return (
      <Provider store={this.props.store}>
        <View style={styles.root}>
          <style children={StyleSheet.renderToString()}/>
          <Router history={this.props.history}>
            {this.props.routes}
          </Router>
        </View>
      </Provider>
    )
  }
}
