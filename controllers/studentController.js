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
    const {authority, userName, firstName, lastName, phoneNo, email, password, blockNumber, roomNumber} = req.body;
    if(!authority || !userName || !firstName || !lastName || !phoneNo ||
       !email || !password || !blockNumber || !roomNumber) {
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
        email, password: hashPassword, blockNumber, roomNumber, verified: false
    })
    // res.status(201).json(students);
    sendVerificationEmail(students, res);
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

//@desc Search Student by Email
//@route GET /api/students/search
//@access public
const searchStudentByEmail = asyncHandler(async (req, res) => {
    const { email } = req.query;

    if (!email) {
        res.status(400);
        throw new Error("Email query parameter is required");
    }

    const student = await Students.findOne({ email });

    if (!student) {
        res.status(404);
        throw new Error("Student not found with the given email");
    }

    res.status(200).json(student);
});


module.exports = {
    getStudents,
    createStudent,
    loginStudent,
    currentUser,
    updateStudent,
    deleteStudent,
    searchStudentByEmail,
};




const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'smtp-relay.brevo.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.AUTH_EMAIL,
    pass: process.env.AUTH_PASSWORD,
  }, 
});

const sendVerificationEmail = async (user, res) => {
  try {
    const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });

    const mailOptions = {
      from: process.env.AUTH_EMAIL,
      to: user.email,
      subject: 'Verify Your Email Address',
      html: `
        <h2>Email Verification</h2>
        <p>Thank you for registering. Please verify your email by clicking the link below:</p>
        <a href="${process.env.BASE_URL}/api/students/verify-email?token=${token}">Verify Email</a>
        <p>This link will expire in 1 hour.</p>
      `,
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({
      status: 'Pending',
      message: 'Verification email sent',
    });
  } catch (error) {
    res.status(500).json({
      status: 'Failed',
      message: 'Failed to send verification email',
      error: error.message,
    });
  }
};
