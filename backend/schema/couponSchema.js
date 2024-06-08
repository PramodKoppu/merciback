const mongoose = require('mongoose');

const couponSchema = new mongoose.Schema({
    merchantId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    coupon: {
        type: String,
        required: true,
        unique: true
    },
    value: {
        type: Number,
        required: true
    },
    assignedTo: {
        type: String,
        default: null
    },
    assignedPhone: {
        type: Number,
        default: null
    },
    assignedId: {
        type: mongoose.Schema.Types.ObjectId,
        default: null
    },
    used: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: {
        createdAt: 'createdAt',
        updatedAt: 'updatedAt'
    }
});

const Coupon = mongoose.model('Coupon', couponSchema, 'coupons');

module.exports = Coupon;