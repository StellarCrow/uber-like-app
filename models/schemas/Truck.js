const mongoose = require('mongoose');
const {type, truckTypesArray} = require('../../utils/truckTypes');

const Schema = mongoose.Schema;

const TruckSchema = new Schema({
  name: {
    type: String,
    required: true,
    default: 'Truck',
  },
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
    enum: truckTypesArray,
    required: true,
  },
  payload: {
    type: Number,
  },
  dimensions: {
    width: {
      type: Number,
    },
    length: {
      type: Number,
    },
    height: {
      type: Number,
    },
  },
});

TruckSchema.pre('save', function(next) {
  const truckType = type[this.type];

  this.dimensions = {
    width: truckType.dimensions.width,
    length: truckType.dimensions.length,
    height: truckType.dimensions.height,
  };
  this.payload = truckType.payload;
  next();
});

module.exports = mongoose.model('Truck', TruckSchema);
