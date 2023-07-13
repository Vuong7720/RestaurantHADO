const express = require('express');
const router = express.Router();
const TrashNewsController = require('../../app/controllerTrash/trashNews')

router.get('/', TrashNewsController.showNews);
router.patch('/:id/restore', TrashNewsController.restoreNews);
router.delete('/:id', TrashNewsController.Deletenews);

module.exports = router


