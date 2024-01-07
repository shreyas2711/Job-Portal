const Job = require('../models/jobModel');
const JobType = require('../models/jobTypeModel');
const ErrorResponse = require('../utils/errorResponse');
const { format } = require('date-fns');


//create job
exports.createJob = async (req, res, next) => {
    
    
    try {
        
        const job = await Job.create({
            title: req.body.title,
            description: req.body.description,
            salary: req.body.salary,
            location: req.body.location,
            jobType: req.body.jobType,
            companywebsite:req.body.companywebsite,
            experience:req.body.experience,
            batch:req.body.batch,
            jobdescription:req.body.jobdescription,
            keyresp:req.body.keyresp,
            requiredskill:req.body.requiredskill,
            user: req.user.id,
            thumbnail:req.body.thumbnail,
            date:Date.now(),
        });
        res.status(201).json({
            success: true,
            job
        })
    } catch (error) {
        next(error);
    }
}

//Single Job
exports.singleJob = async (req, res, next) => {
    try {
        const job = await Job.findById(req.params.id);
        res.status(201).json({
            success: true,
            job
        })
    } catch (error) {
        next(error);
    }
}

//Update Job by id.
// Update Job by id.
exports.updateJob = async (req, res, next) => {
    try {
        // const currentDate = new Date();
        // req.body.date = format(currentDate, 'd MMMM yyyy', { locale: 'en-GB' }); // Adjust the locale as needed
        const job = await Job.findByIdAndUpdate(req.params.job_id, req.body, { new: true })
            .populate('jobType', 'jobTypeName')
            .populate('user', 'firstName lastName');

        res.status(200).json({
            success: true,
            job,
        });
    } catch (error) {
        next(error);
    }
};






exports.showJobs = async (req, res, next) => {
    // Enable Search
    const keyword = req.query.keyword ? {
        title: {
            $regex: req.query.keyword,
            $options: 'i'
        }
    } : {};

    // Filter jobs by category ids
    let ids = [];
    const jobTypeCategory = await JobType.find({}, { _id: 1 });
    jobTypeCategory.forEach(cat => {
        ids.push(cat._id);
    });

    let cat = req.query.cat;
    let categ = cat !== '' ? cat : ids;

    // Jobs by location
    let locations = [];
    const jobByLocation = await Job.find({}, { location: 1 });
    jobByLocation.forEach(val => {
        locations.push(val.location);
    });

    let setUniqueLocation = [...new Set(locations)];
    let location = req.query.location;
    let locationFilter = location !== '' ? location : setUniqueLocation;

    // Enable pagination
    const pageSize = 5;
    const page = Number(req.query.pageNumber) || 1;
    const count = await Job.find({ ...keyword }).countDocuments();

    try {
        const jobs = await Job.find({ ...keyword, jobType: categ, location: locationFilter })
            .sort({ createdAt: -1 })
            .skip(pageSize * (page - 1))
            .limit(pageSize);

        res.status(200).json({
            success: true,
            jobs,
            page,
            pages: Math.ceil(count / pageSize),
            count,
            setUniqueLocation
        });
        console.log('API request URL:', req.originalUrl);
    } catch (error) {
        next(error);
    }
};
