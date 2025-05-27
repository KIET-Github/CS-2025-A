const db = require("../Db/index.js");
const { errorMessages, clientMessages } = require("../Utils/constants.js");

const CreateClient = async (req, res) => {
  try {
    const {
      name,
      gstIn,
      phoneNumber,
      email,
      address,
      toGet,
      toPay,
      noticePeriod,
    } = req.body;
    const userId = req.userId;
    const get = toGet || 0;
    const pay = toPay || 0;
    const gst = gstIn != "" ? gstIn : null;
    const result = await db.query(
      `WITH inserted AS (
        INSERT INTO client (name, gstin, phone_number, email, address, user_id, to_get, to_pay, notice_period)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
        RETURNING id
      )
      SELECT id AS client_id FROM inserted`,
      [name, gst, phoneNumber, email, address, userId, get, pay, noticePeriod]
    );

    const clientId = result.rows[0]?.client_id;

    return res.status(201).json({
      statusCode: 201,
      msg: clientMessages.created,
      clientId: clientId,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      statusCode: 500,
      msg: errorMessages.internalServerError,
      error: error.message,
    });
  }
};

const GetAllClients = async (req, res) => {
  try {
    const userId = req.userId;

    const result = await db.query(
      `SELECT id, name, phone_number, to_get, to_pay
       FROM client
       WHERE deleted = false AND user_id = $1`,
      [userId]
    );

    return res.status(200).json({
      statusCode: 200,
      data: result.rows,
    });
  } catch (error) {
    return res.status(500).json({
      statusCode: 500,
      msg: errorMessages.internalServerError,
      error: error.message,
    });
  }
};
const GetAllClientsList = async (req, res) => {
  try {
    const userId = req.userId;

    const result = await db.query(
      `SELECT id, name
       FROM client
       WHERE deleted = false AND user_id = $1`,
      [userId]
    );
    return res.status(200).json({
      statusCode: 200,
      data: result.rows,
    });
  } catch (error) {
    return res.status(500).json({
      statusCode: 500,
      msg: errorMessages.internalServerError,
      error: error.message,
    });
  }
};
const GetClientByID = async (req, res) => {
  try {
    const clientId = req.params.clientId;
    const result = await db.query(
      `SELECT id, name, gstin, phone_number, email, address, to_get, to_pay ,notice_period
       FROM client
       WHERE id = $1 AND deleted = false`,
      [clientId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        statusCode: 404,
        msg: clientMessages.noClientForId,
      });
    }

    return res.status(200).json({
      statusCode: 200,
      data: result.rows[0],
    });
  } catch (error) {
    return res.status(500).json({
      statusCode: 500,
      msg: errorMessages.internalServerError,
      error: error.message,
    });
  }
};

const UpdateClientByID = async (req, res) => {
  try {
    const {
      id,
      name,
      gstIn,
      phoneNumber,
      email,
      address,
      toGet,
      toPay,
      noticePeriod,
    } = req.body;
    if (id == null) {
      return res.status(400).json({
        statusCode: 400,
        msg: clientMessages.clientIdRequired,
      });
    }
    const result = await db.query(
      `UPDATE client
       SET name = $2,
           gstin = $3,
           phone_number = $4,
           email = $5,
           address = $6,
           to_get = $7,
           to_pay = $8,
           notice_period = $9
       WHERE id = $1 AND deleted = false
       RETURNING *`,
      [id, name, gstIn, phoneNumber, email, address, toGet, toPay, noticePeriod]
    );
    if (result.rows.length > 0) {
      return res.status(200).json({
        statusCode: 200,
        message: clientMessages.updated,
      });
    } else {
      return res.status(404).json({
        statusCode: 404,
        message: clientMessages.noChange,
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

const DeleteClientByID = async (req, res) => {
  try {
    const clientId = req.params.clientId;
    const result = await db.query(
      `UPDATE client
       SET deleted = true
       WHERE id = $1 AND deleted = false
       RETURNING *`,
      [clientId]
    );

    if (result.rows.length > 0) {
      return res.status(200).json({
        statusCode: 200,
        message: clientMessages.deleted,
      });
    } else {
      return res.status(404).json({
        statusCode: 404,
        message: clientMessages.noChange,
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
  CreateClient,
  GetAllClients,
  GetClientByID,
  UpdateClientByID,
  DeleteClientByID,
  GetAllClientsList,
};
