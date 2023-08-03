const FoodsModel = require('../../models/foodsModel')
const upload = require('../../middleware/uploadImgFoods')
const { mutipleMongooseToObject } = require('../../util/mongoose')
const jwt = require('jsonwebtoken')
class FoodsController {
    showFoods(req, res, next) {
        const pageSize = 10;
        var page = req.query.page;
        var q = req.query.q;
        var token = req.cookies.token;
        var result = null;
        try {
          if (token) {
              result = jwt.verify(token, 'mk');
              
          }
      } catch (err) {
          console.error('Invalid token:', err.message);
      }
        if (page) {
            page = parseInt(page);
            if (page <= 1) {
                page = 1;
            }
            var skip = (page - 1) * pageSize;
    
            FoodsModel.find({})
                .skip(skip)
                .limit(pageSize)
                .then(foods => {
                    // Đếm số lượng bản ghi để hiển thị phân trang
                    FoodsModel.countDocuments({})
                        .then(totalCount => {
                            res.render('admin/show', {
                                showFood: true,
                                 isLogin: result,
                                pageSize: pageSize,
                                foods: mutipleMongooseToObject(foods),
                                totalCount: totalCount,
                            });
                        })
                        .catch(err => {
                            res.status(500).json('Lỗi server khi đếm số lượng bản ghi');
                        });
                })
                .catch(err => {
                    res.status(500).json('Lỗi server khi lấy dữ liệu trang');
                });
        } else if (q) {
            FoodsModel.find({
                $or: [
                    { nameFood: { $regex: q, $options: 'i' } },
                    { titleFood: { $regex: q, $options: 'i' } },
                ],
            })
                .then(foods => {
                    res.render('admin/show', {
                        showFood: true,
                         isLogin: result,
                        pageSize: pageSize,
                        foods: mutipleMongooseToObject(foods),
                    });
                })
                .catch(err => {
                    res.status(500).json('Lỗi server khi tìm kiếm dữ liệu');
                });
        } else {
           
            FoodsModel.find({})
            .limit(pageSize)
                .then(foods => {
                    FoodsModel.countDocuments({})
                        .then(totalCount => {
                            res.render('admin/show', {
                                showFood: true,
                                 isLogin: result,
                                pageSize: pageSize,
                                foods: mutipleMongooseToObject(foods),
                                totalCount: totalCount,
                            });
                        })
                        .catch(err => {
                            res.status(500).json('Lỗi server khi đếm số lượng bản ghi');
                        });
                })
                .catch(err => {
                    res.status(500).json('Lỗi server khi lấy dữ liệu');
                });
        }
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
                res.json({ message: 'action is invalid' })
        }
    }
}

module.exports = new FoodsController