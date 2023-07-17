const express = require('express');
const router = express.Router();
const FoodsController = require('../../app/controllersAdmin/foodsController')
const upload = require('../../middleware/uploadImgFoods')
const login = require('../../middleware/login')

router.get('/', login.logAdmin,FoodsController.showFoods)
router.post('/', upload.single('imageFood'), FoodsController.addFoods)
router.post('/foods-handle-form-action',FoodsController.handleFormAction)
router.put('/:id', upload.single('NewimageFood'),FoodsController.updateFoods)
router.delete('/:id', FoodsController.softDeleteFoods)
router.get('/:id', FoodsController.showFoodsId)


module.exports = router