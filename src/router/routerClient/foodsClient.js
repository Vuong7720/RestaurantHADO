const express = require('express');
const router = express.Router();
const FoodsController = require('../../app/controllersClient/foodControllerClient')

// router.get('/', FoodsController.showSlide)
router.get('/', FoodsController.showFoods)


module.exports = router