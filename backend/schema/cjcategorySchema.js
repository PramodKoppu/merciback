

const mongoose = require('mongoose');

const cjcategorySchema = new mongoose.Schema({
    company: {
        type: String,
        required: true
    },
    main_cat: {
        type: String,
        required: true,
    },
    sub_cat: {
        type: String,
        default: ''
    },
    low_cat: {
        type: String,
        required: '',
    }
});

cjcategorySchema.virtual('id').get(function () {
    return this._id.toHexString();
});

cjcategorySchema.set('toJSON', {
    virtuals: true,
});

exports.cjcategory = mongoose.model('cjcategory', cjcategorySchema, 'cjcategories');
exports.cjcategorySchema = cjcategorySchema;