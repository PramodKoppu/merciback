

const mongoose = require('mongoose');

const deodapcategorySchema = new mongoose.Schema({
    company: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true,
    }
});

deodapcategorySchema.virtual('id').get(function () {
    return this._id.toHexString();
});

deodapcategorySchema.set('toJSON', {
    virtuals: true,
});

exports.deodapcategory = mongoose.model('deodapcategory', deodapcategorySchema, 'deodapcategories');
exports.deodapcategorySchema = deodapcategorySchema;