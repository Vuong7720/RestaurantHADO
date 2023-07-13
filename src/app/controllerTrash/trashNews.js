const NewsModel = require('../../models/newsModel')
const { mutipleMongooseToObject } = require('../../util/mongoose')

class NewsController {
    showNews(req, res, next) {
        const pageSize = 10;
        var page = req.query.page
        var q = req.query.q;
        if (page) {
            page = parseInt(page)
            if (page <= 1) {
                page = 1
            }
            var skip = (page - 1) * pageSize

            NewsModel.findWithDeleted({deleted:true,})
                .skip(skip)
                .limit(pageSize)
                .then(news => {
                    res.render('admin/trash', {
                        showNewsTrash:true,
                        news: mutipleMongooseToObject(news),
                    })
                })
                .catch(err => {
                    res.status(500).json('loi server1')
                })
        }
        else if (q) {
            NewsModel.findWithDeleted({deleted:true,
                $or: [
                    { nameNews: { $regex: q, $options: 'i' } },
                    { titleNews: { $regex: q, $options: 'i' } },
                ],
            })
                .then(news => {
                    res.render('admin/trash', {
                        showNewsTrash:true,
                        news: mutipleMongooseToObject(news),
                    })
                })
                .catch(err => {
                    res.status(500).json('Lỗi server account')
                });
        }
        else {
            NewsModel.findWithDeleted({deleted:true,})
                .then(news => {
                    res.render('admin/trash', {
                        showNewsTrash:true,
                        news: mutipleMongooseToObject(news),
                    })
                })
                .catch(err => {
                    res.status(500).json('err showFood in server')
                })
        }
    }
    restoreNews(req,res, next){
        var id = req.params.id
        NewsModel.restore({
            _id: id,
        })
            .then(() => {
                res.redirect('back')
            })
            .catch(err => {
                res.status(500).json('xoa that bai')
            })
    }
    Deletenews(req, res, next) {
        var id = req.params.id
        NewsModel.deleteOne({ _id: id })
            .then(() => {
                res.redirect('/admin/news')
            })
            .catch(err => { res.status(500).json('err updateFood in server') })
    }
}

module.exports = new NewsController