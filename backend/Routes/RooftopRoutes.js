const express = require('express');
const {
    createrooftopShop,
    rooftopShopsList,
    checkrooftopShopName,
    rooftopActive,
    getrooftopShop,
    findbyMerchantId,
    addMerci,
    getAllMerci,
    deleteMerci,
    getMonthlyPurchase
 } = require('../Controllers/RooftopController');

const Router = express.Router();

// Router.route('/').get(getUsers).post(createUser);
Router.route('/getshop').post(getrooftopShop);
Router.route('/addrooftop').post(createrooftopShop);
Router.route('/rooftoplist/:refer').get(rooftopShopsList);
Router.route('/checkusername').post(checkrooftopShopName);
Router.route('/rooftopActive').post(rooftopActive);
Router.route('/transactionlist').post(findbyMerchantId);
Router.route('/monthlylist').post(getMonthlyPurchase);
Router.route('/addProduct').post(addMerci);
Router.route('/getProduct').get(getAllMerci);
Router.route('/product/:id').delete(deleteMerci);
// Router.route('/phone').post(userphone);
// Router.route('/referList').post(usersList);

module.exports = Router