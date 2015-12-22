import config from 'app-config-chain'
import base from './_base'

export default require(`./_${config.env}`)(base)
