const express = require('express');
const {
    createrooftopShop,
    rooftopShopsList,
    checkrooftopShopName,
    rooftopActive,
    getrooftopShop,
 } = require('../Controllers/RooftopController');

const Router = express.Router();

// Router.route('/').get(getUsers).post(createUser);
Router.route('/getshop').post(getrooftopShop);
Router.route('/addrooftop').post(createrooftopShop);
Router.route('/rooftoplist').get(rooftopShopsList);
Router.route('/checkusername').post(checkrooftopShopName);
Router.route('/rooftopActive').post(rooftopActive);
// Router.route('/useridCheck').post(useridCheck);
// Router.route('/phone').post(userphone);
// Router.route('/referList').post(usersList);

module.exports = Router