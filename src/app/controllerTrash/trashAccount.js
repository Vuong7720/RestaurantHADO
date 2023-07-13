const AccountModel = require('../../models/accountModel');
const {mutipleMongooseToObject} = require('../../util/mongoose')
var mongooseDelete = require('mongoose-delete');

class TrashAccountController {
    showTrashAccount(req, res, next) {
        const pageSize = 10;
        var page = req.query.page
        var q = req.query.q;
        if (page) {
            page = parseInt(page)
            if (page <= 1) {
                page = 1
            }
            var skip = (page - 1) * pageSize

            AccountModel.findWithDeleted({deleted:true})
                .skip(skip)
                .limit(pageSize)
                .then(accounts => {
                    res.render('admin/trash',{
                        showAccountTrash:true,
                        accounts: mutipleMongooseToObject(accounts),
                    })
                })
                .catch(err => {
                    res.status(500).json('loi server1')
                })
        }
        else if(q){
            AccountModel.findWithDeleted({deleted:true,
                $or: [
                  { username: { $regex: q, $options: 'i' } },
                  { email: { $regex: q, $options: 'i' } },
                ],
              })
              .then(accounts => {
                  res.render('admin/trash',{
                    showAccountTrash:true,
                      accounts: mutipleMongooseToObject(accounts),
                  })
              })
              .catch(err => {
                  res.status(500).json('Lỗi server account')
              });
        } 
        else{
            AccountModel.findWithDeleted({deleted:true})
            .limit(pageSize)
                .then(accounts => {
                    res.render('admin/trash',{
                        showAccountTrash:true,
                        accounts: mutipleMongooseToObject(accounts),
                    })
                })
                .catch(err => {
                    res.status(500).json('Lỗi server account')
                });
        }
    }
    restoreAccount(req,res, next){
        var id = req.params.id
        AccountModel.restore({
            _id: id,
        })
            .then(() => {
                res.redirect('back')
            })
            .catch(err => {
                res.status(500).json('xoa that bai')
            })
    }
    
    deleteAccount(req, res, next) {
        var id = req.params.id
        AccountModel.deleteOne({
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

module.exports = new TrashAccountController;