import 'babel-polyfill'
import assert from 'assert'
// var assert = require('assert');

import { sum } from '../src/sum'
// var sum = require('../lib/sum');
import { square } from '../src/sum';

describe('sum', function() {
  describe('#sum()', function () {
    it('should return 3 when argument1 = 1 and argument2 = 2', function () {
      assert.equal(sum(1,2),3);
    });
  });
});

describe('square()', function () {
    it('should return 4 when argument1 = 2', function () {
      assert.equal(square(2),4);
    });
});
