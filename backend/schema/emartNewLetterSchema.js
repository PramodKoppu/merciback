

const mongoose = require('mongoose');

const emartNewsLetterSchema = new mongoose.Schema({
    merci_email: {
        type: String,
        required: true,
    }
}, { timestamps: true });

emartNewsLetterSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

emartNewsLetterSchema.set('toJSON', {
    virtuals: true,
});

exports.emartNewsLetter = mongoose.model('emartNewsLetter', emartNewsLetterSchema, "emartNewsLetter");
exports.emartNewsLetterSchema = emartNewsLetterSchema;