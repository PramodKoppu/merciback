

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    merci_refer_id: {
        type: String,
        required: true
    },
    merci_first_name: {
        type: String,
        required: true,
    },
    merci_middle_name: {
        type: String,
        default: ''
    },
    merci_last_name: {
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
    merci_village :{
        type: String,
        default: ''
    },
    merci_mandal: {
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
    merci_qualification: {
        type: String,
        default: ''
    },
    merci_level: {
        type: String,
        default: ''
    },
    merci_pancard: {
        type: String,
        required: true
    },
    merci_aadhar: {
        type: String,
        default: ''
    },
    merci_image: {
        type: String,
        default: ''
    },
    merci_refer: {
        type: String,
        required: true
    },

});

userSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

userSchema.set('toJSON', {
    virtuals: true,
});

exports.User = mongoose.model('User', userSchema);
exports.userSchema = userSchema;