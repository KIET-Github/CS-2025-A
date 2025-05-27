const db = require("../Db/index.js");
const { errorMessages, userMessages } = require("../Utils/constants.js");

const GetUserInfo = async (req, res) => {
  try {
    const result = await db.query(
      `SELECT name, gstin, phone_number, email, company_name, address
       FROM UserAccount
       WHERE id = $1 AND deleted = false`,
      [req.userId]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({
        statusCode: 404,
        message: "User not found or deleted",
      });
    }
    const data = result.rows[0];
    return res.status(200).json({
      statusCode: 200,
      data,
    });
  } catch (error) {
    return res.status(500).json({
      statusCode: 500,
      message: errorMessages.internalServerError,
      error: error.message,
    });
  }
};

const UpdateUserInfo = async (req, res) => {
  try {
    const { name, gstIn, phoneNumber, companyName, email, address } = req.body;
    const userId = req.userId;
    const result = await db.query(
      `UPDATE UserAccount
       SET 
           name = $2,
           gstin = $3,
           phone_number = $4,
           email = $5,
           company_name = $6,
           address = $7
       WHERE id = $1 AND deleted = false
       RETURNING *`,
      [userId, name, gstIn, phoneNumber, email, companyName, address]
    );
    if (result.rows.length > 0) {
      return res.status(200).json({
        statusCode: 200,
        message: userMessages.updated,
      });
    } else {
      return res.status(404).json({
        statusCode: 404,
        message: userMessages.noChange,
      });
    }
  } catch (error) {
    return res.status(500).json({
      statusCode: 500,
      message: errorMessages.internalServerError,
      error: error.message,
    });
  }
};

module.exports = {
  GetUserInfo,
  UpdateUserInfo,
};
