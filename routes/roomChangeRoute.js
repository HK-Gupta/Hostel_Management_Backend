const express = require("express");
const router = express.Router();

const {
    getRequest,
    createChangeRequest,
    deleteRequest
} = require("../controllers/changeRoomController");

router.route('/').get(getRequest).post(createChangeRequest);
router.route('/:id').delete(deleteRequest);

module.exports = router;