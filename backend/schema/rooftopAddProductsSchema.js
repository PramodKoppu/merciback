const mongoose = require('mongoose');

const rooftopAddProductsSchema = new mongoose.Schema({
    merci_title: {
        type: String,
        required: true,
    },
    merci_description: {
        type: String,
        required: true,
    },
    merci_price: {
        type: Number,
        required: true,
    },
    merci_quantity: {
        type: Number,
        required: true,
    }
}, {
    timestamps: true
});

exports.rooftopAddProducts = mongoose.model('Merci', rooftopAddProductsSchema, 'rooftopAddProducts');