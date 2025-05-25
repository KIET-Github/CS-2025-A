const db = require("../config/db");
const { QueryTypes } = require("sequelize");

const job_opening = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("job_opening",id);
    const user = await db.query(
      "SELECT * FROM job_opening WHERE c_id = ?", 
      [id]
    );
    res.json({ user: user[0] });
} catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = {
job_opening,
};
