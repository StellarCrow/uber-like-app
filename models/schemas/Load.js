const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const LoadSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: String,
  shipper: {type: mongoose.Schema.Types.ObjectId, ref: 'Shipper'},
  driver: {type: mongoose.Schema.Types.ObjectId, ref: 'Driver'},
  status: {
    type: String,
    required: true,
    default: 'NEW',
  },
  deliveryAddress: {
    type: String,
    required: true,
  },
  pickUpAddress: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Load', LoadSchema);
