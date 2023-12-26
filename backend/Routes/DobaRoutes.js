const express = require('express');
const { getAllCategories, 
    getProducts, 
    getProduct,
    getProductBySKU,
 getCategory,
 updateDobaPrice,
 updateUSDobaPrice,
 updatehHotProduct,
 updatehValueProduct, 
deleteProduct,
updateSingleDobaPrice} = require('../Controllers/DobaController');

const Router = express.Router();

Router.route('/categories').get(getAllCategories);
Router.route('/dobaproducts').post(getProducts);
Router.route('/dobaproduct').post(getProductBySKU);
Router.route('/dobaproducts/:id').post(getProduct);
Router.route('/category').post(getCategory);
Router.route('/updatePrice').post(updateDobaPrice);
Router.route('/updateUSPrice').post(updateUSDobaPrice);
Router.route('/updateHot').post(updatehHotProduct);
Router.route('/updateValuable').post(updatehValueProduct);
Router.route('/deleteProduct').post(deleteProduct);
Router.route('/updateSingle').post(updateSingleDobaPrice);
module.exports = Router