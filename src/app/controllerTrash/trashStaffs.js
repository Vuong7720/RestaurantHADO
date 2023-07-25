const StaffModel = require('../../models/staffModel')
const upload = require('../../middleware/uploadImgFoods')
const { mutipleMongooseToObject } = require('../../util/mongoose')
const fs = require('fs');

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
    // deleteStaff(req, res, next) {
    //     var id = req.params.id;
    
    //     // Trước khi xóa nhân viên, truy vấn để lấy thông tin về nhân viên
    //     StaffModel.findById(id)
    //         .then(staff => {
    //             if (!staff) {
    //                 // Nếu không tìm thấy nhân viên, gửi mã trạng thái 404 Not Found
    //                 return res.status(404).json('Staff not found');
    //             }
    
    //             // Lưu tên tệp ảnh
    //             const avatarFileName = staff.avataStaff;
    
    //             // Xóa nhân viên từ cơ sở dữ liệu
    //             StaffModel.deleteOne({ _id: id })
    //                 .then(() => {
    //                     // Nếu xóa thành công, tiến hành xóa tệp ảnh liên quan
    //                     const avatarDir = path.join(__dirname, 'avataStaff');
    //                     const avatarPath = path.join(avatarDir, avatarFileName);
    
    //                     // Kiểm tra xem tệp ảnh tồn tại trước khi xóa
    //                     if (fs.existsSync(avatarPath)) {
    //                         fs.unlinkSync(avatarPath); // Xóa tệp ảnh từ thư mục
    //                     }
    
    //                     res.redirect('back'); // Hoặc gửi JSON response thành công tùy vào ứng dụng của bạn
    //                 })
    //                 .catch(err => {
    //                     res.status(500).json('Error deleting staff');
    //                 });
    //         })
    //         .catch(err => {
    //             res.status(500).json('Error finding staff');
    //         });
    // }

}


module.exports = new TrashStaffController