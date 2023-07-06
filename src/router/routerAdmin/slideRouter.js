const express = require('express');
const router = express.Router();
const SlideController = require('../../app/controllersAdmin/slideController')
const upload = require('../../middleware/uploadSlide')

router.get('/', SlideController.showSlide)
router.post('/', upload.single('imageSlide'), SlideController.addslides)
router.put('/:id', upload.single('NewimageSlide'),SlideController.updateslides)
router.delete('/:id', SlideController.deleteSlides)
router.get('/:id', SlideController.showslidesId)


module.exports = router