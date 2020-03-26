const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
  },
  role: {
    type: String,
    enum: ['driver', 'shipper'],
    required: true,
  },
  role_id: {type: mongoose.Schema.Types.ObjectId, ref: 'Shipper' || 'Driver'},
});

module.exports = mongoose.model('User', UserSchema);
