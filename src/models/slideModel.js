const mongoose = require('./db')
const Schema = mongoose.Schema

const SlideSchema = new Schema({
    nameSlide:{type: String},
    imageSlide:{type: String},
    titleSlide:{type: String},
    createdAt:{type: Date, default:Date.now()},
    updatedAt:{type: Date, default:Date.now()}
},{
    collection: 'slides',
})

const SlideModel = mongoose.model('slides', SlideSchema)

module.exports = SlideModel
