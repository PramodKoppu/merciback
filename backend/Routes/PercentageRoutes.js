const express = require('express');
const { getpercentage, addPercentage } = require('../Controllers/percentageController');

const Router = express.Router();

Router.route('/getpercentage').post(getpercentage);
Router.route('/addpercentage').post(addPercentage);

module.exports = Router