const mongoose = require("mongoose");
 
const changeRoomsSchema = mongoose.Schema({
    currentRoomNumber: {
        type: String,
        required: [true, "Please add the room Number"]
    },
    changeRoomNumber: {
        type: String,
        required: [true, "Please add the room Capacity"],
    },
    currentBlock: {
        type: String,
        required: [true, "Please add the current capacity"],
    },
    changeBlock: {
        type: String,
        required: [true, "Please add the room type"],
    },
    studentEmailId: {
        type: String,
        required: [true, "Please add the room status"],
    },
    changeReason: {
        type: String,
        required: [true, "Please add the block number"]
    },
},{
    timestamps: true,
});

module.exports = mongoose.model("ChangeRoom", changeRoomsSchema);