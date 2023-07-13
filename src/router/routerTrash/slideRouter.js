const express = require('express');
const router = express.Router();
const TrashSlidesController = require('../../app/controllerTrash/trashSlide')

router.get('/', TrashSlidesController.showSlide);
router.patch('/:id/restore', TrashSlidesController.restoreSlide);
router.delete('/:id', TrashSlidesController.deleteSlides);

module.exports = router


