const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const Students = require("../models/studentModel");
const jwt = require("jsonwebtoken");
const crypto = require('crypto');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_SERVER,
  port: 465,
  secure: true,
  auth: {
    user: process.env.AUTH_EMAIL,
    pass: process.env.AUTH_PASSWORD,
  }, 
});

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
const createStudent = asyncHandler(async (req, res) => {
    const { authority, userName, firstName, lastName, phoneNo, email, password, blockNumber, roomNumber } = req.body;
    
    // Validate input
    if (!authority || !userName || !firstName || !lastName || !phoneNo || !email || !password || !blockNumber || !roomNumber) {
        res.status(400);
        throw new Error("All Fields are mandatory!");
    }

    // Check if email already exists
    const available = await Students.findOne({ email });
    if (available) {
        res.status(400);
        throw new Error("Email already Exists!");
    }

    // Hash the password
    const hashPassword = await bcrypt.hash(password, 10);

    // Generate a 6-digit OTP
    const otp = crypto.randomInt(1000, 9999);
    const otpExpiry = Date.now() + 60 * 60 * 1000; // OTP valid for 1 hour

    // Create the student record
    const student = await Students.create({
        authority, userName, firstName, lastName, phoneNo,
        email, password: hashPassword, blockNumber, roomNumber,
        verified: false, otp, otpExpiry
    });

    // Send OTP via email
    sendOtpEmail(student, otp, res);
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


const sendOtpEmail = async (user, otp, res) => {

    try {
        const mailOptions = {
            from: process.env.AUTH_EMAIL,
            to: user.email,
            subject: 'Your Verification OTP',
            html: `
                <h2>Email Verification</h2>
                <p>Your OTP for verifying your email is:</p>
                <h3>${otp}</h3>
                <p>This OTP will expire in 10 minutes.</p>
            `,
        };

        console.log("Sending email with options:", mailOptions);

        const response = await transporter.sendMail(mailOptions);
        console.log("Email sent response:", response);

        res.status(200).json({
            status: 'Pending',
            message: 'Verification OTP sent to your email',
        });
    } catch (error) {
        console.error("Error sending email:", error.message);
        res.status(500).json({
            status: 'Failed',
            message: 'Failed to send verification OTP',
            error: error.message,
        });
    }
};

//@desc Post Student
//@route POST /api/students/verify-otp
//@access private
const verifyOtp = asyncHandler(async (req, res) => {
    const { email, otp } = req.body;

    const user = await Students.findOne({ email });

    if (!user) {
        res.status(400);
        throw new Error("User not found");
    }

    // Check if OTP is valid
    if (user.otp === otp && user.otpExpiry > Date.now()) {
        // Mark user as verified
        user.verified = true;
        user.otp = null;
        user.otpExpiry = null;
        await user.save();

        res.status(200).json({
            status: 'Success',
            message: 'Email verified successfully',
        });
    } else {
        res.status(400);
        throw new Error("Invalid or expired OTP");
    }
});


module.exports = {
    getStudents,
    createStudent,
    loginStudent,
    currentUser,
    updateStudent,
    deleteStudent,
    searchStudentByEmail,
    verifyOtp,
};
