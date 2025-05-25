const express = require("express");
const { job_opening } = require("../controllers/index");
const router = express.Router();

router.get("/job_opening/:id", job_opening);

module.exports = router;
