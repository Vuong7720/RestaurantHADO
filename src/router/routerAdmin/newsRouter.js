const express = require('express');
const router = express.Router();
const NewsController = require('../../app/controllersAdmin/NewsController')
const upload = require('../../middleware/uploadimgNews')

router.get('/', NewsController.showNews)
router.post('/', upload.single('imageNews'), NewsController.addnews)
router.put('/:id', upload.single('NewimageNews'),NewsController.updatenews)
router.delete('/:id', NewsController.softDeletenews)
router.get('/:id', NewsController.shownewsId)


module.exports = router