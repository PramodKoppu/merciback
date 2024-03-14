

const mongoose = require('mongoose');

const userGlobalSchema = new mongoose.Schema({
    merci_full_name: {
        type: String,
        required: true,
    },
    merci_email: {
        type: String,
        required: true,
    },
    merci_password: {
        type: String,
        required: true,
    },
    merci_phone: {
        type: String,
        required: true,
    },
    merci_street_one: {
        type: String,
        default: ''
    },
    merci_street_two: {
        type: String,
        default: ''
    },
    merci_district: {
        type: String,
        default: ''
    },
    merci_state: {
        type: String,
        default: ''
    },
    merci_pincode: {
        type: String,
        default: ''
    },
    merci_gender: {
        type: String,
        default: ''
    },
    merci_dob: {
        type: String,
        default: ''
    },
    merci_image: {
        type: String,
        default: ''
    }
}, { timestamps: true });

userGlobalSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

userGlobalSchema.set('toJSON', {
    virtuals: true,
});

exports.UserGlobal = mongoose.model('UserGlobal', userGlobalSchema, "globalUsers");
exports.userGlobalSchema = userGlobalSchema;