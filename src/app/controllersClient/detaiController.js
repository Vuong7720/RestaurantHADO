const FoodsModel = require('../../models/foodsModel')
const upload = require('../../middleware/uploadImgFoods')
const jwt = require('jsonwebtoken')
const { mongooseToObject } = require('../../util/mongoose')

class FoodsDetaiController {

    showFoods(req, res, next) {
        var id = req.params.id;
        var token = req.cookies.token;
        var result = null;
        try {
          if (token) {
              result = jwt.verify(token, 'mk');
              
          }
      } catch (err) {
          console.error('Invalid token:', err.message);
      }
        FoodsModel.findById({_id: id})
            .then(foods =>{
                res.render('clients/show',{
                    showDetai:true,
                    isLogin: result,
                    foods: mongooseToObject(foods),
                })
            })
            .catch(err =>{
                res.status(500).json("err show detai")
                console.log(err)
            })
            
        }
    }

module.exports = new FoodsDetaiController