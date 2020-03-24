const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ShipperSchema = new Schema({
  loads: [{type: mongoose.Schema.Types.ObjectId, ref: 'Load'}],
});

module.exports = mongoose.model('Shipper', ShipperSchema);
