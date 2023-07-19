
const mongoose = require('./db');
const Schema = mongoose.Schema;
const SoftDeleteModel = require('mongoose-delete');

const AccountSchema = require('../models/accountModel').schema;
const FoodsSchema = require('../models/foodsModel').schema;
const NewsSchema = require('../models/newsModel').schema;
const SlideSchema = require('../models/slideModel').schema;
const StaffSchema= require('../models/staffModel').schema;

const CombinedSchema = new Schema({
    account: [AccountSchema],
    foods: [FoodsSchema],
    news: [NewsSchema],
    slides: [SlideSchema],
    staffs: [StaffSchema]
}, {
  collection: 'combined'
});

CombinedSchema.plugin(SoftDeleteModel, { 
  deletedAt: true,
  overrideMethods: 'all'
});

const CombinedModel = mongoose.model('combined', CombinedSchema);

module.exports = CombinedModel;
