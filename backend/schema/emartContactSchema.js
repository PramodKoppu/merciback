

const mongoose = require('mongoose');

const emartContactSchema = new mongoose.Schema({
    merci_name: {
        type: String,
        required: true,
    },
    merci_email: {
        type: String,
    },
    merci_phone: {
        type: String,
        required: true,
    },
    merci_subject: {
        type: String,
        default: ''
    },
    merci_description: {
        type: String,
        default: ''
    },
    merci_response: {
        type: String,
        default: ''
    },
    merci_isOpen: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

emartContactSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

emartContactSchema.set('toJSON', {
    virtuals: true,
});

exports.emartContact = mongoose.model('emartContact', emartContactSchema, "emartContact");
exports.emartContactSchema = emartContactSchema;