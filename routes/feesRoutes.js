const express = require("express");
const router = express.Router();

const {
    getFees,
    createFees,
    updateFees
} = require("../controllers/feesController");

const validateToken = require("../middleware/validateTokenHandler");

router.route('/').get(getFees).post(createFees);

router.route('/:id').put(updateFees);

module.exports = router;