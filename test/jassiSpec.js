var validate = require('../src/jassi'),
    grunt = require('grunt');

function testcaseHandler(nodeunit) {
  var tests = this.tests;
  var schema = this.schema;
  
  nodeunit.expect(tests.length);

  tests.forEach(function (test) {
    nodeunit.equal(!validate(test.data, schema).length, test.valid, test.description);
  });

  nodeunit.done();
}


grunt.file.expand({cwd: 'test'}, ['JSON-Schema-Test-Suite/tests/draft4/**/*.json', '!**/{format,zeroTerminatedFloats,definitions,ref,refRemote}.json']).forEach(function (filepath) {
  require(__dirname + '/' + filepath).forEach(function (testcase) {
    exports[testcase.description] = testcaseHandler.bind(testcase);
  });
});
