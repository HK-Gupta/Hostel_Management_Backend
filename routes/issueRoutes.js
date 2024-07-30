const express = require("express");
const router = express.Router();

const {
    getIssues,
    createIssue,
    deleteIssue
} = require("../controllers/issue_controller");

router.route('/').get(getIssues).post(createIssue);
router.route('/:id').delete(deleteIssue);

module.exports = router;