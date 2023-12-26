

const mongoose = require('mongoose');

const baapproductsbackupSchema = new mongoose.Schema({
    merci_category: {
        type: String,
        required: true
    },
    merci_spu_id: {
        type: String,
        required: true
    },
    merci_url: {
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
    merci_des: {
        type: String,
        default:''
    },
    merci_isHot: {
        type: Boolean,
        default: false
    },
    merci_merci_discount: {
        type: Number,
        default: 10
    },
    merci_us_discount: {
        type: Number,
        default: 20
    },
    merci_isValuable: {
        type: Boolean,
        default: false
    }
});
baapproductsbackupSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

baapproductsbackupSchema.set('toJSON', {
    virtuals: true,
});

exports.baapproducts = mongoose.model('baapproducts', baapproductsbackupSchema, 'baapProducts');
exports.baapproductsbackupSchema = baapproductsbackupSchema;