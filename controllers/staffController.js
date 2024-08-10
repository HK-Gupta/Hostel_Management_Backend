const asyncHandler = require("express-async-handler");
const Staffs = require("../models/staffModel");

//@desc Get all Staffs
//@route GET /api/staffs
//@access public
const getStaffs = asyncHandler(async (req, res)=> {
    const staffs = await Staffs.find(); 
    res.status(200).json(staffs);
});


//@desc Create Staff
//@route POST /api/staffs
//@access public
const createStaff = asyncHandler(async (req, res)=> {
    const {authority, userName, firstName, lastName, jobRole, phoneNo, email, password} = req.body;
    if(!userName || !firstName || !lastName || !phoneNo ||
       !authority || !email || !password || !jobRole) {
        res.status(400);
        throw new Error("All Fields are mandatory!");
    }
    const available = await Staffs.findOne({email});
    if(available) {
        res.status(400);
        throw new Error("Email aldready Exists!");
    }
    const staffs = await Staffs.create({
        authority, userName, firstName, lastName, 
        jobRole, phoneNo, email, password
    })
    res.status(201).json(staffs);
});

//@desc Delete Staff
//@route DELETE /api/staffs/:id
//@access public
const deleteStaff = asyncHandler(async (req, res)=> {
    const requests = await Staffs.findById(req.params.id);
    if(!requests) {
        res.status(404);
        throw new Error("Staff not found")
    }
    await Staffs.findByIdAndDelete(req.params.id);
    res.status(200).json(requests);
});

module.exports = {
    createStaff,
    getStaffs,
    deleteStaff
};