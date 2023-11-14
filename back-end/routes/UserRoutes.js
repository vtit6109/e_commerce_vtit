const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');
const AuthController = require('../controllers/AuthController');

// handle login
router.post('/loginwithphone', AuthController.checkPhoneNumber);
router.post('/verifycode', AuthController.verifyCode);
router.post('/loginwithemail', AuthController.loginWithEmail);
//create address
router.post('/:_id/address', UserController.addNewAddress);
//delete address
router.delete('/:_id/deleteaddress/:addressId', UserController.deleteAddress);
//create acccount
router.post('/registerUser', AuthController.registerUser);
//update infomateion user
router.patch('/:_id', UserController.updateUser);
// get one user
router.get('/:_id', UserController.getUser); 
// get all user
router.get('/', UserController.getAllUsers);

module.exports = router;
