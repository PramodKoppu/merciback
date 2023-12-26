const express = require('express');
const { getAllCategories, 
    addProducts,
    getProducts, 
    getProduct,
    getProductBySKU,
//  getCategory,
 updateCJPrice,
 updateUSCJPrice,
 updatehHotProduct,
 updatehValueProduct, 
 deleteProduct,
 updateSingleCJPrice,
} = require('../Controllers/CJController');

const Router = express.Router();

Router.route('/categories').get(getAllCategories);
Router.route('/addproducts').post(addProducts);
Router.route('/dobaproducts').post(getProducts);
Router.route('/dobaproduct').post(getProductBySKU);
Router.route('/dobaproducts/:id').post(getProduct);
// Router.route('/category').post(getCategory);
Router.route('/updatePrice').post(updateCJPrice);
Router.route('/updateUSPrice').post(updateUSCJPrice);
Router.route('/updateHot').post(updatehHotProduct);
Router.route('/updateValuable').post(updatehValueProduct);
Router.route('/deleteProduct').post(deleteProduct);
Router.route('/updateSingle').post(updateSingleCJPrice);



module.exports = Router