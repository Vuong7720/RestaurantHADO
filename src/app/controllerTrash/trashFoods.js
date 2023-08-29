const FoodsModel = require('../../models/foodsModel')
const upload = require('../../middleware/uploadImgFoods')
const {mutipleMongooseToObject} = require('../../util/mongoose')

class FoodsController {
    showTrashFoods(req, res, next) {
        const pageSize = 10;
        var page = req.query.page
        var q = req.query.q;
        if (page) {
            page = parseInt(page)
            if (page <= 1) {
                page = 1
            }
            var skip = (page - 1) * pageSize

            FoodsModel.findWithDeleted({deleted:true,})
                .skip(skip)
                .limit(pageSize)
                .then(foods => {
                    res.render('admin/trash',{
                        showFoodsTrash:true,
                        foods: mutipleMongooseToObject(foods),
                    })
                })
                .catch(err => {
                    res.status(500).json('loi server1')
                })
        }
        else if(q){
            FoodsModel.findWithDeleted({deleted:true,
                $or: [
                  { nameFood: { $regex: q, $options: 'i' } },
                  { titleFood: { $regex: q, $options: 'i' } },
                ],
              })
              .then(foods => {
                  res.render('admin/trash',{
                    showFoodsTrash:true,
                      foods: mutipleMongooseToObject(foods),
                  })
              })
              .catch(err => {
                  res.status(500).json('Lỗi server account')
              });
        }else{
        FoodsModel.findWithDeleted({deleted:true,})
            .then(foods => {
                res.render('admin/trash',{
                    showFoodsTrash:true,
                    foods: mutipleMongooseToObject(foods),
                })
            })
            .catch(err => {
                res.status(500).json('err showFoodsTrash in server')
            })
        }
    }

    restoreFood(req,res, next){
        var id = req.params.id
        FoodsModel.restore({
            _id: id,
        })
            .then(() => {
                res.redirect('back')
            })
            .catch(err => {
                res.status(500).json('xoa that bai')
            })
    }
    deleteFoods(req, res, next) {
        var id = req.params.id
        FoodsModel.deleteOne({_id:id})
        .then(() =>{
            res.redirect('back')
        })
        .catch(err =>{res.status(500).json('err updateFood in server')})
    }
}

module.exports = new FoodsController