const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Driver = new Schema({
  user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  trucks: [{type: mongoose.Schema.Types.ObjectId, ref: 'Truck'}],
  assigned_truck: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Truck',
  },
  load: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Load',
  },
  has_load: {
    required: true,
    default: false,
    type: Boolean,
  },
});

module.exports = mongoose.model('Driver', Driver);
