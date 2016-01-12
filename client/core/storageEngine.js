import * as storage from 'redux-storage'
import createEngine from 'redux-storage/engines/localStorage'

const whitelist = [
  'counter',
  'entities',
  'requests',
  'todomvc'
]

const actionBlacklist = [
  '@@router/INIT_PATH'
]

const engine = createEngine('x')

const storageEngine =
  storage.decorators.debounce(
    storage.decorators.filter(
      storage.decorators.immutablejs(
        engine,
        whitelist
      ),
      whitelist
    )
  , 100)

export default {
  engine: storageEngine,
  load: storage.createLoader(storageEngine),
  reducer: storage.reducer,
  middleware: storage.createMiddleware(storageEngine, actionBlacklist)
}
