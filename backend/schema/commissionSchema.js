const mongoose = require('mongoose');

// Define the schema for commission data
const commissionDataSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  paymentType: {
    type: String,
    required: true
  },
  level1: {
    type: String,
    default: '',
  },
  commissionL1: {
    type: Number,
    default: 0
  },
  level2: {
    type: String,
    default: ''
  },
  commissionL2: {
    type: Number,
    default: 0
  },
  level3: {
    type: String,
    default: ''
  },
  commissionL3: {
    type: Number,
    default: 0
  },
  level4: {
    type: String,
    default: ''
  },
  commissionL4: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Create the model for commission data
const CommissionData = mongoose.model('CommissionData', commissionDataSchema,'agentscommission');

module.exports = CommissionData;