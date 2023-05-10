var express = require('express');
var socket = require('socket.io');
const path = require('path')

var app = express();

var server = app.listen(4000, () => console.log('server run on port 4000...'));


app.use(express.static('public'));
app.get('/', (req, res) => {
  res.sendFile('index.html', {root: path.join(__dirname, 'public')});
})

var io = socket(server);
io.on('connection',(socket)=> {
    console.log('socket connected',socket.id)

    socket.on('chat',(data) => {
        io.sockets.emit('chat', data);
    })

 
    socket.on('typing',(data)=>{
        socket.broadcast.emit('typing',data);
    })
	
	socket.on('typing-cancel',(data)=>{
        socket.broadcast.emit('typing-cancel',data);
    })
})

module.exports = app