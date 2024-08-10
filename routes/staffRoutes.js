const express = require("express");
const router = express.Router();

const {
    getStaffs,
    createStaff,
    deleteStaff
} = require("../controllers/staffController");

router.route('/').get(getStaffs).post(createStaff);
router.route('/:id').delete(deleteStaff);

module.exports = router;