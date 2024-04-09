const express = require('express');
const { addContactRequest, getContactRequest, addNewsLetterRequest, getNewLetterRequest } =  require("../Controllers/EmartController");
const Router = express.Router();

Router.route('/contactRequest').get(getContactRequest).post(addContactRequest);
Router.route('/newsLetter').get(getNewLetterRequest).post(addNewsLetterRequest);

module.exports = Router