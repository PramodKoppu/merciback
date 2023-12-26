const express = require('express');
const {
  getAllCategories,
  getProducts,
  updateBaapPrice,
  getProductBySKU,
  updatehHotProduct,
  updatehValueProduct,
  deleteProduct,
  
} = require("../Controllers/BaapController");

const Router = express.Router();

Router.route('/categories').get(getAllCategories);
Router.route('/baapproducts').post(getProducts);
Router.route('/baapproduct').post(getProductBySKU);
// Router.route('/dobaproducts/:id').post(getProduct);
// Router.route('/category').post(getCategory);
Router.route('/updatePrice').post(updateBaapPrice);
Router.route('/updateHot').post(updatehHotProduct);
Router.route('/updateValuable').post(updatehValueProduct);
Router.route('/deleteProduct').post(deleteProduct);


module.exports = Router