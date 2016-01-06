
// function User(id){
//   this.id = id;
// }
// module.exports = User;


class User {
  constructor(id) {
    this.id = id;
  }
  toString(){
    return '(' + this.id + ')';
  }
}

module.exports = User;
