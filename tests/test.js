var should = require('should');
var testFile = require('../src/temp');

describe("testing", function() {

  it("should work", function() {
    ("test").should.equal("test");
  });

  it("can import a file", function() {
    testFile.should.equal("It works from content.");
  });

  it("knows right from wrong", function() {
    (true).should.equal(true);
  });

});
