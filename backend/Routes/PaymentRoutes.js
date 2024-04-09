const express = require('express');
const paymentControl = require('../Controllers/PaymentController');


const Router = express.Router();

Router.route('/payment').post(paymentControl);

module.exports = Router
