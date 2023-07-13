const AccountModel = require('../../models/accountModel');
const {mutipleMongooseToObject} = require('../../util/mongoose')

class AccountController {
    showAccount(req, res, next) {
        const pageSize = 10;
        var page = req.query.page
        var q = req.query.q;
        if (page) {
            page = parseInt(page)
            if (page <= 1) {
                page = 1
            }
            var skip = (page - 1) * pageSize

            AccountModel.find({})
                .skip(skip)
                .limit(pageSize)
                .then(accounts => {
                    AccountModel.countDocuments({}).then((total)=>{
                        var sumPage = Math.ceil(total/pageSize)
                    
                        res.render('admin/show',{
                            sumPage:sumPage,
                            showAccount:true,
                            accounts: mutipleMongooseToObject(accounts),
                        })
                    })
                })
                .catch(err => {
                    res.status(500).json('loi server1')
                })
        }
        else if(q){
            AccountModel.find({
                $or: [
                  { username: { $regex: q, $options: 'i' } },
                  { email: { $regex: q, $options: 'i' } },
                ],
              })
              .then(accounts => {
                  res.render('admin/show',{
                    showAccount:true,
                      accounts: mutipleMongooseToObject(accounts),
                  })
              })
              .catch(err => {
                  res.status(500).json('Lỗi server account')
              });
        }
        else{
            AccountModel.find({})
            .limit(pageSize)
                .then(accounts => {
                    res.render('admin/show',{
                        showAccount:true,
                        accounts: mutipleMongooseToObject(accounts),
                    })
                })
                .catch(err => {
                    res.status(500).json('Lỗi server account')
                });
        }
    }
    
    showAccountId(req, res, next) {
        var id = req.params.id;
        AccountModel.findById({ _id: id })
            .then(data => {
                res.json(data);
            })
            .catch(err => { res.status(500).json('Lỗi server accountId') });
    }

    addAccount(req, res, next) {
        var { username, email, password, role, createdAt, updatedAt } = req.body
        AccountModel.findOne({
            username: username,
        })
        .then(data => {
                if (data) {
                    return res.json('account already exists')
                } else {
                    return AccountModel.create({
                        username: username,
                        email: email,
                        password: password,
                        role: role,
                        createdAt: createdAt,
                        updatedAt: updatedAt
                    })
                    .then(data => {
                        res.redirect('back')
                    })
                    .catch(err => {
                        res.status(500).json('create failed')
                    })
                }
            })
            .catch(err => {
                res.status(500).json('database error');
              });
           
    }

    updateAccount(req, res, next) {
        var id = req.params.id
        var { Newusername, Newpassword,Newemail, Newrole } = req.body
        AccountModel.findByIdAndUpdate(id, {
            username: Newusername,
            password: Newpassword,
            email: Newemail,
            role: Newrole,
        })
        .then(() =>{
            res.redirect('back')
        })
        .catch(err =>{
            console.log(err)
            res.status(500).json('update failed')
        })

    }

    loginAccount(req, res, next) {
        var { username, password } = req.body
        AccountModel.findOne({ username: username, password: password })
        .then(accounts => {
            res.render('clients/headerClient',{
                accounts: mutipleMongooseToObject(accounts),
            })
        })
            .catch(err => res.status(500).json('login failed'))
    }

    softDeleteAccount(req, res, next) {
        var id = req.params.id
        AccountModel.delete({
            _id: id,
        })
            .then(() => {
                res.redirect('back')
            })
            .catch(err => {
                res.status(500).json('xoa that bai')
            })
    }
   
}

module.exports = new AccountController;