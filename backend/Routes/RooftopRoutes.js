const express = require('express');
const {
    createrooftopShop,
    rooftopShopsList,
    checkrooftopShopName,
    rooftopActive,
    getrooftopShop,
    findbyMerchantId
 } = require('../Controllers/RooftopController');

const Router = express.Router();

// Router.route('/').get(getUsers).post(createUser);
Router.route('/getshop').post(getrooftopShop);
Router.route('/addrooftop').post(createrooftopShop);
Router.route('/rooftoplist').get(rooftopShopsList);
Router.route('/checkusername').post(checkrooftopShopName);
Router.route('/rooftopActive').post(rooftopActive);
Router.route('/transactionlist').post(findbyMerchantId);
// Router.route('/phone').post(userphone);
// Router.route('/referList').post(usersList);

module.exports = Router