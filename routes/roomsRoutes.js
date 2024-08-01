const express = require("express");
const router = express.Router();

const {
    getRooms,
    createRoom
} = require("../controllers/roomController");

router.route('/').get(getRooms).post(createRoom);

module.exports = router;