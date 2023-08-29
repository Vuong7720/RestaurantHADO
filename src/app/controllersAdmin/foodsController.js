const FoodsModel = require('../../models/foodsModel')
const upload = require('../../middleware/uploadImgFoods')
const { mutipleMongooseToObject } = require('../../util/mongoose')
const jwt = require('jsonwebtoken')
class FoodsController {
    showFoods(req, res, next) {
        const pageSize = 10;
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
                    { nameFood: { $regex: q, $options: 'i' } },
                    { titleFood: { $regex: q, $options: 'i' } },
                ],
            };
        }
    
        FoodsModel.find(query)
            .skip(skip)
            .limit(pageSize)
            .then(foods => {
                FoodsModel.countDocuments(query)
                    .then(totalCount => {
                        const totalPages = Math.ceil(totalCount / pageSize);
                        const prevPage = page > 1 ? page - 1 : 1;
                        const nextPage = page < totalPages ? page + 1 : totalPages;
    
                        res.render('admin/show', {
                            showFood: true,
                            isLogin: result,
                            pageSize: pageSize,
                            foods: mutipleMongooseToObject(foods),
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
    
   
    

    showFoodsId(req, res, next) {
        var id = req.params.id
        FoodsModel.findById({ _id: id })
            .then(data => {
                res.json(data)
            })
            .catch(err => {
                res.status(500).json('err showFoodId in server')
            })
    }
    addFoods(req, res, next) {
        var { nameFood, imageFood, description, titleFood, price, rate, cate, createdAt, updatedAt } = req.body
        if (req.file) {
            imageFood = req.file.path
        }

        FoodsModel.findOne({ nameFood: nameFood })
            .then(data => {
                if (data) {
                    res.json('mon an da ton tai')
                }
                else {
                    return FoodsModel.create({
                        nameFood, imageFood, description, titleFood, price, rate, cate, createdAt, updatedAt
                    })
                        .then(data => {
                            res.redirect('/admin/foods')
                        })
                }
            }).catch(err => {
                res.status(500).json('err addFood in server')
            })
    }
    updateFoods(req, res, next) {
        var id = req.params.id
        var { NewnameFood, NewimageFood, Newdescription, NewtitleFood, Newprice, Newrate, Newcate, createdAt, updatedAt } = req.body
        if (req.file) {
            NewimageFood = req.file.path
        }
        FoodsModel.findByIdAndUpdate(id, {
            nameFood: NewnameFood,
            imageFood: NewimageFood,
            description: Newdescription,
            titleFood: NewtitleFood,
            price: Newprice,
            rate: Newrate,
            cate: Newcate,
            updatedAt
        })
            .then(() => {
                res.redirect('/admin/foods')
            })
            .catch(err => {
                res.status(500).json('err updateFood in server')
            })
    }
    softDeleteFoods(req, res, next) {
        var id = req.params.id
        FoodsModel.delete({ _id: id })
            .then(() => {
                res.redirect('back')
            })
            .catch(err => { res.status(500).json('err updateFood in server') })
    }
    handleFormAction(req, res, next) {
        switch (req.body.action) {
            case 'delete':
                FoodsModel.delete({ _id: { $in: req.body.collectionIds } })
                    .then(() => {
                        res.redirect('back')
                    })
                    .catch(err => {
                        res.status(500).json('error deleting')
                    })
                break;

            default:
                res.redirect('back')
        }
    }
}

module.exports = new FoodsController