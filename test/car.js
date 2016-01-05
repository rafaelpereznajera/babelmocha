import 'babel-polyfill'
import assert from 'assert'

import { Car } from '../src/car'

describe('Car', function() {
  describe('constructor', function () {
    it('should create a car', function () {
      const car = new Car('golf','red')
      assert.equal(car.toString(),'(golf,red)');
    });
  });
});
