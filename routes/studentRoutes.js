const express = require("express");
const router = express.Router();

const {
    getStudents,
    createStudent,
    loginStudent,
    currentUser,
    updateStudent,
    deleteStudent,
    searchStudentByEmail
} = require("../controllers/studentController");
const validateToken = require("../middleware/validateTokenHandler");

router.route('/').get(getStudents).post(createStudent);

router.route('/:id').put(updateStudent).delete(deleteStudent);

router.route('/login').post(loginStudent);

router.get("/current", validateToken, currentUser);

router.get('/search', searchStudentByEmail);


module.exports = router;