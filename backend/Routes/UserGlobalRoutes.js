const express = require('express');
const { getUsers,
getUser,
createUser,
updateUser,
deleteUser,
userlogin,
userphone,
userPasswordUpdate,
getUserByPhone,
userPasswordEmail,
userPasswordUpdatebyEmail} = require('../Controllers/UserGlobalController');

const Router = express.Router();

Router.route('/').post(createUser);
Router.route('/getGloabalUsers').get(getUsers)
Router.route('/:id').get(getUser).put(updateUser).delete(deleteUser);
Router.route('/login').post(userlogin);
Router.route('/phone').post(userphone);
Router.route('/getPhone').post(getUserByPhone);
Router.route('/updatePassword').post(userPasswordUpdate);
Router.route('/changepass').post(userPasswordEmail);
Router.route('/changepassbyemail').post(userPasswordUpdatebyEmail);

module.exports = Router