

const mongoose = require('mongoose');

const cjproductsbackupSchema = new mongoose.Schema({
    merci_main_cat: {
        type: String,
        required: true
    },
    merci_sub_cat: {
        type: String,
        required: true
    },
    merci_low_cat: {
        type: String,
        required: true
    },
    merci_spu_id: {
        type: String,
        required: true
    },
    merci_category_id: {
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
    merci_prod_img: {
        type: String,
        default:''
    },
    merci_ishot: {
        type: Boolean,
        default: false
    },
    merci_merci_discount: {
        type: Number,
        default: 10
    },
    merci_isValuable: {
        type: Boolean,
        default: false
    }
});
cjproductsbackupSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

cjproductsbackupSchema.set('toJSON', {
    virtuals: true,
});

exports.cjproducts = mongoose.model('cjproducts', cjproductsbackupSchema, 'cjproducts');
exports.cjproductsbackupSchema = cjproductsbackupSchema;