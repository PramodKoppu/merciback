

const mongoose = require('mongoose');

const categorylistsSchema = new mongoose.Schema({
    merci_company: {
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

categorylistsSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

categorylistsSchema.set('toJSON', {
    virtuals: true,
});

exports.categorylists = mongoose.model('categorylists', categorylistsSchema);
exports.categorylistsSchema = categorylistsSchema;