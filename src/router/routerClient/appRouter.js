const express = require('express');
const router = express.Router();
const DataController = require('../../app/controllersClient/appController')

router.get('/', DataController.showData)
router.post('/create', DataController.createData)


module.exports = router