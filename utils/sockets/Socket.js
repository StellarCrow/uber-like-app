const Users = require('./Users');

class Socket {
  constructor(io) {
    this.io = io;
  }

  connect() {
    this.io.on('connection', (socket) => {
      this.socket = socket;
      socket.on('join', (params) => {
        this.joinHandler(socket, params);
      });
      socket.on('message', (params) => {
        this.messageHandler(socket, params);
      });
      socket.on('disconnect', () => {
        this.disconnectHandler(socket);
      });
    });
  }

  joinHandler(socket, params) {
    console.log(`${params.name} joined chat`);
    const room = params.room;
    const userId = params.userId;
    socket.join(room);
    Users.removeUser(socket.id);
    Users.addUser(socket.id, userId, room);

    this.io
        .to(room)
        .emit('online', {online: true, userId: userId, name: params.name});
  }

  messageHandler(socket, data) {
    const message = data.message;
    const user = Users.getUser(socket.id);

    const response = {
      message: message,
      userId: user.userId,
    };
    this.io.to(user.room).emit('newMessage', response);
  }

  disconnectHandler(socket) {
    const user = Users.removeUser(socket.id);
    if (user) {
      this.io
          .to(user.room)
          .emit('online', {online: false, userId: user.userId});
    }
  }
}

module.exports = Socket;
