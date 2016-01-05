export class Car {
  constructor(model, color) {
    this.model = model;
    this.color = color;
    this.speed = 0;
  }
  toString(){
    return '(' + this.model + ',' + this.color + ')';
  }
  acelerate(increment){
    this.speed = this.speed + increment;
  }
  brake(decrement){
    this.speed = this.speed - decrement;
  }
  stop(){
    this.speed  = 0
  }
}
