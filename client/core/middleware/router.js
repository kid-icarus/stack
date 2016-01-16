import { syncHistory } from 'redux-simple-router'
import { browserHistory } from 'react-router'

export default syncHistory(browserHistory)
