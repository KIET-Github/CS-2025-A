const express = require("express");

const router = express.Router();
const { CompanyController } = require("../controllers/index");
const {addCompany} = require("../controllers/index")

router.get("/company", CompanyController);
router.post("/addCompany", addCompany);

module.exports = router;