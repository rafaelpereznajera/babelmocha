
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
    console.log('createBox: ' + data.identifier);
    var box = new Box(data);
    boxes.push(box);
    io.sockets.emit('boxesChanged', { boxes: boxes});
  });

  socket.on('removeBox',function(data){
    console.log('removeBox: ' + data.identifier);
    var box = boxes.find(function (obj) {
      return obj.identifier === data.identifier;
    });
    io.sockets.to('box' + box.identifier).emit('boxChanged', box);

    var index = boxes.indexOf(box);
    if (index > -1){
      boxes.splice(index,1);
    }
    io.sockets.emit('boxesChanged', { boxes: boxes});
  });

  socket.on('joinBox', function(data){
    var boxIdentifier = data.box.identifier;
    socket.join('box' + boxIdentifier);
    socket.join('chat' + boxIdentifier);

    console.log('joinBox: ' + boxIdentifier);
    var guest = data.guest;
    var box = boxes.find(function (data) {
      return data.identifier === boxIdentifier;
    });
    box.guests[guest.identifier] = guest;
    io.sockets.emit('boxesChanged',{ boxes: boxes});
    io.sockets.to('box' + boxIdentifier).emit('boxChanged', box);
  });

  socket.on('leaveBox', function(data){
    var boxIdentifier = data.box.identifier;
    socket.leave('box' + boxIdentifier);
    socket.leave('chat' + boxIdentifier);

    console.log('leaveBox: ' + boxIdentifier);
    var guest = data.guest;
    var box = boxes.find(function (data) {
      return data.identifier === boxIdentifier;
    });
    delete box.guests[guest.identifier];
    io.sockets.emit('boxesChanged',{ boxes: boxes});
  });

  socket.on('selectSong', function(data){
    var boxIdentifier = data.box.identifier;
    var box = boxes.find(function (obj) {
      return obj.identifier === boxIdentifier;
    });
    //todo add song to guest emit change


  });

});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
