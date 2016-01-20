import sutro from 'sutro'
import config from 'app-config-chain'

export default sutro({
  prefix: config.api.path,
  path: config.paths.resources
})
