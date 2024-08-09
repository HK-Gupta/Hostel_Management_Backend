const express = require("express");
const router = express.Router();

const {
    getRequest,
    createChangeRequest
} = require("../controllers/changeRoomController");

router.route('/').get(getRequest).post(createChangeRequest);

module.exports = router;