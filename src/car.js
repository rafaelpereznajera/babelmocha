export class Car {
  constructor(model, color) {
    this.model = model;
    this.color = color;
  }
  toString(){
    return '(' + this.model + ',' + this.color + ')';
  }
}
