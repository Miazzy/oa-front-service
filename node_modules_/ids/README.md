# ids

[![Build Status](https://travis-ci.org/bpmn-io/ids.svg)](https://travis-ci.org/bpmn-io/ids)

A simple caching id generation utility.


## Usage

```javascript
var Ids = require('ids');

var ids = new Ids();

var next = ids.next(); // returns id

ids.claim('f71a81'); // claim id as already existing

ids.assigned('f71a81'); // true if id was already generated / claimed
```


## Get the library

Fetch it via [npm](http://npmjs.org):

```
npm install --save ids
```


## License

Use under the terms of the [MIT license](http://opensource.org/licenses/MIT).