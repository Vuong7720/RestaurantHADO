const SlideModel = require('../../models/slideModel')
const {mutipleMongooseToObject} = require('../../util/mongoose')

class SlideControllerClient {
    showSlide(req, res, next) {
        SlideModel.find({})
            .then(slides => {
                res.render('partials/clients/slideClient',{
                    slides: mutipleMongooseToObject(slides),
                })
            })
            .catch(err => {
                res.status(500).json('err showFood in server')
            })
    }
}

module.exports = new SlideControllerClient