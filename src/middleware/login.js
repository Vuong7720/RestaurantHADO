const AccountModel = require('../models/accountModel');
const {mutipleMongooseToObject} = require('../util/mongoose')
const jwt = require('jsonwebtoken')

class login {
    logAdmin(req, res, next) {
        try {
          var token = req.cookies.token;
          var result = jwt.verify(token, 'mk');
          if (result) {
            // Tìm kiếm tài khoản từ AccountModel dựa trên _id trong JWT
            AccountModel.findById(result._id)
              .then(account => {
                if (account) {
                 next()
                } else {
                  return res.redirect('/login');
                }
              })
              .catch(err => {
                console.log(err);
                return res.redirect('/login');
              });
          } else {
            return res.redirect('/login');
          }
        } catch (err) {
          console.log(err);
          return res.redirect('/login');
        }
      }
    }
    
    module.exports = new login;

