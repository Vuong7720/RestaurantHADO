const express = require('express');
const router = express.Router();
const StaffController = require('../../app/controllersAdmin/staffController')
const upload = require('../../middleware/uploadImgFoods')

router.get('/', StaffController.showStaff)
router.post('/', upload.single('avataStaff'),StaffController.addStaff)
router.put('/:id', upload.single('NewavataStaff'),StaffController.updateStaff)
router.delete('/:id',StaffController.deleteStaff)



module.exports = router 