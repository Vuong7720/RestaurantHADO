const express = require('express');
const router = express.Router();
const SlideControllerClient = require('../../app/controllersClient/slidesController')
const FoodsController = require('../../app/controllersClient/foodControllerClient')

// router.get('/', SlideControllerClient.showSlide)
router.get('/', FoodsController.showFoods)

module.exports = router