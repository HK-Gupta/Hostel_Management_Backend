const mongoose = require("mongoose");
 
const studentSchema = mongoose.Schema({
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
    blockNo: {
        type: String,
        required: [true, "Please select the block no."],
    },
    roomNo: {
        type: String,
        required: [true, "Please select the room no."],
    }
},{
    timestamps: true,
});

module.exports = mongoose.model("Students", studentSchema);