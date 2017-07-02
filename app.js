var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);

server.listen(4000);

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function (socket) {
  socket.on('join', function (data) {
    socket.broadcast.emit('userJoined',data);
    socket.username=data.username;
  });

  socket.on('ding', function (data, callback) { 
      socket.broadcast.emit('ding',{username:socket.username});
      callback('ack');
    });
    
  socket.on('disconnect', function (){
    socket.broadcast.emit('userDisconnect', {
      username: socket.username});
  });

});