const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const TruckSchema = new Schema({
  created_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  assigned_to: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  status: {
    type: String,
    enum: ['IS', 'OL'],
    required: true,
  },
  type: {
    type: String,
    enum: ['SPRINTER', 'SS', 'LS'],
    required: true,
  },
});

module.exports = mongoose.model('Truck', TruckSchema);
