const express = require('express');
const { getUsers,
getUser,
createUser,
updateUser,
deleteUser,
userlogin,
userphone,
userPasswordUpdate} = require('../Controllers/UserGlobalController');

const Router = express.Router();

Router.route('/').post(createUser);
Router.route('/getGloabalUsers').get(getUsers)
Router.route('/:id').get(getUser).put(updateUser).delete(deleteUser);
Router.route('/login').post(userlogin);
Router.route('/phone').post(userphone);
Router.route('/updatePassword').post(userPasswordUpdate);

module.exports = Router