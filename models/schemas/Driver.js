const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const DriverSchema = new Schema({
  trucks: [{type: mongoose.Schema.Types.ObjectId, ref: 'Truck'}],
  assignedTrucks: [{type: mongoose.Schema.Types.ObjectId, ref: 'Truck'}],
  loads: [{type: mongoose.Schema.Types.ObjectId, ref: 'Load'}],
});

module.exports = mongoose.model('Driver', DriverSchema);
