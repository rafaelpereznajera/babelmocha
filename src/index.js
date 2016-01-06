
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

// import { User } from "user.js";
//
// import { Box } from 'box'

var User = require('./user');
var Box = require('./box');


var users = [];
var boxes = [];

app.get('/', function(req, res){
  res.sendfile('index.html');
});

io.on('connection', function(socket){
  var user = new User(socket.id);
  users.push(user);
  socket.emit('boxes', {'boxes': boxes, 'user': user});

  socket.on('createBox',function(data){
    var box = new Box(data);
    boxes.push(box);
    io.sockets.emit('boxesChanged', { boxes: boxes});
  });

  socket.on('joinBox', function(data){
    var boxIdentifier = data.boxIdentifier;
    console.log('joinBox: ' + boxIdentifier);
    var user = data.user;
    var box = boxes.find(function (data) {
      return data.identifier === boxIdentifier;
    });
    box.addGuest(user.id);
    socket.emit('boxesChanged',{ boxes: boxes});
  });

});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
