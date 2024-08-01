const asyncHandler = require("express-async-handler");
const Rooms = require("../models/roomsModel");

//@desc Get all Rooms
//@route GET /api/rooms
//@access public
const getRooms = asyncHandler(async (req, res)=> {
    const rooms = await Rooms.find(); 
    res.status(200).json(rooms);
});


//@desc Create Rooms
//@route POST /api/rooms
//@access public
const createRoom = asyncHandler(async (req, res)=> {
    const {roomNumber, roomCapacity, roomCurrentCapacity, roomType, roomStatus, blockNumber} = req.body;
    if(!roomNumber || !roomCapacity || !roomCurrentCapacity || 
        !roomType || !roomStatus || !blockNumber ) {
        res.status(400);
        throw new Error(
            "All Fields are mandatory!" + roomNumber + roomCapacity+ roomCurrentCapacity+ roomType+ roomStatus+ blockNumber 
        );
    }
    const available = await Rooms.findOne({roomNumber});
    if(available) {
        res.status(400);
        throw new Error("Room number aldready registered!");
    }
    const rooms = await Rooms.create({
        roomNumber, roomCapacity, roomCurrentCapacity, 
        roomType, roomStatus, blockNumber
    })
    res.status(201).json(rooms);
});

module.exports = {
    createRoom,
    getRooms
};