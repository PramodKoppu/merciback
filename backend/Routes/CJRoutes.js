const express = require('express');
const { getAllCategories, 
    addProducts,
    getProducts, 
    getProduct,
    getProductBySKU,
//  getCategory,
 updateCJPrice,
 updatehHotProduct,
 updatehValueProduct, 
} = require('../Controllers/CJController');

const Router = express.Router();

Router.route('/categories').get(getAllCategories);
Router.route('/addproducts').post(addProducts);
Router.route('/dobaproducts').post(getProducts);
Router.route('/dobaproduct').post(getProductBySKU);
Router.route('/dobaproducts/:id').post(getProduct);
// Router.route('/category').post(getCategory);
Router.route('/updatePrice').post(updateCJPrice);
Router.route('/updateHot').post(updatehHotProduct);
Router.route('/updateValuable').post(updatehValueProduct);


module.exports = Router