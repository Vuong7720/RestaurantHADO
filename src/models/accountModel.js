const mongoose = require('./db')
const Schema = mongoose.Schema

const AccountSchema = new Schema({
    username:{type: String, default:'user', maxLenghts: 255},
    email:{type:String, required: true},
    password:{type:String, required: true, min:8},
    role:{type:String, default:'user'},
    createdAt:{type: Date, default:Date.now()},
    updatedAt:{type: Date, default:Date.now()}
},{
    collection: 'accounts',
})

const AccountModel = mongoose.model('Account', AccountSchema)

module.exports = AccountModel
