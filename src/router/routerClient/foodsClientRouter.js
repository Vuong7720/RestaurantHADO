const express = require('express');
const router = express.Router();
const FoodsClientController = require('../../app/controllersClient/foodsClientController')

router.get('/', FoodsClientController.showFoods)
// router.post('/create', DataController.createData)


module.exports = router