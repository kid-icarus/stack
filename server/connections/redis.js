import redis from 'redis'
import config from 'app-config-chain'

module.exports = redis.createClient(config.redis)
