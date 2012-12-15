var readFile = require('fs').readFileSync,
    coreSchema = JSON.parse(readFile('test/schema-core.json')),
    validate = require('../src/jassi'),
    schema, errors;

exports['Validation keywords for numeric instances'] = function(test) {
  test.expect(10);

  test.ok(validate(6, {multipleOf: 3}).length === 0, 'multipleOf');
  test.ok(validate(3, {maximum: 4}).length === 0, 'maximum');
  test.ok(validate(3, {maximum: 4, exclusiveMaximum: true}).length === 0, 'exclusiveMaximum');
  test.ok(validate(4, {minimum: 4}).length === 0, 'minimum');
  test.ok(validate(5, {minimum: 4, exclusiveMinimum: true}).length === 0, 'exclusiveMinimum');

  test.ok(validate(6, {multipleOf: 4}).length > 0, 'multipleOf fail');
  test.ok(validate(3, {maximum: 2}).length > 0, 'maximum fail');
  test.ok(validate(3, {maximum: 3, exclusiveMaximum: true}).length > 0, 'exclusiveMaximum fail');
  test.ok(validate(4, {minimum: 5}).length > 0, 'minimum fail');
  test.ok(validate(5, {minimum: 5, exclusiveMinimum: true}).length > 0, 'exclusiveMinimum fail');

  test.done();
};

exports['Validation keywords for strings'] = function(test) {
  test.expect(6);

  test.ok(validate('Test', {maxLength: 5}).length === 0, 'maxLength');
  test.ok(validate('Test', {minLength: 3}).length === 0, 'minLength');
  test.ok(validate('Test', {pattern: '^Te'}).length === 0, 'pattern');

  test.ok(validate('Test', {maxLength: 3}).length > 0, 'maxLength fail');
  test.ok(validate('Test', {minLength: 5}).length > 0, 'minLength fail');
  test.ok(validate('Test', {pattern: 'xa'}).length > 0, 'pattern fail');

  test.done();
};

exports['Validation keywords for arrays'] = function(test) {
  test.expect(6);

  test.ok(validate([null, '3', false], {maxItems: 4}).length === 0, 'maxItems');
  test.ok(validate([null, '3', false], {minItems: 2}).length === 0, 'minItems');
  test.ok(validate([null, '3', false], {uniqueItems: true}).length === 0, 'uniqueItems');

  test.ok(validate([null, '3', false], {maxItems: 2}).length > 0, 'maxItems fail');
  test.ok(validate([null, '3', false], {minItems: 4}).length > 0, 'minItems fail');
  test.ok(validate([null, false, false], {uniqueItems: true}).length > 0, 'uniqueItems fail');

  test.done();
};

exports['Validation keywords for objects'] = function(test) {
  test.expect(6);

  test.ok(validate({prop1: 2, prop2: false}, {maxProperties: 2}).length === 0, 'maxProperties');
  test.ok(validate({prop1: 2, prop2: false}, {minProperties: 2}).length === 0, 'minProperties');
  test.ok(validate({prop1: 2, prop2: false}, {required: ['prop2']}).length === 0, 'required');

  test.ok(validate({prop1: 2, prop2: false}, {maxProperties: 1}).length > 0, 'maxProperties fail');
  test.ok(validate({prop1: 2, prop2: false}, {minProperties: 3}).length > 0, 'minProperties fail');
  test.ok(validate({prop1: 2, prop2: false}, {required: ['madeUp']}).length > 0, 'required fail');

  test.done();
};

exports['Type keyword validation'] = function(test) {
  test.expect(14);

  test.ok(validate({}, { type : 'object' }).length === 0, 'object');
  test.ok(validate([], { type : 'array' }).length === 0, 'array');
  test.ok(validate('', { type : 'string' }).length === 0, 'string');
  test.ok(validate(0, { type : 'number' }).length === 0, 'number');
  test.ok(validate(0, { type : 'integer' }).length === 0, 'integer');
  test.ok(validate(false, { type : 'boolean' }).length === 0, 'boolean');
  test.ok(validate(null, { type : 'null' }).length === 0, 'null');

  test.ok(validate(2, { type : 'object' }).length > 0, 'not object');
  test.ok(validate({}, { type : 'array' }).length > 0, 'not array');
  test.ok(validate([], { type : 'string' }).length > 0, 'not string');
  test.ok(validate('asd', { type : 'number' }).length > 0, 'not number');
  test.ok(validate(0.1, { type : 'integer' }).length > 0, 'not integer');
  test.ok(validate(null, { type : 'boolean' }).length > 0, 'not boolean');
  test.ok(validate(false, { type : 'null' }).length > 0, 'not null');

  test.done();
};

exports['Enum keyword validation'] = function(test) {
  test.expect(4);

  test.ok(validate(4, {'enum': [2, 3, 4]}).length === 0, 'enum 1');
  test.ok(validate(5, {'enum': [2, 3, 4]}).length > 0, 'enum 1 fail');

  test.ok(validate('cool', {'enum': [2, 'cool', 4]}).length === 0, 'enum 2 ');
  test.ok(validate(false, {'enum': [2, true, 4]}).length > 0, 'enum 2 fail');


  test.done();
};

exports['Validations for other keywords'] = function(test) {
  test.expect(8);

  test.ok(validate('1st', {allOf: [{pattern: 's+'},{minLength: 3}]}).length === 0, 'allOf');
  test.ok(validate('1st', {allOf: [{pattern: 's+'},{minLength: 4}]}).length > 0, 'allOf fail');

  test.ok(validate('1st', {anyOf: [{pattern: 's+'},{minLength: 5}]}).length === 0, 'anyOf');
  test.ok(validate('1st', {anyOf: [{pattern: 'l+'},{minLength: 5}]}).length > 0, 'anyOf fail');

  test.ok(validate('1st', {oneOf: [{pattern: 's+'},{minLength: 4}]}).length === 0, 'oneOf');
  test.ok(validate('1st', {oneOf: [{pattern: 's+'},{minLength: 3}]}).length > 0, 'oneOf fail');

  test.ok(validate('1st', {not: {minLength: 4}}).length === 0, 'not');
  test.ok(validate('1st', {not: {minLength: 3}}).length > 0, 'not fail');


  test.done();
};

exports['Core schema validation against itself'] = function(test) {
  test.expect(1);

  test.ok(validate(coreSchema, coreSchema).length === 0, 'Core schema');

  test.done();
};
