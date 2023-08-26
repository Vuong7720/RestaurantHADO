const NewsModel = require('../../models/newsModel')
const { mutipleMongooseToObject } = require('../../util/mongoose')
const jwt = require('jsonwebtoken')
class NewsController {
    showNews(req, res, next) {
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
                    { nameNews: { $regex: q, $options: 'i' } },
                    { titleNews: { $regex: q, $options: 'i' } },
                ],
            };
        }
    
        NewsModel.find(query)
            .skip(skip)
            .limit(pageSize)
            .then(news => {
                NewsModel.countDocuments(query)
                    .then(totalCount => {
                        const totalPages = Math.ceil(totalCount / pageSize);
                        const prevPage = page > 1 ? page - 1 : 1;
                        const nextPage = page < totalPages ? page + 1 : totalPages;
    
                        res.render('admin/show', {
                            showNews: true,
                            isLogin: result,
                            news: mutipleMongooseToObject(news),
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
    handleFormAction(req, res, next){
        switch(req.body.action){
            case 'delete':
                NewsModel.delete({ _id:{ $in: req.body.collectionIds }})
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

module.exports = new NewsController