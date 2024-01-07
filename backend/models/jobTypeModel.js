
const mongoose = require("mongoose");
const {ObjectId} = mongoose.Schema


const jobTypeSchema = new mongoose.Schema({
    
    jobTypeName:{
        type:String,
        trim:true,
        requried:[true,'job category is required'],
        maxlength:70,
    },
    
    user:{
        type:ObjectId,
        ref:"User",
        requried:true
    },
   
},{timestamps:true}) 


module.exports = mongoose.model("JobType",jobTypeSchema); 