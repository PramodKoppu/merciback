const mongoose = require('mongoose');

const emartPincodeSchema = new mongoose.Schema({
    taluk: {
        type: String,
        required: true,
    },
    pincode: {
        type: Number,
        required: true,
    },
    districtName: {
        type: String,
        required: true,
    },
    stateName: {
        type: String,
        required: true,
    },
}, { timestamps: true });

emartPincodeSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

emartPincodeSchema.set('toJSON', {
    virtuals: true,
});

exports.emartPincode = mongoose.model('emartPincode', emartPincodeSchema, "pincode");
exports.emartPincodeSchema = emartPincodeSchema;