require("dotenv").config();
const hashExistingPasswords = require("./hashPassword");

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const router = require("./routes/index");
const db = require("./config/db");
const { QueryTypes } = require("sequelize");
const app = express();
const port = 5000;

app.use((req, res, next) => {
  console.log(`Incoming request: ${req.method} ${req.path}`);
  next();
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.use("/api", require("./routes/index"));
app.use("/api/company",require("./routes/company"))
app.use("/api/job_opening", require("./routes/job_opening"));
app.use("/api/education",require("./routes/education"))
// app.use("/", require("./routes/party"));
// app.use("/", require("./routes/transactions"));
// app.use("/", require("./routes/SaleAndPurchase"));
hashExistingPasswords();

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
