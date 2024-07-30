const mongoose = require("mongoose");
 
const staffSchema = mongoose.Schema({
    userName: {
        type: String,
        required: [true, "Please add the user name"],
    },
    firstName: {
        type: String,
        required: [true, "Please add the first name"],
    },
    lastName: {
        type: String,
        required: [true, "Please add the last name"],
    },
    jobRole: {
        type: String,
        required: [true, "Please add the job role"] 
    },
    phoneNo: {
        type: String,
        required: [true, "Please add the contact number"],
    },
    email: {
        type: String,
        required: [true, "Please add the email"],
        unique: [true, "Email address already exists"]
    },
    password: {
        type: String,
        required: [true, "Please add the pasword"],
    },
},{
    timestamps: true,
});

module.exports = mongoose.model("Staffs", staffSchema);