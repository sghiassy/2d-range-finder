var should = require('should');
var testFile = require('../src/Main');

describe("testing", function() {

  it("should work", function() {
    ("test").should.equal("test");
  });

  it("can import a file", function() {
    testFile.should.be.ok;
  });

  it("knows right from wrong", function() {
    (true).should.equal(true);
  });

});
