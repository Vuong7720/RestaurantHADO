const express = require('express');
const router = express.Router();
const AccountController = require('../../app/controllersAdmin/accountController')
const login = require('../../middleware/login')



router.get('/',login.logAdmin, AccountController.showAccount);
router.post('/register', AccountController.addAccount);
router.post('/login', AccountController.loginAccount);
router.get('/logOut', AccountController.logOut);
router.post('/account-handle-form-action',AccountController.handleFormAction)
router.put('/update/:id', AccountController.updateAccount);
router.delete('/:id', AccountController.softDeleteAccount);
// router.get('/:id', AccountController.showAccountId);



module.exports = router


