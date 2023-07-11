const express = require('express');
const router = express.Router();
const AccountController = require('../../app/controllersAdmin/accountController')

router.get('/', AccountController.showAccount);
router.post('/register', AccountController.addAccount);
router.post('/login', AccountController.loginAccount);
router.put('/update/:id', AccountController.updateAccount);
router.delete('/:id', AccountController.softDeleteAccount);
router.get('/:id', AccountController.showAccountId);



module.exports = router


