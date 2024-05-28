const mongoose = require('mongoose');

const prodRatingsSchema = new mongoose.Schema({
    merci_company: {
        type: String,
        required: true,
      },
      merci_spu_id: {
        type: String,
        required: true,
      },
      merci_user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
      },
      merci_name: {
        type: String,
        default: "",
      },
      merci_rating: {
        type: Number,
        default: 0,
      },
      merci_comments: {
        type: String,
        default: '',
      },
      merci_created: {
        type: Date,
        default: Date.now,
      },
      merci_updated: {
        type: Date,
        default: Date.now,
      }
});

const ProdRatings = mongoose.model('ProdRatings', prodRatingsSchema, 'prodRatings');

module.exports = ProdRatings;