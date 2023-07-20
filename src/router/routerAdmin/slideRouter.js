const express = require('express');
const router = express.Router();
const SlideController = require('../../app/controllersAdmin/slideController')
const upload = require('../../middleware/uploadSlide')
const login = require('../../middleware/login')

router.get('/', login.logAdmin, SlideController.showSlide)
router.post('/', upload.single('imageSlide'), SlideController.addslides)
router.post('/slide-handle-form-action',SlideController.handleFormAction)
router.put('/:id', upload.single('NewimageSlide'),SlideController.updateslides)
router.delete('/:id', SlideController.softDeleteSlides)
router.get('/:id', SlideController.showslidesId)


module.exports = router