const express = require('express');
const router = express.Router();
const TrashStaffsController = require('../../app/controllerTrash/trashStaffs')

router.get('/', TrashStaffsController.showStaff);
router.patch('/:id/restore', TrashStaffsController.restoreStaffs);
router.delete('/:id', TrashStaffsController.deleteStaff);

module.exports = router


