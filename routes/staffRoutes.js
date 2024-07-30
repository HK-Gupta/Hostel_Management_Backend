const express = require("express");
const router = express.Router();

const {
    getStaffs,
    createStaff
} = require("../controllers/staffController");

router.route('/').get(getStaffs).post(createStaff);


module.exports = router;