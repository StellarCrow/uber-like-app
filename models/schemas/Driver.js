const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Driver = new Schema({
  user_id: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  trucks: [{type: mongoose.Schema.Types.ObjectId, ref: 'Truck'}],
  assigned_truck: {type: mongoose.Schema.Types.ObjectId, ref: 'Truck'},
});

module.exports = mongoose.model('Driver', Driver);
