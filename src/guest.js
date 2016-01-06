

class Guest {
  constructor(identifier) {
    this.identifier = identifier;
  }
  toString(){
    return '(' + this.identifier + ')';
  }
}

module.exports = Guest;
