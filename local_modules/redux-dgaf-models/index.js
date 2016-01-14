import Component from 'redux-dgaf'
import {PropTypes} from 'react'

const routerContextTypes = {
  params: PropTypes.object
}

class DataView extends Component {
  static contextTypes = routerContextTypes;
  static childContextTypes = routerContextTypes;
  static propTypes = routerContextTypes;
  getChildContext () {
    return {
      params: this.props.params || this.context.params
    }
  }
}

DataView.connect = Component.connect

export default DataView
