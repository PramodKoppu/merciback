

const mongoose = require('mongoose');

const dobaProductsSchema = new mongoose.Schema({
    merci_id: {
        type: String,
        default: '',
    },
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
    merci_item_no: {
        type: String,
        required: true
    },
    merci_url: {
        type: String,
        required: true
    },
    merci_cat: {
        type: String,
        required: true
    },
    merci_prod_name: {
        type: String,
        required: true
    },
    merci_brand: {
        type: String,
       default: ''
    },
    merci_sku_code: {
        type: String,
        required: true
    },
    merci_mrp: {
        type: String,
        required: true
    },
    merci_map: {
        type: String,
        default: ''
    },
    merci_dropship: {
        type: String,
        default: ''
    },
    merci_inventory: {
        type: String,
        default: ''
    },
    merci_location: {
        type: String,
        default: ''
    },
    merci_ship_cost: {
        type: String,
        default: ''
    },
    merci_prod_img1: {
        type: String,
        default:''
    },
    merci_prod_img2: {
        type: String,
        default:''
    },
    merci_prod_img3: {
        type: String,
        default:''
    },
    merci_prod_img4: {
        type: String,
        default:''
    },
    merci_prod_img5: {
        type: String,
        default:''
    },
    merci_des: {
        type: String,
        default:''
    },
    merci_html_des: {
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

dobaProductsSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

dobaProductsSchema.set('toJSON', {
    virtuals: true,
});

exports.dobaproducts = mongoose.model('dobaproducts', dobaProductsSchema);
exports.dobaProductsSchema = dobaProductsSchema;