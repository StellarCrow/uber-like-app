const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const TruckSchema = new Schema({
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
});

module.exports = mongoose.model('Truck', TruckSchema);
