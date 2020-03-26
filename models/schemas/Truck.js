const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const TruckSchema = new Schema({
  created_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Driver',
    required: true,
  },
  assigned_to: {type: mongoose.Schema.Types.ObjectId, ref: 'Driver'},
  status: {
    type: String,
    enum: ['IS', 'OL', 'FREE'],
    default: 'FREE',
    required: true,
  },
  type: {
    type: String,
    enum: ['SPRINTER', 'SS', 'LS'],
    required: true,
  },
});

module.exports = mongoose.model('Truck', TruckSchema);
