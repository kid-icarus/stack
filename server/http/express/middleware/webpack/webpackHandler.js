const debug = _debug('app:bin:webpack')
import _debug from 'debug'

export default function(err, stats) {
 if (stats.compilation.missingDependencies[0]) {
   throw new Error('missing webpack config dependencies ' + JSON.stringify(stats.compilation.missingDependencies, null, 2))
 }
 if (err) debug(err)
}
