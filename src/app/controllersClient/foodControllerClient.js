
const FoodsModel = require('../../models/foodsModel')
const {mutipleMongooseToObject} = require('../../util/mongoose')

class FoodsControllerClient {
    showFoods(req, res, next) {
        FoodsModel.find({})
            .then(foods => {
                res.render('partials/clients/mainClient',{
                    foods: mutipleMongooseToObject(foods),
                })
            })
            .catch(err => {
                res.status(500).json('err showFood in server')
            })
    }

} 

module.exports = new FoodsControllerClient