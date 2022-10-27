const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Employee_Detail = new Schema({
    name:String,
    location:String,
    position:String,
    salary:Number
})
const EmpData=mongoose.model('employeelist',Employee_Detail);
module.exports = EmpData;