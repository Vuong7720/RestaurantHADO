const express = require('express');
const router = express.Router();
const TrashFoodController = require('../../app/controllerTrash/trashFoods')

router.get('/', TrashFoodController.showTrashFoods);
router.patch('/:id/restore', TrashFoodController.restoreFood);
router.delete('/:id', TrashFoodController.deleteFoods);

module.exports = router


