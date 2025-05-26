const {  LoginController,
  updateOpening } = require("./user");
const { job_opening } = require("./job_opening");
const {CompanyController} = require("./companies")
const {singleItems} = require("./company")
const {getHodDetails}=require("./HOD");
const {addCompany} = require("./addCompanies")
const {getStudentDetails, numberOfStudents} = require("./studentdetails")
module.exports = {
  job_opening,
  LoginController,
  CompanyController,
  singleItems,
  addCompany,
  job_opening,
  getHodDetails,
  updateOpening,
  getStudentDetails, 
  numberOfStudents,

};
