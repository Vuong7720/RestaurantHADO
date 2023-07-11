const FoodsModel = require('../../models/foodsModel')
const upload = require('../../middleware/uploadImgFoods')
const {mutipleMongooseToObject} = require('../../util/mongoose')

class FoodsController {
    showFoods(req, res, next) {
        const pageSize = 10;
        var page = req.query.page
        var q = req.query.q;
        if (page) {
            page = parseInt(page)
            if (page <= 1) {
                page = 1
            }
            var skip = (page - 1) * pageSize

            FoodsModel.find({})
                .skip(skip)
                .limit(pageSize)
                .then(foods => {
                    res.render('admin/show',{
                        showFood:true,
                        foods: mutipleMongooseToObject(foods),
                    })
                })
                .catch(err => {
                    res.status(500).json('loi server1')
                })
        }
        else if(q){
            FoodsModel.find({
                $or: [
                  { nameFood: { $regex: q, $options: 'i' } },
                  { titleFood: { $regex: q, $options: 'i' } },
                ],
              })
              .then(foods => {
                  res.render('admin/show',{
                    showFood:true,
                      foods: mutipleMongooseToObject(foods),
                  })
              })
              .catch(err => {
                  res.status(500).json('Lỗi server account')
              });
        }else{
        FoodsModel.find({})
            .then(foods => {
                res.render('admin/show',{
                    showFood:true,
                    foods: mutipleMongooseToObject(foods),
                })
            })
            .catch(err => {
                res.status(500).json('err showFood in server')
            })
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
        // lưu ý, trong tương lai phải sửa lại ko đc để món ăn trùng lặp...
        var { nameFood, imageFood, description, titleFood, price, rate, createdAt, updatedAt } = req.body
        if(req.file){
            imageFood = req.file.path
        }

        FoodsModel.findOne({nameFood: nameFood})
        .then(data =>{
            if(data){
                res.json('mon an da ton tai')
            }
            else{
                return FoodsModel.create({
                    nameFood, imageFood, description, titleFood, price, rate, createdAt, updatedAt
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
        var { NewnameFood, NewimageFood, Newdescription, NewtitleFood, Newprice, Newrate, createdAt, updatedAt } = req.body
        if(req.file){
            NewimageFood = req.file.path
        }
        FoodsModel.findByIdAndUpdate(id, {
            nameFood: NewnameFood, 
            imageFood: NewimageFood, 
            description: Newdescription, 
            titleFood: NewtitleFood, 
            price: Newprice, 
            rate: Newrate,
            updatedAt
        })
        .then(() =>{
            res.redirect('/admin/foods')
        })
        .catch(err =>{
            res.status(500).json('err updateFood in server')
        })
    }
    deleteFoods(req, res, next) {
        var id = req.params.id
        FoodsModel.deleteOne({_id:id})
        .then(() =>{
            res.redirect('/admin/foods')
        })
        .catch(err =>{res.status(500).json('err updateFood in server')})
    }
}

module.exports = new FoodsController