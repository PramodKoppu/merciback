const express = require('express');
const { paymentControl, paymentValidate} = require('../Controllers/PaymentController');
const { createPurchasedData, getDataWithUserID, updateStatus, updateRefund, getPurchaseData, getPurchaseDataById, 
    cancelOrder
 } = require('../Controllers/PurchaseController');

const Router = express.Router();

Router.route('/payment').post(paymentControl);
Router.route('/paymentValidate').post(paymentValidate);
Router.route('/purchase').post(createPurchasedData);
Router.route('/getorders').post(getDataWithUserID);
Router.route('/statusupdate').post(updateStatus);
Router.route('/refundupdate').post(updateRefund);
Router.route('/purchaseorders').get(getPurchaseData);
Router.route('/ordersbyphone').post(getPurchaseDataById);
Router.route('/cancelorder').post(cancelOrder);


module.exports = Router
