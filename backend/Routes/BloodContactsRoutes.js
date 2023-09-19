const express = require('express');
const { getContacts, getStatesCities } = require('../Controllers/BloodContactsController');

const Router = express.Router();

Router.route('/').post(getContacts);
Router.route('/states').get(getStatesCities);

module.exports = Router