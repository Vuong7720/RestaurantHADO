const mongoose = require('./db')
const Schema = mongoose.Schema
const SoftDeleteModel = require('mongoose-delete');
const FoodsSchema = new Schema({
    nameFood:{type: String},
    imageFood:{type: String},
    description:{type: String},
    titleFood:{type: String},
    price:{type: Number},
    rate:{type: Number, default:0},
    createdAt:{type: Date, default:Date.now()},
    updatedAt:{type: Date, default:Date.now()}
},{
    collection: 'foods',
})
// add plugin
FoodsSchema.plugin(SoftDeleteModel, { 
    deletedAt: true,
    overrideMethods: 'all',
 });
const FoodsModel = mongoose.model('foods', FoodsSchema)

module.exports = FoodsModel
