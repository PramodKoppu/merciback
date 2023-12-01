

const mongoose = require('mongoose');

const meeshoproductsSchema = new mongoose.Schema({
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
        default: ''
    },
    merci_prod_img: {
        type: Array,
        default:[]
    },
    merci_des: {
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
meeshoproductsSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

meeshoproductsSchema.set('toJSON', {
    virtuals: true,
});

exports.meeshoproducts = mongoose.model('meeshoproducts', meeshoproductsSchema);
exports.meeshoproductsSchema = meeshoproductsSchema;