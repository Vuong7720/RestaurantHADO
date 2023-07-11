const express = require('express');
const router = express.Router();
const TrashAccountController = require('../../app/controllerTrash/trashAccount')

router.get('/', TrashAccountController.showTrashAccount);
router.patch('/:id/restore', TrashAccountController.restoreAccount);
router.delete('/:id', TrashAccountController.deleteAccount);

module.exports = router


