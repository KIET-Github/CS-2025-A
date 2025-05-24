const db = require("../Db/index.js");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config.js");
const { errorMessages, authMessages } = require("../Utils/constants.js");

const SignUpController = async (req, res) => {
  try {
    const { name, gstIn, phoneNumber, companyName, email, address } = req.body;

    // First check if a user with the given phone number or email already exists
    const checkQuery = `
      SELECT id, phone_number, email FROM UserAccount
      WHERE (phone_number = $1 OR email = $2) AND deleted = false
    `;
    const checkResult = await db.query(checkQuery, [phoneNumber, email]);

    // If user with this phone number or email exists, return appropriate message
    if (checkResult.rows.length > 0) {
      const existingUser = checkResult.rows[0];
      if (existingUser.phone_number === phoneNumber) {
        return res.status(409).json({
          statusCode: 409,
          message: authMessages.userAlreadyRegistered,
        });
      } else if (existingUser.email === email) {
        return res.status(409).json({
          statusCode: 409,
          message: authMessages.emailAlreadyRegistered,
        });
      }
    }

    // If no existing user found, proceed with registration
    const gst = gstIn != "" ? gstIn : null;
    const result = await db.query(
      `WITH inserted AS (
          INSERT INTO UserAccount (name, gstin, phone_number, email, company_name, address)
          VALUES ($1, $2, $3, $4, $5, $6)
          RETURNING id
        )
        SELECT id AS user_id FROM inserted`,
      [name, gst, phoneNumber, email, companyName, address]
    );

    // Extract user_id from the result
    const userId = result.rows[0]?.user_id;

    return res.status(201).json({
      statusCode: 201,
      message: authMessages.signedUp,
      userId: userId,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      statusCode: 500,
      message: errorMessages.internalServerError,
      error: error.message,
    });
  }
};

const SignInController = async (req, res) => {
  try {
    const { phoneNumber } = req.body;

    const query = `
      SELECT id AS user_id, name, company_name
      FROM "useraccount"
      WHERE phone_number = $1 AND deleted = false;
    `;
    const { rows } = await db.query(query, [phoneNumber]);

    if (rows.length > 0) {
      const { user_id, name, company_name } = rows[0];
      const token = jwt.sign({ userId: user_id }, JWT_SECRET);
      return res.status(200).json({
        statusCode: 200,
        token: token,
        userId: user_id,
        name: name,
        companyName: company_name,
      });
    } else {
      return res.status(404).json({
        statusCode: 404,
        message: authMessages.userNotFound,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      statusCode: 500,
      message: errorMessages.internalServerError,
      error: error.message,
    });
  }
};

module.exports = {
  SignUpController,
  SignInController,
};
