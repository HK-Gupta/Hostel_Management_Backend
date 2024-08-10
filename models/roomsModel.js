const mongoose = require("mongoose");
 
const roomsSchema = mongoose.Schema({
    roomNumber: {
        type: String,
        required: [true, "Please add the room Number"],
    },
    roomCapacity: {
        type: String,
        required: [true, "Please add the room Capacity"],
    },
    roomCurrentCapacity: {
        type: String,
        required: [true, "Please add the current capacity"],
    },
    roomType: {
        type: String,
        required: [true, "Please add the room type"],
    },
    roomStatus: {
        type: String,
        required: [true, "Please add the room status"],
    },
    blockNumber: {
        type: String,
        required: [true, "Please add the block number"]
    },
},{
    timestamps: true,
});

module.exports = mongoose.model("Rooms", roomsSchema);