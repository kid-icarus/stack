import {Link} from 'react-router'
import {Grid, Header, Row, Column} from 'react-semantify'
import Component from 'redux-dgaf'
import React from 'react'
import './index.sass'

export class NotFoundView extends Component {
  static displayName = 'NotFoundView';
  render () {
    return (
      <Grid className='not-found-view middle aligned one column centered'>
        <Row>
          <Column className='eight wide middle aligned'>
            <Header className='large'>The page you requested does not exist!</Header>
            <Link to='/'>Back To Home</Link>
          </Column>
        </Row>
      </Grid>
    )
  }
}

export default Component.connect(NotFoundView, require('core/actions'))