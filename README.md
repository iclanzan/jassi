Jassi - Javascript JSON Schema validator
=====

Jassi is a [JSON Schema](http://json-schema.org/) validator written Javascript. It implements the v4 draft.
The library is packaged as both CommonJS (the Node.js variety) and AMD modules and 
should be compatible with most Javascript environments.

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

