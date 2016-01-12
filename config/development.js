import baseConfig from './default'

// We use an explicit public path when the assets are served by webpack
// to fix this issue:
// http://stackoverflow.com/questions/34133808/webpack-ots-parsing-error-loading-fonts/34133809#34133809
const config = {
  compiler_public_path: (
    `http://${baseConfig.server_host}:${baseConfig.server_port}/`
  )
}

export default config
