# thinky-export-schema

Exports a thinky model's schema as a plain object.

## API

### exportSchema(model)

- `model` argument is a thinky model object
- Returns the model's schema as a plain object.

## Example

```js
var thinky = require('thinky')()
var type = thinky.type
var exportSchema = require('thinky-export-schema')

var User = thinky.createModel('User', {
  id: type.number(),
  name: type.string(),
  times: {
    created: Date,
    updated: Date
  }
})

exportSchema(User)
=> {id: 'Number', name: 'String', times: { created: 'Date', updated: 'Date' }}
```
