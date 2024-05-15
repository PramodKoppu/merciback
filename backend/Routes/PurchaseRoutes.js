const express = require('express');
const { createPurchasedData, getDataWithUserID, getPurchaseData, updateStatus, updateRefund } = require('../Controllers/PurchaseController');

const Router = express.Router();

Router.route('/purchaseOrders').get(getPurchaseData);


module.exports = Router