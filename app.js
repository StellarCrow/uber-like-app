const express = require('express');
const app = express();
const cors = require('cors');
const logger = require('morgan');
const mongoose = require('mongoose');
const config = require('config');
const PORT = process.env.PORT || '3000';
const MONGO_URI = `mongodb://${config.dbConfig.host}:${config.dbConfig.port}/${config.dbConfig.dbName}`;

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
console.log(mongoose.connection.readyState);

const checkAuthorization = require('./routes/middleware/auth');
const checkRole = require('./routes/middleware/сheckRole');

const registerRoute = require('./routes/api/registration');
const driversRoute = require('./routes/api/drivers');

app.use(logger('dev'));
app.use(cors());
app.use(express.json());

app.use('/api', registerRoute);

app.use(checkAuthorization);
app.use(checkRole('driver'));
app.use('/api', driversRoute);

app.listen(PORT, () => {
  console.log(`Listening to requests on http://localhost:${PORT}`);
});
