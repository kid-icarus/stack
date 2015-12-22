import React, { Text, StyleSheet } from 'react-native-web'

const styles = StyleSheet.create({
  title: {
    fontSize: '1.25rem',
    lineHeight: '2rem',
    fontWeight: 'bold'
  }
})

// TODO: pass through all props
const Title = (props) =>
  <Text {...props} style={{ ...props.style, ...styles.title }}/>

Title.propTypes = {
  ...Text.propTypes,
  style: React.PropTypes.object,
  children: React.PropTypes.node
}

export default Title
