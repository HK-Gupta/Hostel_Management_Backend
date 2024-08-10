const asyncHandler = require("express-async-handler");
const ChangeRoom = require("../models/roomChangeModel");

//@desc Get all Requests
//@route GET /api/change_request
//@access public
const getRequest = asyncHandler(async (req, res)=> {
    const changeRoom = await ChangeRoom.find(); 
    res.status(200).json(changeRoom);
});


//@desc Create Request
//@route POST /api/change_request
//@access public
const createChangeRequest = asyncHandler(async (req, res)=> {
    const {currentRoomNumber, changeRoomNumber, currentBlock, changeBlock, studentEmailId, changeReason} = req.body;
    if(!currentRoomNumber || !changeRoomNumber || !currentBlock|| 
        !changeBlock || !studentEmailId || !changeReason
    ) {
        res.status(400);
        throw new Error(
            "All Fields are mandatory!"
        );
    }
    const changeRoom = await ChangeRoom.create({
        currentRoomNumber, changeRoomNumber, currentBlock, 
        changeBlock, studentEmailId, changeReason
    })
    res.status(201).json(changeRoom);
});

//@desc Delete Request
//@route DELETE /api/change_request/:id
//@access public
const deleteRequest = asyncHandler(async (req, res)=> {
    const requests = await ChangeRoom.findById(req.params.id);
    if(!requests) {
        res.status(404);
        throw new Error("Request not found")
    }
    await ChangeRoom.findByIdAndDelete(req.params.id);
    res.status(200).json(requests);
});

module.exports = {
    createChangeRequest,
    getRequest,
    deleteRequest
};