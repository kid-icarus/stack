import { Link, browserHistory } from 'react-router'
import React, { View, StyleSheet } from 'react-native-web'
import Title from '../components/Title'

const styles = StyleSheet.create({
  about: {
    alignItems: 'center',
    justifyContent: 'center'
  }
})

export class AboutView extends React.Component {

  render () {
    return (
      <View style={styles.about}>
        <Title>This is the about view!</Title>
        <Link to='/'>Back To Home View</Link>
        <View accessibilityRole='button' onClick={() => browserHistory.push('/')}> Click to Navigate from function </View>
      </View>
    )
  }
}

export default AboutView
