const FoodsModel = require('../../models/foodsModel')
const upload = require('../../middleware/uploadImgFoods')
const jwt = require('jsonwebtoken')
const { mutipleMongooseToObject } = require('../../util/mongoose')

class FoodsClientController {

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
                    FoodsModel.countDocuments({})
                        .then(totalCount => {
                            res.render('clients/show', {
                                showFoodCli: true,
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
                    res.render('clients/show', {
                        showFoodCli: true,
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
                            res.render('clients/show', {
                                showFoodCli: true,
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
}

module.exports = new FoodsClientController