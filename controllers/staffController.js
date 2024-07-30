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
    const {userName, firstName, lastName, jobRole, phoneNo, email, password} = req.body;
    if(!userName || !firstName || !lastName || !phoneNo ||
       !email || !password || !jobRole) {
        res.status(400);
        throw new Error("All Fields are mandatory!");
    }
    const staffs = await Staffs.create({
        userName, firstName, lastName, jobRole,
        phoneNo, email, password
    })
    res.status(201).json(staffs);
});

module.exports = {
    createStaff,
    getStaffs
};