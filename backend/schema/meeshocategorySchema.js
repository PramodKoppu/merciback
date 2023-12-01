

const mongoose = require('mongoose');

const meeshocategorySchema = new mongoose.Schema({
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

meeshocategorySchema.virtual('id').get(function () {
    return this._id.toHexString();
});

meeshocategorySchema.set('toJSON', {
    virtuals: true,
});

exports.meeshocategory = mongoose.model('meeshocategory', meeshocategorySchema, 'meeshocategory');
exports.meeshocategorySchema = meeshocategorySchema;