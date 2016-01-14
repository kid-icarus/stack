import baseConfig from './default'

export default {
  paths: {
    ...baseConfig.paths,
    public: `http://${baseConfig.http.host}:${baseConfig.http.port}/`
  }
}
