

const mongoose = require('mongoose');

const deodapproductsSchema = new mongoose.Schema({
    merci_category: {
        type: String,
        required: true
    },
    merci_sku: {
        type: String,
        required: true
    },
    merci_prod_name: {
        type: String,
        required: true
    },
    merci_mrp: {
        type: String,
        required: true
    },
    merci_srp: {
        type: String,
        required: true
    },
    merci_weight: {
        type: Number,
        required: true
    },
    merci_description: {
        type: String,
        required: true
    },
    merci_image: {
        type: String,
        default:''
    },
    merci_merci_discount: {
        type: Number,
        default:''
    },
    merci_isHot: {
        type: Boolean,
        default: false
    },
    merci_isValuable: {
        type: Boolean,
        default: false
    }
});
deodapproductsSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

deodapproductsSchema.set('toJSON', {
    virtuals: true,
});

exports.deodapproducts = mongoose.model('deodapproducts', deodapproductsSchema, 'deodapproducts');
exports.deodapproductsSchema = deodapproductsSchema;