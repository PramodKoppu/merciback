const mongoose = require('mongoose');

const shopPaymentSchema = new mongoose.Schema({
  ORID: {
    type: String,
    required: true
  },
  userId: {
    type: String,
    required: true
  },
  orderID: {
    type: String,
    required: true
  },
  paymentID: {
    type: String,
    required: true
  },
  total: {
    type: Number,
    required: true
  },
  refer: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const shopPayment = mongoose.model('shopPayment', shopPaymentSchema,'shopPayment');

module.exports = shopPayment;