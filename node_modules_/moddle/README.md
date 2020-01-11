# moddle

[![Build Status](https://travis-ci.org/bpmn-io/moddle.svg?branch=master)](https://travis-ci.org/bpmn-io/moddle)

A utility library for working with meta-model based data structures.


## What is it good for?

__moddle__ offers you a concise way to define [meta models](https://en.wikipedia.org/wiki/Metamodeling) in JavaScript. You can use these models to consume documents, create model elements and perform model validation.

A moddle description is a simple [JSON](http://json.org/) file that describes types, their properties and relationships:

```json
{
  "name": "Cars",
  "uri": "http://cars",
  "prefix": "c",
  "types": [
    {
      "name": "Base",
      "properties": [
        { "name": "id", "type": "String", "isAttr": true }
      ]
    },
    {
      "name": "Root",
      "superClass": [ "Base" ],
      "properties": [
        { "name": "cars", "type": "Car", "isMany": true }
      ]
    },
    {
      "name": "Car",
      "superClass": [ "Base" ],
      "properties": [
        { "name": "name", "type": "String", "isAttr": true, "default": "No Name" },
        { "name": "power", "type": "Integer", "isAttr": true },
        { "name": "similar", "type": "Car", "isMany": true, "isReference": true }
      ]
    }
  ]
}
```

__moddle__ allows you to instantiate that definition and create objects from it:

```javascript
import { Moddle } from 'moddle';

var cars = new Moddle([ carsJSON ]);

var taiga = cars.create('c:Car', { name: 'Taiga' });

console.log(taiga);
// { $type: 'c:Car', name: 'Taiga' };


var cheapCar = cars.create('c:Car');

console.log(cheapCar.name);
// "No Name"


// really?
cheapCar.get('similar').push(taiga);
```

Then again, __moddle__ allows you to perform introspection on model instances, too.

```javascript
var carDescriptor = cheapCar.$descriptor;

console.log(carDescriptor.properties);
// [ { name: 'id', type: 'String', ... }, { name: 'name', type: 'String', ...} ... ]
```

Have a look at our [test coverage](https://github.com/bpmn-io/moddle/blob/master/test/spec) to learn about everything that is currently supported.


## Resources

* [Issues](https://github.com/bpmn-io/moddle/issues)
* [Examples](https://github.com/bpmn-io/moddle/tree/master/test/fixtures/model)
* [Documentation](https://github.com/bpmn-io/moddle/tree/master/docs)


## Related

* [moddle-xml](https://github.com/bpmn-io/moddle-xml): read xml documents based on moddle descriptors


## License

MIT
