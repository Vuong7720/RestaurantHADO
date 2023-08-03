const express = require('express');
const router = express.Router();
const AccountController = require('../../app/controllersAdmin/accountController')
const login = require('../../middleware/login')
router.get('/',login.checkLoggedIn , AccountController.showLogin);

module.exports = router