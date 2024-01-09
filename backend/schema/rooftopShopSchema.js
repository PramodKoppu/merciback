

const mongoose = require('mongoose');

const rooftopShopSchema = new mongoose.Schema({
    merci_shop_name: {
        type: String,
        required: true
    },
    merci_user_name: {
        type: String,
        required: true
    },
    merci_password: {
        type: String,
        required: true
    },
    merci_full_name: {
        type: String,
        required: true,
    },
    merci_email: {
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
    merci_level: {
        type: String,
        default: ''
    },
    merci_isActive: {
        type: Boolean,
        default: true,
    },
    merci_refer: {
        type: String,
        required: true
    },
    merci_isPayment: {
        type: Boolean,
        default: false,
    },
    merci_green_money: {
        type: Number,
        default: 200000,
    },

});

rooftopShopSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

rooftopShopSchema.set('toJSON', {
    virtuals: true,
});

exports.rooftopShop = mongoose.model('rooftopShop', rooftopShopSchema, 'rooftopShop');
exports.rooftopShopSchema = rooftopShopSchema;