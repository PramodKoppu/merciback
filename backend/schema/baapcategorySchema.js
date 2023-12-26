

const mongoose = require('mongoose');

const baapcategorySchema = new mongoose.Schema({
    company: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true,
    }
});

baapcategorySchema.virtual('id').get(function () {
    return this._id.toHexString();
});

baapcategorySchema.set('toJSON', {
    virtuals: true,
});

exports.baapcategory = mongoose.model('baapcategory', baapcategorySchema, 'baapcategories');
exports.baapcategorySchema = baapcategorySchema;