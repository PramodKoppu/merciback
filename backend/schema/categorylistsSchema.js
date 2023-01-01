

const mongoose = require('mongoose');

const categorylistsSchema = new mongoose.Schema({
    merci_company: {
        type: String,
        required: true
    },
    main_category: {
        type: String,
        required: true,
    },
    sub_category: {
        type: String,
        default: ''
    },
    low_category: {
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