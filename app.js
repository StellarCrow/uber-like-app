const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const PORT = process.env.PORT || '3000';
// const MONGO_URI = require("./config/keys").mongoURI;

mongoose.connect('mongodb://localhost:27017/uber', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
console.log(mongoose.connection.readyState);

const registerRoute = require('./routes/api/registration');

app.use(cors());
app.use(express.json());

app.use('/api', registerRoute);

app.listen(PORT, () => {
  console.log(`Listening to requests on http://localhost:${PORT}`);
});
