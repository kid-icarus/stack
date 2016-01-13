// import {compose} from 'compose-middleware'
import path from 'path'
import config from 'app-config-chain'
import loadResources from './loadResources'

const endpoints = loadResources({
  prefix: config.api.path,
  path: path.join(config.paths.base, './server/resources')
})
// console.log(endpoints)

export default (req, res, next) => next()
