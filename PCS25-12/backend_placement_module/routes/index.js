const express = require("express");
const {  LoginController,
    updateOpening, getHodDetails, getStudentDetails, numberOfStudents } = require("../controllers/index");
const router = express.Router();


router.post("/login", LoginController);
// router.post("/updateOpening", updateOpening);
router.get("/getHodDetails", getHodDetails);
router.get("/getStudentDetails", getStudentDetails);
router.get("/numberOfStudents", numberOfStudents);


module.exports = router;
