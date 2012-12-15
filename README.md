# Jassi - JavaScript JSON Schema validator
Jassi is a [JSON Schema](http://json-schema.org/) validator written JavaScript. It implements the v4 draft.
The library is packaged as both CommonJS (the Node.js variety) and AMD modules and
should be compatible with most JavaScript environments.


## Getting started

### Installation
Include either `jassi.js` or `jassi.min.js` into your project. If you're using Node.js you can also install Jassi using `npm install jassi`.

### Usage examples
The library exposes a single function that receives two arguments, the JSON instance to validate and the schema object to validate against. The function returns an array of objects representing validation errors. If the instance validates successfully the array will be empty.

#### Node.js
```js
var validate = require('jassi'),
		errors;

errors = validate('apple', {type: 'string', maxLength: 5});

if (0 === errors.length) {
	// validation passed, do something here
}
else {
	// validation failed, print the errors
	errors.forEach(function(error) {
		console.log(error.property + ': ' + error.message);
	});
}
```

#### Browser with Require.js
```js
require(['path/to/jassi'], function(validate) {
	var errors;

	errors = validate('apple', {type: 'string', maxLength: 5});

	if (0 === errors.length) {
		// validation passed, do something here
	}
	else {
		// validation failed, print the errors
		errors.forEach(function(error) {
			console.log(error.property + ': ' + error.message);
		});
	}
});
```

#### Browser without Require.js
Jassi can be used in the browser the good old fashion way, by including it in a script tag like so: `<script src="path/to/jassi.js"></script>`. In this case Jassi will get attached to the global `window` object and can be used like this: `jassi('apple', {type: 'string', maxLength: 5});`.

## Implemented validation keywords

### Validation keywords for numeric instances (number and integer)

* `multipleOf`
* `maximum` and `exclusiveMaximum`
* `minimum` and `exclusiveMinimum`

### Validation keywords for strings

* `maxLength`
* `minLength`
* `pattern`

### Validation keywords for arrays

* `items` and `additionalItems`
* `maxItems`
* `minItems`
* `uniqueItems`

### Validation keywords for objects

* `maxProperties`
* `minProperties`
* `required`
* `properties`, `additionalProperties` and `patternProperties`
* `dependencies`

### Validation keywords for any instance type

* `enum`
* `type`
* `allOf`
* `anyOf`
* `oneOf`
* `not`

