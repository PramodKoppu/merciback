const mongoose = require("mongoose");

const requestCouponSchema = new mongoose.Schema({
  merchantId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "rooftopShop", // adjust the model name if needed
    required: true
  },
  userPhone: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ["pending", "approved", "declined"],
    default: "pending"
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const RequestCoupon = mongoose.model("RequestCoupon", requestCouponSchema);
module.exports = RequestCoupon;