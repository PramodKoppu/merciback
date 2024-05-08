const mongoose = require('mongoose');

const emartAddressSchema = new mongoose.Schema({
    merci_id: {
        type: String,
        required: true,
    },
    merci_name: {
        type: String,
        required: true,
    },
    merci_mobile: {
        type: String,
        required: true,
    },
    merci_pincode: {
        type: String,
        required: true,
    },
    merci_locality: {
        type: String,
        required: true,
    },
    merci_address: {
        type: String,
        required: true,
    },
    merci_city: {
        type: String,
        required: true,
    },
    merci_state: {
        type: String,
        required: true,
    },
    merci_landmark: {
        type: String,
        required: false,
    },
    merci_alternate_mobile: {
        type: String,
        required: false,
    }
}, { timestamps: true });

emartAddressSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

emartAddressSchema.set('toJSON', {
    virtuals: true,
});

exports.emartAddress = mongoose.model('emartAddress', emartAddressSchema, "emartAddress");
exports.emartAddressSchema = emartAddressSchema;