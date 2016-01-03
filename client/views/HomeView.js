import React, {View, Text, StyleSheet} from 'react-native-web'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import * as counterActions from 'actions/counter'
import Title from '../components/Title'

const styles = StyleSheet.create({
  home: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  counterNumber: {
    color: 'green'
  }
})

// We define mapStateToProps where we'd normally use
// the @connect decorator so the data requirements are clear upfront, but then
// export the decorated component after the main class definition so
// the component can be tested w/ and w/o being connected.
// See: http://rackt.github.io/redux/docs/recipes/WritingTests.html
const mapStateToProps = (state) => ({
  counter: state.counter
})
export class HomeView extends React.Component {
  static propTypes = {
    counter: React.PropTypes.number.isRequired,
    doubleAsync: React.PropTypes.func.isRequired,
    increment: React.PropTypes.func.isRequired
  }

  render () {
    return (
      <View style={styles.home}>
        <Title>Welcome to the React Redux Starter Kit</Title>
        <Text>
          Sample Counter:&nbsp;
          <Title style={styles.counterNumber}>{this.props.counter}</Title>
        </Text>
        <View accessibilityRole='button' onClick={() => this.props.increment(1)}>
          Increment
        </View>
        <View accessibilityRole='button' onClick={this.props.doubleAsync}>
          Double (Async)
        </View>
        <Link to='/about'>Go To About View</Link>
      </View>
    )
  }
}

export default connect(mapStateToProps, counterActions)(HomeView)
