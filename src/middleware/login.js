
const {mutipleMongooseToObject} = require('../util/mongoose')
const jwt = require('jsonwebtoken')

class login {
    logAdmin(req, res, next){
        try{
            var token = req.cookies.token
            var result = jwt.verify(token,'mk')
            if(result){
                next()
            } 
        }catch(err){
            return res.redirect('/login')
        }
    }
}

module.exports = new login

