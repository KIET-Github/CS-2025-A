const express = require("express");

const router = express.Router();
const {getEducationDetailsByStudentId, updateEducationDetails, addEducationDetails}  =require("../controllers/educationdetails")

router.get("/:id", getEducationDetailsByStudentId);
router.post('/education-details/:id', addEducationDetails);
router.put("/:id",updateEducationDetails);

module.exports = router;