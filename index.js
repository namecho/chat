var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

io.use(function (socket, next) {
  console.log(socket.request.headers);
})

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function (socket) {
  socket.on('userInfoEdit', function (data) {
    socket.nickname = data.nickname
    io.emit('enter', { name: socket.nickname })
  })


  socket.on('message', function (data) {
    io.emit('message', { name: socket.nickname, message: data })
  })

  socket.on('disconnect', function () {
    io.emit('leave', { name: socket.nickname })
  });
});

http.listen(3000, function () {
  console.log('listening on *:3000');
});