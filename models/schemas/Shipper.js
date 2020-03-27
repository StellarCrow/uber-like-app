const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Shipper = new Schema({
  user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  loads: [{type: mongoose.Schema.Types.ObjectId, ref: 'Load'}],
});

module.exports = mongoose.model('Shipper', Shipper);
