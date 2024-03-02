const express = require('express');
const { getAllCategories, 
getProducts, 
getProduct,
getProductBySKU,
updatehHotProduct,
updatehValueProduct, 
deleteProduct,
updateDeodapPrice,
updateSingleDeodapPrice
} = require('../Controllers/DeodapController');

const Router = express.Router();

Router.route('/categories').get(getAllCategories);
Router.route('/deodapproducts').post(getProducts);
Router.route('/deodapproduct').post(getProductBySKU);
Router.route('/deodapproducts/:id').post(getProduct);
Router.route('/updatePrice').post(updateDeodapPrice);
Router.route('/updateSingle').post(updateSingleDeodapPrice);
Router.route('/updateHot').post(updatehHotProduct);
Router.route('/updateValuable').post(updatehValueProduct);
Router.route('/deleteProduct').post(deleteProduct);



module.exports = Router