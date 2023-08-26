const StaffModel = require('../../models/staffModel')
const upload = require('../../middleware/uploadImgFoods')
const { mutipleMongooseToObject } = require('../../util/mongoose')
const jwt = require('jsonwebtoken')
class StaffController {
    showStaff(req, res, next) {
        const pageSize = 10;
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
                    { nameStaff: { $regex: q, $options: 'i' } },
                    { address: { $regex: q, $options: 'i' } },
                    { position: { $regex: q, $options: 'i' } },
                ],
            };
        }
    
        StaffModel.find(query)
            .skip(skip)
            .limit(pageSize)
            .then(staffs => {
                StaffModel.countDocuments(query)
                    .then(totalCount => {
                        const totalPages = Math.ceil(totalCount / pageSize);
                        const prevPage = page > 1 ? page - 1 : 1;
                        const nextPage = page < totalPages ? page + 1 : totalPages;
    
                        res.render('admin/show', {
                            showStaff: true,
                            isLogin: result,
                            staffs: mutipleMongooseToObject(staffs),
                            pageSize: pageSize,
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
    handleFormAction(req, res, next){
        switch(req.body.action){
            case 'delete':
                StaffModel.delete({ _id:{ $in: req.body.collectionIds }})
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



module.exports = new StaffController