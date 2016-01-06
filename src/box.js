
class Box {
  constructor(data) {
    this.identifier = data.identifier;
    this.name = data.name;
    this.owner = data.owner;
    this.guests = data.guests;
  }
  toString(){
    return '(' + this.name + ',' + this.owner + ')';
  }
  addGuest(guest){
    this.guests.push(guest);
  }
  removeGuest(guest){
    let index = this.guests.indexOf(guest);
    if (index > -1){
      this.guests.slice(index,1);
    }
  }

}

module.exports = Box;
