const AccountModel = require('../../models/accountModel');
const {mutipleMongooseToObject} = require('../../util/mongoose')
const jwt = require('jsonwebtoken')

class AccountController {
   
    showAccount(req, res, next) {
        const pageSize = 5;
        const q = req.query.q;
        const token = req.cookies.token;
        let result = null;
    
        try {
            if (token) {
                result = jwt.verify(token, 'mk');
            }
        } catch (err) {
            console.error('Invalid token:', err.message);
        }
    
        let page = parseInt(req.query.page);
        if (isNaN(page) || page <= 0) {
            page = 1;
        }
    
        const skip = (page - 1) * pageSize;
    
        let query = {};
    
        if (q) {
            query = {
                $or: [
                    { username: { $regex: q, $options: 'i' } },
                    { email: { $regex: q, $options: 'i' } },
                ],
            };
        }
    
        AccountModel.find(query)
            .skip(skip)
            .limit(pageSize)
            .then(accounts => {
                AccountModel.countDocuments(query)
                    .then(totalCount => {
                        const totalPages = Math.ceil(totalCount / pageSize);
                        const prevPage = page > 1 ? page - 1 : 1;
                        const nextPage = page < totalPages ? page + 1 : totalPages;
    
                        res.render('admin/show', {
                            showAccount: true,
                            isLogin: result,
                            pageSize: pageSize,
                            accounts: mutipleMongooseToObject(accounts),
                            totalCount: totalCount,
                            currentPage: page,
                            prevPage: prevPage,
                            nextPage: nextPage,
                            totalPages: totalPages,
                        });
                    })
                    .catch(err => {
                        res.status(500).json('Lỗi server khi đếm số lượng bản ghi');
                    });
            })
            .catch(err => {
                res.status(500).json('Lỗi server khi lấy dữ liệu trang');
            });
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
                    return res.redirect('back')
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
    showLogin(req, res, next) {
        res.render('clients/show',{
            showLogin:true
        })
    }
    loginAccount(req, res, next) {
        var { username, password } = req.body
        AccountModel.findOne({ 
            username: username, 
            password: password 
        })
        .then(accounts => {
            if(accounts){
               var token = jwt.sign({
                _id:accounts._id,
               }, 'mk')
                res.cookie('token', token, { httpOnly: true, maxAge: 86400000 });
                res.redirect('/')
            }else{
                AccountModel.findOne({username: username})
                .then(user =>{
                    if(user){

                        res.send('<script>alert("Sai mật khẩu"); window.location="/login";</script>')
                    }else{
                        res.send('<script>alert("Tài khoản hoặc mật khẩu sai"); window.location="/login";</script>')
                    }
                })
                .catch(err => {
                    console.log(err)
                    res.send('<script>alert("Đã xảy ra lỗi"); window.location="/login";</script>');
                })
            }
        })
            .catch(err =>{console.log(err)})

    }
    logOut(req, res, next){
        res.clearCookie('token');
        return res.redirect('/login');
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
    handleFormAction(req, res, next){
        switch(req.body.action){
            case 'delete':
                AccountModel.delete({ _id:{ $in: req.body.collectionIds }})
                    .then(() => {
                        res.redirect('back')
                    })
                    .catch(err => {
                        res.status(500).json('error deleting')
                    })
                break;

            default:
                res.json({message: 'action is invalid'})
        }
    }
}

module.exports = new AccountController;