const mongoose = require("mongoose");
 
const feesSchema = mongoose.Schema({
    maintenanceCharge: {
        type: String,
        required: [true, "Please add the Maintenence Charge"],
    },
    parkingCharge: {
        type: String,
        required: [true, "Please add the Parking Charge"],
    },
    roomWaterCharge: {
        type: String,
        required: [true, "Please add the Water Charge"],
    },
    roomCharge: {
        type: String,
        required: [true, "Please add the Room Charge"],
    }
},{
    timestamps: true,
});

module.exports = mongoose.model("Fees", feesSchema);