const db = require("../config/db");
const { QueryTypes } = require("sequelize");
const singleItems = async (req, res) => {
    try {

     
      const item = await db.query("SELECT * FROM company ");
      console.log(item);

  
      res.json({ item: item[0] });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
      return;
    }
  };
  module.exports={
    singleItems
  }