

const mongoose = require('mongoose');

const statesandcitiesSchema = new mongoose.Schema({
    Country: {
        type: String,
    },
    State: {
        type: String,
    },
    District: {
        type: String,
    },
    City: {
        type: String,
    },
    Name: {
        type: String,
    },
    Phone: {
        type: String,
    }
});

statesandcitiesSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

statesandcitiesSchema.set('toJSON', {
    virtuals: true,
});

exports.statesandcities = mongoose.model('statesandcities', statesandcitiesSchema);
exports.statesandcitiesSchema = statesandcitiesSchema;