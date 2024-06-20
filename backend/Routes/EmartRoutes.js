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
  getAddressByPincode,
  deleteNewsletterRequest,
  sendNewLetterRequest,
  sendContactReply
} = require("../Controllers/EmartController");
const Router = express.Router();

Router.route("/contactRequest").get(getContactRequest).post(addContactRequest);
Router.route("/contactReply").post(sendContactReply);
Router.route("/newsLetter").get(getNewLetterRequest).post(addNewsLetterRequest);
Router.route("/address/:id").get(getAddressById).put(updateAddress).delete(deleteAddress);
Router.route("/address").post(createAddress);
Router.route("/pincode/:pincode").get(getAddressByPincode);
Router.route("/newsLetterdelete/:id").get(deleteNewsletterRequest);
Router.route("/newsLetterRequest").post(sendNewLetterRequest);

module.exports = Router;
