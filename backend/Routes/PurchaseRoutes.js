const express = require('express');
const { createPurchasedData, getDataWithUserID, updateStatus, updateRefund } = require('../Controllers/PurchaseController');

const Router = express.Router();




module.exports = Router