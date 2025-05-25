const db = require("../config/db");


const CompanyController = async ( req, res) => {
  try {
    const user = await db.query(
      "SELECT company_name,c_id,description FROM company"
    );
   
console.log(user)
  
    res.json({  user: user[0] });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = {
  CompanyController
};