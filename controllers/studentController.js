const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const Students = require("../models/studentModel");
const jwt = require("jsonwebtoken");

//@desc Get all Students
//@route GET /api/students
//@access public
const getStudents = asyncHandler(async (req, res)=> {
    const students = await Students.find(); 
    res.status(200).json(students);
});

//@desc Create Students
//@route POST /api/students
//@access public
const createStudent = asyncHandler(async (req, res)=> {
    const {authority, userName, firstName, lastName, phoneNo, email, password, blockNo, roomNo} = req.body;
    if(!authority || !userName || !firstName || !lastName || !phoneNo ||
       !email || !password || !blockNo || !roomNo) {
        res.status(400);
        throw new Error("All Fields are mandatory!");
    }
    const available = await Students.findOne({email});
    if(available) {
        res.status(400);
        throw new Error("Email aldready Exists!");
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const students = await Students.create({
        authority, userName, firstName, lastName, phoneNo,
        email, password: hashPassword, blockNo, roomNo
    })
    res.status(201).json(students);
});

//@desc Post Student
//@route POST /api/students/login
//@access private
const loginStudent = asyncHandler(async (req, res)=> {
    const {email, password} = req.body;
    if(!email || !password) {
        res.status(400);
        throw new Error("All Fields are mandatory!");
    }

    const user = await Students.findOne({email});
    // Comparing password with the hashed password.
    if(user && (await bcrypt.compare(password, user.password))) {
        res.status(200).json(user);
    } else {
        res.status(401);
        throw new Error("Email or Password is not valid");
    }

});

//@desc Current user Info
//@route GET /api/students/current
//@access private
const currentUser = asyncHandler(async (req, res) => {
    res.json(req.user);
});


//@desc Update Students
//@route PUT /api/students/:id
//@access public
const updateStudent = asyncHandler(async (req, res)=> {
    const student = await Students.findById(req.params.id);
    if(!student) {
        res.status(404);
        throw new Error("Email not found")
    }
    const updatedStudent = await Students.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new: true}
    );
    res.status(200).json(updatedStudent);
});
 

//@desc Delete Students
//@route DELETE /api/students/:id
//@access public
const deleteStudent = asyncHandler(async (req, res)=> {
    const student = await Students.findById(req.params.id);
    if(!student) {
        res.status(404);
        throw new Error("Email not found")
    }
    await Students.findByIdAndDelete(req.params.id);
    res.status(200).json(student);
});

module.exports = {
    getStudents,
    createStudent,
    loginStudent,
    currentUser,
    updateStudent,
    deleteStudent,
};