module.exports.chatSockets = function(socketServer){
    let io = require('socket.io')(socketServer);

    io.sockets.on('connection', function(socket){
        console.log('new connection recived',socket.id);

        socket.on('disconnect', function(){
            console.log('socket disconnected')
        })

        socket.on('join_room',function(data){
            console.log('joining request ',data);

            socket.join(data.chatroom);

            io.to(data.chatroom).emit('user_joined',data);
        })

        socket.on('send_message',function(data){
            io.to(data.chatroom).emit('recieve message',data);
        })
    });
}