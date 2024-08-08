const asyncHandler = require("express-async-handler");
const Fees = require("../models/feesModel");


//@desc Get Fees
//@route GET /api/fees
//@access public
const getFees = asyncHandler(async (req, res) => {
    const fees = await Fees.find();
    res.status(200).json(fees);
});

//@desc Get Fees
//@route GET /api/fees
//@access public
const createFees = asyncHandler(async (req, res) => {
    const {maintenanceCharge, parkingCharge, roomWaterCharge, roomCharge} = req.body;
    if(!maintenanceCharge || !parkingCharge ||
        !roomWaterCharge || !roomCharge) {
        res.status(400);
        throw new Error("All Fields are mandatory!")
    }

    const fees = await Fees.create({
        maintenanceCharge, parkingCharge, roomWaterCharge, roomCharge
    });

    res.status(201).json(fees);
    
});

//@desc Update Students
//@route PUT /api/fees/:id
//@access public
const updateFees = asyncHandler(async (req, res) => {
    const fees = await Fees.findById(req.params.id);
    if(!fees) {
        res.status(404);
        throw new Error('Not found');
    }
    
    const updatedFees = await Fees.findByIdAndUpdate(
        req.params.id,
        res.body,
        {new: true}
    );

    res.status(200).json(updatedFees)
});

module.exports = {
    getFees,
    createFees,
    updateFees
};