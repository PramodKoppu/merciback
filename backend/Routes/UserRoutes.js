const express = require('express');
const { getUsers,
getUser,
createUser,
updateUser,
deleteUser,
userlogin,
userrefer,
userpancheck,
useraadhar,
useridCheck,
userphone,
usersList,
shoplogin, 
getShopUser} = require('../Controllers/UserController');

const Router = express.Router();

Router.route('/').get(getUsers).post(createUser);
Router.route('/:id').get(getUser).put(updateUser).delete(deleteUser);
Router.route('/login').post(userlogin);
Router.route('/shoplogin').post(shoplogin);
Router.route('/refer').post(userrefer);
Router.route('/pancard').post(userpancheck);
Router.route('/aadhar').post(useraadhar);
Router.route('/useridCheck').post(useridCheck);
Router.route('/phone').post(userphone);
Router.route('/referList').post(usersList);
Router.route('/getshopuser/:id').get(getShopUser);

module.exports = Router