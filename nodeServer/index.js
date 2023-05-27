// const io = require('socket.io')(5000);
const io = require('socket.io')(8000, {
    cors: {
        origin: '*',
    }
});
const users = {};

io.on('connection', socket => {

    socket.on('new_user_joined', username => {
        console.log('New User joined -', username);
        users[socket.id] = username;
        socket.broadcast.emit('user_joined', username);
    });

    socket.on('send', msg => {
        socket.broadcast.emit('receive', { message: msg, username: users[socket.id] })
    })

    socket.on('disconnect', () => {
        socket.broadcast.emit('user_left', users[socket.id] )
        delete users[socket.id];
    })
});