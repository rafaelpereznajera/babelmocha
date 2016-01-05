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
  describe('#acelerate', function () {
    it('should change speed', function () {
      const car = new Car('golf','red')
      car.acelerate(10)
      assert.equal(car.speed,10)
      car.brake(5)
      assert.equal(car.speed,5)
      car.stop()
      assert.equal(car.speed,0)
    });
  });
});
