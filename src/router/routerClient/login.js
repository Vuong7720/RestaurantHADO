const express = require('express');
const router = express.Router();
const AccountController = require('../../app/controllersAdmin/accountController')

router.get('/', AccountController.showLogin);

module.exports = router