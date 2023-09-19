

const mongoose = require('mongoose');

const bloodContactsSchema = new mongoose.Schema({
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

bloodContactsSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

bloodContactsSchema.set('toJSON', {
    virtuals: true,
});

exports.bloodContacts = mongoose.model('bloodContacts', bloodContactsSchema);
exports.bloodContactsSchema = bloodContactsSchema;