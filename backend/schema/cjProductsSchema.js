const mongoose = require("mongoose");

const cjproductsbackupSchema = new mongoose.Schema({
  merci_main_cat: {
    type: String,
    required: true,
  },
  merci_sub_cat: {
    type: String,
    required: true,
  },
  merci_low_cat: {
    type: String,
    required: true,
  },
  merci_spu_id: {
    type: String,
    required: true,
  },
  merci_prod_name: {
    type: String,
    required: true,
  },
  merci_mrp: {
    type: String,
    required: true,
  },
  merci_prod_img: {
    type: String,
    default: '',
  },
  merci_ishot: {
    type: Boolean,
    default: false,
  },
  merci_merci_discount: {
    type: Number,
    default: 10,
  },
  merci_us_discount: {
    type: Number,
    default: 20,
  },
  merci_isValuable: {
    type: Boolean,
    default: false,
  },
  merci_variantKey: {
    type: String,
    default: '',
  },
  merci_subProd: {
    type: String,
    default: ''
  }
});
cjproductsbackupSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

cjproductsbackupSchema.set("toJSON", {
  virtuals: true,
});

exports.cjproducts = mongoose.model(
  "cjproducts",
  cjproductsbackupSchema,
  "cjproductsnew"
);
exports.cjproductsbackupSchema = cjproductsbackupSchema;
