const mongoose = require('mongoose');

const percentageSchema = new mongoose.Schema({
    company: {
        type: String,
    },
    lowPercent: {
        type: Number,
    },
    midPercent: {
        type: Number,
    },
    highPercent: {
        type: Number,
    },
    lowMin: {
        type: Number,
    },
    lowMax: {
        type: Number,
    },
    midMin: {
        type: Number,
    },
    midMax: {
        type: Number,
    },
    highMin: {
        type: Number,
    },
    highMax: {
        type: Number,
    },
    sublowMin:{
        type: Number,
    },
    sublowMax:{
        type: Number,
    },
    sublowPercent:{
        type: Number
    }
});

percentageSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

percentageSchema.set('toJSON', {
    virtuals: true,
});

exports.percentageValues = mongoose.model('percentageValues', percentageSchema, 'merciPercentages');
exports.percentageSchema = percentageSchema;