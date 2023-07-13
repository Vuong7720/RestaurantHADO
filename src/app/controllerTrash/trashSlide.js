const SlideModel = require('../../models/slideModel')
const upload = require('../../middleware/uploadSlide')
const {mutipleMongooseToObject} = require('../../util/mongoose')

class SlideController {
    showSlide(req, res, next) {
        const pageSize = 10;
        var page = req.query.page
        var q = req.query.q;
        if (page) {
            page = parseInt(page)
            if (page <= 1) {
                page = 1
            }
            var skip = (page - 1) * pageSize

            SlideModel.findWithDeleted({deleted:true,})
                .skip(skip)
                .limit(pageSize)
                .then(slides => {
                    res.render('admin/trash',{
                        showSlideTrash:true,
                        slides: mutipleMongooseToObject(slides),
                    })
                })
                .catch(err => {
                    res.status(500).json('loi server1')
                })
        }
        else if(q){
            SlideModel.findWithDeleted({deleted:true,
                $or: [
                  { nameSlide: { $regex: q, $options: 'i' } },
                  { titleSlide: { $regex: q, $options: 'i' } },
                ],
              })
              .then(slides => {
                  res.render('admin/trash',{
                    showSlideTrash:true,
                      slides: mutipleMongooseToObject(slides),
                  })
              })
              .catch(err => {
                  res.status(500).json('Lỗi server account')
              });
        }
        else{
        SlideModel.findWithDeleted({deleted:true,})
            .then(slides => {
                res.render('admin/trash',{
                    showSlideTrash:true,
                    slides: mutipleMongooseToObject(slides),
                })
            })
            .catch(err => {
                res.status(500).json('err showFood in server')
            })
        }
    }
    restoreSlide(req,res, next){
        var id = req.params.id
        SlideModel.restore({
            _id: id,
        })
            .then(() => {
                res.redirect('back')
            })
            .catch(err => {
                res.status(500).json('xoa that bai')
            })
    }
    deleteSlides(req, res, next) {
        var id = req.params.id
        SlideModel.deleteOne({_id:id})
        .then(() =>{
            res.redirect('back')
        })
        .catch(err =>{res.status(500).json('err updateFood in server')})
    }
}

module.exports = new SlideController