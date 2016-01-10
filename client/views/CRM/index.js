import React from 'react'
import { Link } from 'react-router'
import Icon from 'react-icon'
import shield from 'function-shield'
import Component from 'redux-dgaf'
import classes from './index.sass'
import {Button} from 'react-semantify'

export class CRMView extends Component {
  static propTypes = {
    counter: React.PropTypes.number
  };
  static defaultState = {
    name: 'funkytek'
  };
  static cursors = {
    counter: 'counter'
  };
  render () {
    return (
      <div className={classes.crm}>
        <div className={classes.col}>
          <h1>CRM</h1>
          <Button>hi</Button>
        </div>
      </div>
    )
  }
}

export default Component.connect(CRMView, require('core/actions'))
