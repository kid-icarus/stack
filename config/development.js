import { argv } from 'yargs'
import baseConfig from './default'

const HMR_ENABLED = !!argv.hot
const config = {
  env: process.env.NODE_ENV,
  compiler_enable_hmr: HMR_ENABLED
}

// We use an explicit public path when the assets are served by webpack
// to fix this issue:
// http://stackoverflow.com/questions/34133808/webpack-ots-parsing-error-loading-fonts/34133809#34133809
if (HMR_ENABLED) {
  config.compiler_public_path = (
    `http://${baseConfig.server_host}:${baseConfig.server_port}/`
  )
}

export default config
