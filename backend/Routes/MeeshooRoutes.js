const express = require('express');
const {
  getAllCategories,
  addProducts,
  getProducts,
  updateMeeshoPrice,
  getProductBySKU,
  updatehHotProduct,
  updatehValueProduct,
} = require("../Controllers/MeeshoController");

const Router = express.Router();

Router.route('/categories').get(getAllCategories);
Router.route('/addproducts').post(addProducts);
Router.route('/meeshoproducts').post(getProducts);
Router.route('/meeshoproduct').post(getProductBySKU);
// Router.route('/dobaproducts/:id').post(getProduct);
// Router.route('/category').post(getCategory);
Router.route('/updatePrice').post(updateMeeshoPrice);
Router.route('/updateHot').post(updatehHotProduct);
Router.route('/updateValuable').post(updatehValueProduct);


module.exports = Router