const mongoose = require('mongoose');

const purchasedDataSchema = new mongoose.Schema({
    ORID: {
        type: String,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'userGlobals', // Reference to the User model
        required: true
    },
    orderID: {
        type: String,
        required: true
    },
    paymentID: {
        type: String,
        required: true
    },
    address: {
        type: {
            merci_name: {
                type: String,
                required: true
            },
            merci_mobile: {
                type: String,
                required: true
            },
            merci_pincode: {
                type: String,
                required: true
            },
            merci_locality: {
                type: String,
                required: true
            },
            merci_address: {
                type: String,
                required: true
            },
            merci_city: {
                type: String,
                required: true
            },
            merci_state: {
                type: String,
                required: true
            },
            merci_landmark: {
                type: String,
                required: false
            }
        },
        required: true
    },
    cartData: [{
        merci_count: {
            type: Number,
            required: true
        },
        id: {
            type: String,
            required: true
        },
        merci_spu_id: {
            type: String,
            required: true
        },
        merci_mrp: {
            type: Number,
            required: true
        },
        merci_prod_name: {
            type: String,
            required: true
        },
        merci_prod_img: {
            type: String,
            required: true
        }
    }],
    total: {
        type: Number,
        required: true
    },
    shippingFee: {
        type: Number,
        default: 0
    },
    discount: {
        type: Number,
        default: 0
    },
    purchasedDate: {
        type: Date,
        default: Date.now
    },
    returnDate: {
        type: Date,
        required: true
    },
    status: {
        type: Number,
        default: 1
    },
    refund: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true 
});

const PurchasedData = mongoose.model('PurchasedData', purchasedDataSchema, 'purchasedData');

module.exports = PurchasedData;