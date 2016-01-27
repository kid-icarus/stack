# rethinkdb-change-stream

Turns a rethinkdb change feed into a node stream.

## API

### changeStream(query)

- `query` argument is a rethinkdb query object
  - This can be from thinky, rethinkdb, or rethinkdbdash
- Returns a node.js [Readable Stream](https://nodejs.org/api/stream.html#stream_class_stream_readable)
- Ending the stream will also end and clean up the change feed
- If the change feed encounters an error, the stream will end

## Example

```js
var changeStream = require('rethinkdb-change-stream');
var User = require('models/User');

// tail all 18 year olds named "Eric"
var query = User.filter({
  first_name: 'Eric',
  age: 18
}).changes()

var stream = changeStream(query);
stream.on('data', function(obj){
  // obj.type === insert, update, or delete
  // obj.data === object with the info
});
```
