const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const cors = require('cors');
const logger = require('morgan');
const mongoose = require('mongoose');
const config = require('config');
const users = require('./utils/sockets/Users');
const PORT = process.env.PORT || '3000';
const MONGO_URI = `mongodb://${config.dbConfig.host}:${config.dbConfig.port}/${config.dbConfig.dbName}`;

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
console.log(mongoose.connection.readyState);

const checkAuthorization = require('./routes/middleware/auth');

const registerRoute = require('./routes/api/registration');
const driversRoute = require('./routes/api/drivers');
const shippersRoute = require('./routes/api/shippers');
const usersRoute = require('./routes/api/users');
const weatherRoute = require('./routes/api/weather');

app.use(logger('dev'));
app.use(cors());
app.use(express.json());

app.use('/api', registerRoute);

app.use('/api', weatherRoute);
app.use(checkAuthorization);
app.use('/api', usersRoute);
app.use('/api', driversRoute);
app.use('/api', shippersRoute);

io.on('connection', (socket) => {
  console.log('a user is connected');

  socket.on('join', (params) => {
    const room = params.room;
    const userId = params.userId;
    socket.join(room);
    users.removeUser(socket.id);
    users.addUser(socket.id, userId, room);

    socket.emit('newMessage', 'user joined chat');
  });

  socket.on('message', (data) => {
    const message = data.message;
    const user = users.getUser(socket.id);
    io.to(user.room).emit('newMessage', message);
  });

  socket.on('disconnect', () => {
    const user = users.removeUser(socket.id);
    if (user) {
      io.to(user.room).emit('newMessage', 'offline');
    }
  });
});

server.listen(PORT, () => {
  console.log(`Listening to requests on http://localhost:${PORT}`);
});
