const mongoose = require('./db')
const Schema = mongoose.Schema
const SoftDeleteModel = require('mongoose-delete');
const SlideSchema = new Schema({
    nameSlide:{type: String},
    imageSlide:{type: String},
    titleSlide:{type: String},
    createdAt:{type: Date, default:Date.now()},
    updatedAt:{type: Date, default:Date.now()}
},{
    collection: 'slides',
})
// add plugin
SlideSchema.plugin(SoftDeleteModel, { 
    deletedAt: true,
    overrideMethods: 'all',
 });
const SlideModel = mongoose.model('slides', SlideSchema)

module.exports = SlideModel
