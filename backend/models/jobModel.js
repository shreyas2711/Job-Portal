
const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;


const jobSchema = new mongoose.Schema({

    title: {
        type: String,
        trim: true,
        required: [true, 'Title is required'],
        maxlength: 70,
    },

    description: {
        type: String,
        trim: true,
        required: [true, 'Description is required'],
    },
    salary: {
        type: String,
        trim: true,
        required: [true, 'Salary is required'],
    },
    location: {
        type: String,
    },
    available: {
        type: Boolean,
        default: true
    },
    jobType: {
        type: ObjectId,
        ref: "JobType",
        required: true
    },
    user: {
        type: ObjectId,
        ref: "User",
        required: true
    },

    companywebsite:{
        type:String,
        // required:true,
    },

    experience:{
        type:String,
        // required:true,
    },
    batch:{
        type:String,
        // required:true,
    },
    jobdescription:{
        type:String,
        // maxlength: 300,
        trim:true,

    },
    keyresp:{
        type:String,
    },

    requiredskill:{
        type:String,
    },
    thumbnail:{
        type:String,
    },
    date: {
        type: Date,
        default: Date.now,
    },



}, { timestamps: true })

module.exports = mongoose.model("Job", jobSchema);