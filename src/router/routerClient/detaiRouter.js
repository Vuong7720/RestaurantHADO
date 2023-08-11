const express = require('express');
const router = express.Router();
const FoodsDetaiController = require('../../app/controllersClient/detaiController')

router.get('/detai/:id', FoodsDetaiController.showFoods)


module.exports = router