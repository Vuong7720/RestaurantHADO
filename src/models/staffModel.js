const mongoose = require('./db')
const Schema = mongoose.Schema

const StaffSchema = new Schema({
    nameStaff:{type: String,},
    age:{type: Number,},
    address:{type: String,},
    gender:{type: String,},
    position:{type: String,},
    avataStaff:{type: String,},
    contactInformation:{
        phone:{type: String,},
        email:{type: String,},
    },
    salary:{type: Number,},
    calendar:{
        startWorking:{type: String,},
        endWorking:{type: String},
    },
    createdAt:{type: Date, default:Date.now()},
    updatedAt:{type: Date, default:Date.now()}
},{
    collection: 'staffs',
})

const StaffModel = mongoose.model('staffs', StaffSchema)

module.exports = StaffModel
