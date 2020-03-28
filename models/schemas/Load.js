const mongoose = require('mongoose');
const statusArray = ['NEW', 'POSTED', 'ASSIGNED', 'SHIPPED'];
const stateArray = [
  'En route to Pick Up',
  'Arrived to Pick Up',
  'En route to delivery',
  'Arrived to delivery',
];

const Schema = mongoose.Schema;

const LoadSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: '',
  },
  created_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Shipper',
    required: true,
  },
  assigned_to: {type: mongoose.Schema.Types.ObjectId, ref: 'Driver'},
  status: {
    type: String,
    required: true,
    default: 'NEW',
    enum: statusArray,
  },
  state: {
    type: String,
    enum: stateArray,
  },
  logs: [
    {
      message: {
        type: String,
        required: true,
      },
      time: {
        type: Date,
        default: Date.now,
        required: true,
      },
    },
  ],
  dimensions: {
    width: {
      type: Number,
      required: true,
    },
    length: {
      type: Number,
      required: true,
    },
    height: {
      type: Number,
      required: true,
    },
  },
  payload: {
    type: Number,
    required: true,
  },
  deliveryAddress: {
    city: {type: String, required: true},
    street: {type: String, required: true},
    zip: {type: String, required: true},
  },
  pickUpAddress: {
    city: {type: String, required: true},
    street: {type: String, required: true},
    zip: {type: String, required: true},
  },
});

module.exports = mongoose.model('Load', LoadSchema);
