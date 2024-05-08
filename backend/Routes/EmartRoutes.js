const express = require("express");
const {
  addContactRequest,
  getContactRequest,
  addNewsLetterRequest,
  getNewLetterRequest,
  createAddress,
  getAllAddress,
  getAddressById,
  updateAddress,
  deleteAddress,
  getAddressByPincode
} = require("../Controllers/EmartController");
const Router = express.Router();

Router.route("/contactRequest").get(getContactRequest).post(addContactRequest);
Router.route("/newsLetter").get(getNewLetterRequest).post(addNewsLetterRequest);
Router.route("/address/:id").get(getAddressById).put(updateAddress).delete(deleteAddress);
Router.route("/address").post(createAddress);
Router.route("/pincode/:pincode").get(getAddressByPincode);

module.exports = Router;
