const StaffModel = require('../../models/staffModel')
const upload = require('../../middleware/uploadImgFoods')
const { mutipleMongooseToObject } = require('../../util/mongoose')

class StaffController {
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

            StaffModel.find({})
                .skip(skip)
                .limit(pageSize)
                .then(staffs => {
                    res.render('admin/show',{
                        showStaff:true,
                        staffs: mutipleMongooseToObject(staffs),
                    })
                })
                .catch(err => {
                    res.status(500).json('loi server1')
                })
        }
        else if(q){
            StaffModel.find({
                $or: [
                  { nameStaff: { $regex: q, $options: 'i' } },
                  { address: { $regex: q, $options: 'i' } },
                  { position: { $regex: q, $options: 'i' } },
                ],
              })
              .then(staffs => {
                  res.render('admin/show',{
                    showStaff:true,
                      staffs: mutipleMongooseToObject(staffs),
                  })
              })
              .catch(err => {
                  res.status(500).json('Lỗi server account')
              });
        }
        else{
        StaffModel.find({})
            .then(staffs => {
                res.render('admin/show', {
                    showStaff:true,
                    staffs: mutipleMongooseToObject(staffs),
                })
            })
            .catch(err => {
                res.status(500).json('err show staff')
            })
        }
    }
    addStaff(req, res, next) {
        var { nameStaff, age, address, gender, position, avataStaff, contactInformation, phone, email, salary, calendar, startWorking, endWorking, createdAt
            , updatedAt } = req.body
        if (req.file) {
            avataStaff = req.file.path
        }
        StaffModel.create({
            nameStaff, age, address, gender, position,
            avataStaff, contactInformation, phone, email, salary,
            calendar, startWorking, endWorking, createdAt, updatedAt
        })
            .then(data => {
                res.redirect('back')
            })
            .catch(err => {
                res.status(500).json('err add staff')
            })
    }
    updateStaff(req, res, next) {
        var id = req.params.id
        var { NewnameStaff, Newage, Newaddress, Newgender, Newposition, NewavataStaff,
            NewcontactInformation, Newphone, Newemail, Newsalary, Newcalendar, NewstartWorking, NewendWorking
            , updatedAt } = req.body
        if (req.file) {
            NewavataStaff = req.file.path
        }
        StaffModel.findByIdAndUpdate(id, {
            nameStaff: NewnameStaff,
            age: Newage, address: Newaddress, gender: Newgender,
            position: Newposition, avataStaff: NewavataStaff,
            contactInformation: NewcontactInformation, phone: Newphone,
            email: Newemail, salary: Newsalary, calendar: Newcalendar,
            startWorking: NewstartWorking, endWorking: NewendWorking,
            updatedAt

        })
            .then(() => {
                res.redirect('back')
            })
            .catch(err => {
                res.status(500).json('error updating')
            })
    }

    softDeleteStaff(req, res, next) {
        var id = req.params.id
        StaffModel.delete({ _id: id })
            .then(() => {
                res.redirect('back')
            })
            .catch(err => {
                res.status(500).json('error deleting')
            })
    }
}


module.exports = new StaffController