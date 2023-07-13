const StaffModel = require('../../models/staffModel')
const upload = require('../../middleware/uploadImgFoods')
const { mutipleMongooseToObject } = require('../../util/mongoose')

class TrashStaffController {
    showStaff(req, res, next) {
        const pageSize = 10;
        var page = req.query.page
        var q = req.query.q;
        if (page) {
            page = parseInt(page)
            if (page <= 1) {
                page = 1
            }
            var skip = (page - 1) * pageSize

            StaffModel.findWithDeleted({deleted:true,})
                .skip(skip)
                .limit(pageSize)
                .then(staffs => {
                    res.render('admin/trash',{
                        showStaffTrash:true,
                        staffs: mutipleMongooseToObject(staffs),
                    })
                })
                .catch(err => {
                    res.status(500).json('loi server1')
                })
        }
        else if(q){
            StaffModel.findWithDeleted({deleted:true,
                $or: [
                  { nameStaff: { $regex: q, $options: 'i' } },
                  { address: { $regex: q, $options: 'i' } },
                  { position: { $regex: q, $options: 'i' } },
                ],
              })
              .then(staffs => {
                  res.render('admin/trash',{
                    showStaffTrash:true,
                      staffs: mutipleMongooseToObject(staffs),
                  })
              })
              .catch(err => {
                  res.status(500).json('Lỗi server account')
              });
        }
        else{
        StaffModel.findWithDeleted({deleted:true,})
            .then(staffs => {
                res.render('admin/trash', {
                    showStaffTrash:true,
                    staffs: mutipleMongooseToObject(staffs),
                })
            })
            .catch(err => {
                res.status(500).json('err show staff')
            })
        }
    }
    restoreStaffs(req,res, next){
        var id = req.params.id
        StaffModel.restore({
            _id: id,
        })
            .then(() => {
                res.redirect('back')
            })
            .catch(err => {
                res.status(500).json('xoa that bai')
            })
    }
    deleteStaff(req, res, next) {
        var id = req.params.id
        StaffModel.deleteOne({ _id: id })
            .then(() => {
                res.redirect('back')
            })
            .catch(err => {
                res.status(500).json('error deleting')
            })
    }
}


module.exports = new TrashStaffController