const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const SocketClass = require('./utils/sockets/Socket');
const socket = new SocketClass(io);
const cors = require('cors');
const logger = require('morgan');
const mongoose = require('mongoose');
const config = require('config');
const PORT = process.env.PORT || '3000';
const defaultMongoUri = 'mongodb://localhost:27017/uber';
const MONGO_URI = config.MONGOLAB_URI || defaultMongoUri;

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

socket.connect();

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(__dirname + '/public/'));
  app.get('/*', (req, res) => res.sendFile(__dirname + '/public/index.html'));
}

server.listen(PORT, () => {
  console.log(`Listening to requests on http://localhost:${PORT}`);
});
