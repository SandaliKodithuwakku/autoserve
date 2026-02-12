const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a service name'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Please add a description']
  },
  price: {
    type: Number,
    required: [true, 'Please add a price'],
    min: 0
  },
  duration: {
    type: String,
    required: [true, 'Please add a duration']
  },
  icon: {
    type: String,
    default: '🔧'
  },
  features: {
    type: [String],
    default: []
  }
},
  {
  timestamps: true
});

module.exports = mongoose.model('Service', serviceSchema);

