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

            NewsModel.find({})
                .skip(skip)
                .limit(pageSize)
                .then(news => {
                    res.render('admin/show', {
                        showNews:true,
                        news: mutipleMongooseToObject(news),
                    })
                })
                .catch(err => {
                    res.status(500).json('loi server1')
                })
        }
        else if (q) {
            NewsModel.find({
                $or: [
                    { nameNews: { $regex: q, $options: 'i' } },
                    { titleNews: { $regex: q, $options: 'i' } },
                ],
            })
                .then(news => {
                    res.render('admin/show', {
                        showNews:true,
                        news: mutipleMongooseToObject(news),
                    })
                })
                .catch(err => {
                    res.status(500).json('Lỗi server account')
                });
        }
        else {
            NewsModel.find({})
                .then(news => {
                    res.render('admin/show', {
                        showNews:true,
                        news: mutipleMongooseToObject(news),
                    })
                })
                .catch(err => {
                    res.status(500).json('err showFood in server')
                })
        }
    }

    shownewsId(req, res, next) {
        var id = req.params.id
        NewsModel.findById({ _id: id })
            .then(data => {
                res.json(data)
            })
            .catch(err => {
                res.status(500).json('err showFoodId in server')
            })
    }
    addnews(req, res, next) {
        // lưu ý, trong tương lai phải sửa lại ko đc để món ăn trùng lặp...
        var { nameNews, titleNews, imageNews, titleNews,
            authorNews,
            likeNews,
            postNews, createdAt, updatedAt } = req.body
        if (req.file) {
            imageNews = req.file.path
        }

        NewsModel.findOne({ nameNews: nameNews })
            .then(data => {
                if (data) {
                    res.json('News da ton tai')
                }
                else {
                    return NewsModel.create({
                        nameNews, titleNews, imageNews, createdAt, authorNews,
                        likeNews,
                        postNews, updatedAt
                    })
                        .then(() => {
                            res.redirect('/admin/news')
                        })
                }
            }).catch(err => {
                res.status(500).json('err addFood in server')
            })
    }
    updatenews(req, res, next) {
        var id = req.params.id
        var { NewnameNews, NewtitleNews, NewimageNews,
            NewauthorNews,
            NewlikeNews,
            NewpostNews, updatedAt } = req.body
        if (req.file) {
            NewimageNews = req.file.path
        }
        NewsModel.findByIdAndUpdate(id, {
            nameNews: NewnameNews,
            titleNews: NewtitleNews,
            imageNews: NewimageNews,
            authorNews:NewauthorNews,
            likeNews:NewlikeNews,
            postNews:NewpostNews,
            updatedAt


        })
            .then(() => {
                res.redirect('/admin/news')
            })
            .catch(err => {
                res.status(500).json('err updateFood in server')
            })
    }
    softDeletenews(req, res, next) {
        var id = req.params.id
        NewsModel.delete({ _id: id })
            .then(() => {
                res.redirect('/admin/news')
            })
            .catch(err => { res.status(500).json('err updateFood in server') })
    }
}

module.exports = new NewsController