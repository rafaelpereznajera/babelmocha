import 'babel-polyfill'
import assert from 'assert'

import io from 'socket.io-client'

beforeEach(function() {
  var socket = io('http://localhost:3000');
  socket.disconnect();
});

describe('Client', function() {

  describe('connect()', function () {
    it('should connect', function (done) {
      var socket = io.connect('http://localhost:3000',{'forceNew':true });
      socket.on('connect', function(){
        assert.equal(1, 1);
        done();
      });
    });
    it('should return the boxes when connect', function (done) {
      var socket = io.connect('http://localhost:3000',{'forceNew':true });
      socket.on('boxes', function(data){
        assert(data.boxes, 'boxes exits');
        done();
      });
    });
  });

  describe('createBox()', function () {
    it('should create a box', function (done) {
      var socket = io.connect('http://localhost:3000',{'forceNew':true });
      socket.on('boxesChanged', function(data){
        assert.equal(data.boxes[0].name,'hello');
        done();
        socket.off('boxesChanged');
      });
      socket.on('connect', function(){
        socket.emit('createBox', {'identifier':socket.id,'name':'hello', 'owner':'yo'});
      });

    });
  });

  describe('joinBox()', function () {
    it('should join a box', function (done) {
      var user;
      var socket = io.connect('http://localhost:3000',{'forceNew':true });
      socket.on('boxes', function(data){
        user = data.user;
      });
      socket.on('boxesChanged', function(data){
        socket.off('boxesChanged');

        var socketIdentifier = socket.id;
        var socketJoin = io.connect('http://localhost:3000',{'forceNew':true });
        socketJoin.on('boxesChanged', function(data){

          var box = data.boxes.find(function (argument) {
            return argument.id === socketIdentifier;
          });
          var guests = box.guests;
          assert.equal(guests.length>1,true);
          done();
        });
        socketJoin.on('connect', function(){
          socketJoin.emit('joinBox', {'boxIdentifier': socketIdentifier, 'user': user});
        });
      });
      socket.on('connect', function(){
        socket.emit('createBox', {'identifier':socket.id,'name':'hello', 'owner':'yo'});
      });



    });
  });
});
