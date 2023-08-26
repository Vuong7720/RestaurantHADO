const SlideModel = require('../../models/slideModel')
const upload = require('../../middleware/uploadSlide')
const {mutipleMongooseToObject} = require('../../util/mongoose')
const jwt = require('jsonwebtoken')
class SlideController {
    showSlide(req, res, next) {
        const pageSize = 2;
        const q = req.query.q;
        const token = req.cookies.token;
        let result = null;
    
        try {
            if (token) {
                result = jwt.verify(token, 'mk');
            }
        } catch (err) {
            console.error('Invalid token:', err.message);
        }
    
        let page = parseInt(req.query.page);
        if (isNaN(page) || page <= 0) {
            page = 1;
        }
    
        const skip = (page - 1) * pageSize;
    
        let query = {};
    
        if (q) {
            query = {
                $or: [
                    { nameSlide: { $regex: q, $options: 'i' } },
                    { titleSlide: { $regex: q, $options: 'i' } },
                ],
            };
        }
    
        SlideModel.find(query)
            .skip(skip)
            .limit(pageSize)
            .then(slides => {
                SlideModel.countDocuments(query)
                    .then(totalCount => {
                        const totalPages = Math.ceil(totalCount / pageSize);
                        const prevPage = page > 1 ? page - 1 : 1;
                        const nextPage = page < totalPages ? page + 1 : totalPages;
    
                        res.render('admin/show', {
                            showSlide: true,
                            isLogin: result,
                            slides: mutipleMongooseToObject(slides),
                            pageSize: pageSize,
                            totalCount: totalCount,
                            currentPage: page,
                            prevPage: prevPage,
                            nextPage: nextPage,
                            totalPages: totalPages,
                        });
                    })
                    .catch(err => {
                        res.status(500).json('Lỗi server khi đếm số lượng bản ghi');
                    });
            })
            .catch(err => {
                res.status(500).json('Lỗi server khi lấy dữ liệu trang');
            });
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
                        res.redirect('back')
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
            res.redirect('back')
        })
        .catch(err =>{
            res.status(500).json('err updateFood in server')
        })
    }
    softDeleteSlides(req, res, next) {
        var id = req.params.id
        SlideModel.delete({_id:id})
        .then(() =>{
            res.redirect('back')
        })
        .catch(err =>{res.status(500).json('err updateFood in server')})
    }
    handleFormAction(req, res, next){
        switch(req.body.action){
            case 'delete':
                SlideModel.delete({ _id:{ $in: req.body.collectionIds }})
                    .then(() => {
                        res.redirect('back')
                    })
                    .catch(err => {
                        res.status(500).json('error deleting')
                    })
                break;

            default:
                res.json({message: 'action is invalid'})
        }
    }
}

module.exports = new SlideController