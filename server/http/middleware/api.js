import sutro from 'sutro'
import path from 'path'
import config from 'app-config-chain'

export default sutro({
  prefix: config.api.path,
  resources: path.join(config.paths.base, './server/resources')
})
