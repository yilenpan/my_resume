//sum-test.js

jest.dontMock('../sum/sum.js');

describe('sum', function() {
  it('adds 1 and 2 to equal 3', function() {
    var sum = require('../sum/sum.js');
    expect(sum(1,2)).toBe(3);
  });
});