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
    required: true
  },
  commissionL1: {
    type: Number,
    required: true
  },
  level2: {
    type: String,
    required: true
  },
  commissionL2: {
    type: Number,
    required: true
  },
  level3: {
    type: String,
    required: true
  },
  commissionL3: {
    type: Number,
    required: true
  },
  level4: {
    type: String,
    required: true
  },
  commissionL4: {
    type: Number,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Create the model for commission data
const CommissionData = mongoose.model('CommissionData', commissionDataSchema,'agentscommission');

module.exports = CommissionData;