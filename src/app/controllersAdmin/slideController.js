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

            SlideModel.find({})
                .skip(skip)
                .limit(pageSize)
                .then(slides => {
                    res.render('admin/show',{
                        showSlide:true,
                        slides: mutipleMongooseToObject(slides),
                    })
                })
                .catch(err => {
                    res.status(500).json('loi server1')
                })
        }
        else if(q){
            SlideModel.find({
                $or: [
                  { nameSlide: { $regex: q, $options: 'i' } },
                  { titleSlide: { $regex: q, $options: 'i' } },
                ],
              })
              .then(slides => {
                  res.render('admin/show',{
                    showSlide:true,
                      slides: mutipleMongooseToObject(slides),
                  })
              })
              .catch(err => {
                  res.status(500).json('Lỗi server account')
              });
        }
        else{
        SlideModel.find({})
            .then(slides => {
                res.render('admin/show',{
                    showSlide:true,
                    slides: mutipleMongooseToObject(slides),
                })
            })
            .catch(err => {
                res.status(500).json('err showFood in server')
            })
        }
    }

    showslidesId(req, res, next) {
        var id = req.params.id
        SlideModel.findById({ _id: id })
            .then(data => {
                res.json(data)
            })
            .catch(err => {
                res.status(500).json('err showFoodId in server')
            })
    }
    addslides(req, res, next) {
        // lưu ý, trong tương lai phải sửa lại ko đc để món ăn trùng lặp...
        var { nameSlide, titleSlide,imageSlide, createdAt, updatedAt } = req.body
        if(req.file){
            imageSlide = req.file.path
        }

        SlideModel.findOne({nameSlide: nameSlide})
        .then(data =>{
            if(data){
                res.json('Slide da ton tai')
            }
            else{
                return SlideModel.create({
                    nameSlide, titleSlide,imageSlide, createdAt, updatedAt
                })
                .then(() => {
                        res.redirect('/admin/slides')
                    })
            }
        }).catch(err => {
                res.status(500).json('err addFood in server')
            })
    }
    updateslides(req, res, next) {
        var id = req.params.id
        var {  NewnameSlide, NewtitleSlide,NewimageSlide, updatedAt } = req.body
        if(req.file){
            NewimageSlide = req.file.path
        }
        SlideModel.findByIdAndUpdate(id, {
            nameSlide: NewnameSlide,
             titleSlide: NewtitleSlide,
            imageSlide: NewimageSlide,
             updatedAt


        })
        .then(() =>{
            res.redirect('/admin/slides')
        })
        .catch(err =>{
            res.status(500).json('err updateFood in server')
        })
    }
    deleteSlides(req, res, next) {
        var id = req.params.id
        SlideModel.deleteOne({_id:id})
        .then(() =>{
            res.redirect('/admin/slides')
        })
        .catch(err =>{res.status(500).json('err updateFood in server')})
    }
}

module.exports = new SlideController