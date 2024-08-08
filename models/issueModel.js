const mongoose = require("mongoose");
 
const issueSchema = mongoose.Schema({
    roomNumber: {
        type: String,
        required: [true, "Please add the room number"],
    },
    blockNumber: {
        type: String,
        required: [true, "Please add the block number"],
    },
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
    email: {
        type: String,
        required: [true, "Please add the email"],
    },
    phoneNo: {
        type: String,
        required: [true, "Please add the contact number"],
    },
    issue: {
        type: String,
        required: [true, "Please add the issue"],
    },
    comment: {
        type: String,
        required: [true, "Please add the comment"],
    }
},{
    timestamps: true,
});

module.exports = mongoose.model("Issue", issueSchema);