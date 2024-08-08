const asyncHandler = require("express-async-handler");
const Issue = require("../models/issueModel");

//@desc Get all Issues
//@route GET /api/issues
//@access public
const getIssues = asyncHandler(async (req, res)=> {
    const issues = await Issue.find(); 
    res.status(200).json(issues);
});


//@desc Create Issue
//@route POST /api/issues
//@access public
const createIssue = asyncHandler(async (req, res)=> {
    const {roomNumber, blockNumber, userName, firstName, lastName, email, phoneNo, issue, comment} = req.body;
    if(!roomNumber || !blockNumber || !phoneNo || !userName ||
       !firstName || !lastName || !email || !issue || !comment) {
        res.status(400);
        throw new Error("All Fields are mandatory!");
    }
    const issues = await Issue.create({
        roomNumber, blockNumber, userName, firstName, lastName, email, phoneNo, issue, comment
    })
    res.status(201).json(issues);
});

//@desc Delete Students
//@route DELETE /api/issues/:id
//@access public
const deleteIssue = asyncHandler(async (req, res)=> {
    const issues = await Issue.findById(req.params.id);
    if(!issues) {
        res.status(404);
        throw new Error("Email not found")
    }
    await Issue.findByIdAndDelete(req.params.id);
    res.status(200).json(issues);
});


module.exports = {
    getIssues,
    createIssue,
    deleteIssue
};