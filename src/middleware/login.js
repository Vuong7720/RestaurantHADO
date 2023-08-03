const AccountModel = require('../models/accountModel');
const {mutipleMongooseToObject} = require('../util/mongoose')
const jwt = require('jsonwebtoken')

class login {
    logAdmin(req, res, next) {
        try {
          var token = req.cookies.token;
          var result = jwt.verify(token, 'mk');
          if (result) {
            AccountModel.findById(result._id)
              .then(account => {
                if (account.role === 'admin') {
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
      checkLoggedIn(req, res, next) {
        var token = req.cookies.token;
        if (token) {
          try {
            var result = jwt.verify(token, 'mk');
            if (result) {
              
              return res.redirect('/');
            }
          } catch (err) {
            console.log(err);
          }
        }
        next();
      }
    }
    
    module.exports = new login;

