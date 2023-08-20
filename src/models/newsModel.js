const mongoose = require('./db')
const Schema = mongoose.Schema
const SoftDeleteModel = require('mongoose-delete');
const NewsSchema = new Schema({
    titleNews: {type:String},
    nameNews: {type:String},
    imageNews: {type:String},
    authorNews: {type:String},
    likeNews: {type:String},
    postNews: {type:String},
    createdAt:{type: Date, default:Date.now()},
    updatedAt:{type: Date, default:Date.now()}
},{
    collection: 'news',
})
NewsSchema.plugin(SoftDeleteModel, { 
    deletedAt: true,
    overrideMethods: 'all',
 });
const NewsModel = mongoose.model('news', NewsSchema)

module.exports = NewsModel
 