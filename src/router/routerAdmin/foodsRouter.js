const express = require('express');
const router = express.Router();
const FoodsController = require('../../app/controllersAdmin/foodsController')
const upload = require('../../middleware/uploadImgFoods')

router.get('/', FoodsController.showFoods)
router.post('/', upload.single('imageFood'), FoodsController.addFoods)
router.put('/:id', upload.single('NewimageFood'),FoodsController.updateFoods)
router.delete('/:id', FoodsController.deleteFoods)
router.get('/:id', FoodsController.showFoodsId)


module.exports = router