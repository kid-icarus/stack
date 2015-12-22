import React from 'react-native-web'
import { createDevTools } from 'redux-devtools'
import LogMonitor from 'redux-devtools-log-monitor'

export default createDevTools(
  <LogMonitor />
)
